import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // post Book
    await StripeWebhook(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function StripeWebhook(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  if (method === "POST") {
    const body = JSON.stringify(req.body, null, 2);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret: endpointSecret,
    });
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(body, header, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log(
          `Payment success for session ID: ${checkoutSessionCompleted.id}`
        );
        const session = await stripe.checkout.sessions.retrieve(
            checkoutSessionCompleted.id, {
            expand: ['line_items']
          });
          console.log("session",session.line_items.data,checkoutSessionCompleted.invoice_creation)
        break;
  
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  
    res.status(200).end();
} else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
