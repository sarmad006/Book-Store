;
// import prisma client
import prisma from "@/lib/prisma";
import {hashPassword} from "./create"
import { errorCodes } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handle(_req:NextApiRequest, _res:NextApiResponse) {
  if (_req.method === "POST") {
    //login uer
    await loginUserHandler(_req, _res);
  } else {
    return _res.status(405);
  }
}
async function loginUserHandler(req:NextApiRequest, res:NextApiResponse) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  try {
    await prisma.$connect()
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        Penalty:true
      },
    });
    if(!user){
      return res.status(500).json({status:500,message:"Not a valid user"})
    }
    if (user && user.password === hashPassword(password)) {
      // exclude password from json response
      return res.status(200).json({user:exclude(user, ["password"])});
    } else {
      return res.status(401).json({status:401,message: "Username or password incorrect" });
    }
  } catch (e) {
    console.log(e)
    let message=errorCodes(e)
    return res.status(500).json({status:500,message})
  }
}
// Function to exclude user password returned from prisma
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}