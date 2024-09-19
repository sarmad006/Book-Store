
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
    await retrieveUsers(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

// function to create book in our database
async function retrieveUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    let users = await prisma.user.findMany({
        include:{
            books:true
        }
    });
    users=users.filter((user)=>!user.email.includes('admin'))
    return res
      .status(201)
      .json({
        users,
        message: "Users fetched",
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
