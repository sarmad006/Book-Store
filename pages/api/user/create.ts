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
    // create user
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
// We hash the user entered password using crypto.js
export const hashPassword = (string: string) => {
  return sha256(string).toString();
};
// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
  const { password,email,name } = req.body;

  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(401).json({message:errors[0]});
  }
  try {
    const user = await prisma.user.create({
      data: {email,name,password: hashPassword(req.body.password) },
    });
    return res
      .status(201)
      .json({
        user
      });
  } catch (e) {
    console.log(e);
    let message = errorCodes(e);
    return res.status(401).json({ message });
  }
}
