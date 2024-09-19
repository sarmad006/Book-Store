import { SHA256 as sha256 } from "crypto-js";
// We impot our prisma client
import prisma from "@/lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { errorCodes } from "@/lib/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // post Book
    await completePayment(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function completePayment(req: NextApiRequest, res: NextApiResponse) {
 
  const {paymentId} = req.body

  try {
    const payment = await prisma.stripePayments.update({where: {
      paymentID: paymentId,
    },
    data: {
      status: 'Completed'
    }});
    console.log('payment', payment)
    switch(payment.paymentType) {
      case 'return' :
         await returnBook(payment)
         break;
      
      case 'bought':
        let metaData = payment.metaData as any
        let bookIds  = metaData.data.keys
        let reward = parseInt(metaData.data.price) * 0.1
        console.log("books",bookIds)
        const book = await prisma.book.updateMany({where: {
          id : { in :bookIds},
        },
        data: {
          status: 'Sold'
        }});
        await addRewardPoints(payment.buyerId,reward,metaData.data.isReward)
        break;
    }
    return res
      .status(201)
      .json({
        payment,
        message: "payment created successfully",
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
async function returnBook(payment) {
  let {bookID} = payment
  const borrowedBook = await prisma.borrowedBook.findFirst({
    where: { bookId: bookID }
  });
  
  if (borrowedBook) {
    const { reserveUserId } = borrowedBook;
    await prisma.borrowedBook.delete({
      where: { id: borrowedBook.id }
    });
    const book = await prisma.book.update({where: {
      id: bookID,
    },
    data: {
      status: 'Issued'
    }});
    if (reserveUserId !== null) {
      const message = `The book ${book.title} has become available.`;
      
      await prisma.notification.create({
        data: {
          message: message,
          userId: reserveUserId
        }
      });
    }
  }
}

async function  addRewardPoints(userId,points,isReward) {
  let user = await prisma.user.findUnique({
    where : {
      id : userId
    }
  })
  console.log("points",points,user.rewardPoints)
  let rewards =(!isReward && user.rewardPoints ? parseInt(user.rewardPoints) : 0 )+ parseInt(points);
  console.log("rewards",rewards)
  await prisma.user.update({
  where : {
    id : userId
  },
  data : {
    rewardPoints : rewards.toString()
  }
  })
}