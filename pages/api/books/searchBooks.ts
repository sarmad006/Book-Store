
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
    await searchBooks(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function searchBooks(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { bookName,status } = req.body;
    console.log("bookName",bookName)
    const books = await prisma.book.findMany({
        where: {
          status: { in: status } ,
          title: {
            contains: bookName,
            mode: 'insensitive', // Case insensitive matching
          },
        },
      });
    return res
      .status(201)
      .json({
        books,
        message: "books fetched",
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
