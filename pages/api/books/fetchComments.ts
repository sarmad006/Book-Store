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
    await fetchComments(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function fetchComments(req: NextApiRequest, res: NextApiResponse) {
  let { bookId } = req.body;
  console.log("bookId",bookId)
  try {
    const bookComment = await prisma.bookComment.findMany({
      include: {
        user : true
    },
    });
    return res.status(201).json({
        bookComment,
      message: "bookComment fetched",
    });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
