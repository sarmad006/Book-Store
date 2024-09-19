import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const host = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // post Book
    await StripeSession(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function StripeSession(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  if (method === "POST") {
    try {
      const payment = await prisma.stripePayments.create({ data: body.orderDetails });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: body.lineItems,
        mode: "payment",
        metadata:body.metadata,
        cancel_url: `${host}`,
        success_url: `${host}/success?paymentId=${payment.paymentID}`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.log("err",err)
      res.status(500).json({ error: "Error checkout session" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
