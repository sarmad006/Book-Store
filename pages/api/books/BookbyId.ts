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
    await BookById(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function BookById(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.body;
    console.log("id", id);
    const result = await prisma.user.findFirst({
      where: {
        books: {
          some: {
            id: { equals: id },
            sellerId: {
              not: null,
            },
          },
        },
      },
      select: {
        name: true,
        books: true,
        email:true
      },
    });
    if (result) {
      let filteredBooks = result.books.filter((book) => book.id === id);
      result.books = filteredBooks;
    }
    return res.status(201).json({
      result,
      message: "books fetched",
    });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
