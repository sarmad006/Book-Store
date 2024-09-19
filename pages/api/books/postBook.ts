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
    await postBook(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function postBook(req: NextApiRequest, res: NextApiResponse) {
  const bookData = req.body;
console.log({ data: bookData })

  try {
    const book = await prisma.book.create({ data: bookData });
    return res
      .status(201)
      .json({
        book,
        message: "Book created successfully",
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
