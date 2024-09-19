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
    await AddComment(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function AddComment(req: NextApiRequest, res: NextApiResponse) {
  const commentData = req.body;

  try {
    const bookComment = await prisma.bookComment.create({ data: commentData });
    return res
      .status(201)
      .json({
        bookComment,
        message: "Book created successfully",
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
