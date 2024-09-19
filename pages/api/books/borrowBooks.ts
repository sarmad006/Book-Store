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
    await borrowBooks(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function borrowBooks(req: NextApiRequest, res: NextApiResponse) {
  let { userId } = req.body;
  console.log("userId",userId)
  try {
    const borrowedBooks = await prisma.borrowedBook.findMany({
      where: {
        userId: userId,
      },
      include: {
        book: true, 
    },
    });
    console.log("borrowedBooks",borrowedBooks)
    return res.status(201).json({
      borrowedBooks,
      message: "books fetched",
    });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
