
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
    await BookStatusUpdate(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function BookStatusUpdate(req: NextApiRequest, res: NextApiResponse) {
  try {
    let {id,status,isComment,bookIdsWithStatus}=req.body
    let updatedBook;
    let updatedBooks=[]
    if(isComment){
    updatedBook = await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          status: status
        }
      });
    }
    else {
      for (const { bookId, status } of bookIdsWithStatus) {
        updatedBook = await prisma.book.update({
          where: {
            id: bookId,
          },
          data: {
            status: status,
          },
        });
        updatedBooks.push(updatedBook);
      }
      updatedBook=updatedBooks
    }
    return res
      .status(201)
      .json({
        updatedBook,
        message: "books fetched",
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
