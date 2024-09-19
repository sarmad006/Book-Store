import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        async authorize(credentials, req) {
          const userCredentials = {
            email: credentials.email,
            password: credentials.password,
          };
          console.log(userCredentials);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
            {
              method: "POST",
              body: JSON.stringify(userCredentials),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const user = await res.json();
          console.log("user",user)
          if (Object.keys(user).length > 0 && !Object.hasOwn(user,"status") ) {
            return user.user;
          } else {
            throw new Error(JSON.stringify(user.message));
          }
        },
        credentials: undefined,
      }),
    ],

    adapter: PrismaAdapter(prisma),
    secret: "Yo/0duPLAErkzTcBlgWGWR4eaVyivqU6a+M/ot0fo9c=",
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

    jwt: {
      secret: "Yo/0duPLAErkzTcBlgWGWR4eaVyivqU6a+M/ot0fo9c=",
      maxAge: 60 * 60 * 24 * 30,
    },

    pages: {
      // signIn: "/login",
      // signOut: "/login",
      // error: "/login",
    },
    events: {
      async signOut({ token, session }) {
        // Delete auth cookie on signout so it doesn't persist past log out
        res.setHeader("Set-Cookie", "");

        // Set token/session to {}, that would update the cilentside token/session as well
        token = {};
        session.user={}
      },
    },
    callbacks: {
      async session({ session, user, token }) {
        if (user !== null) {
          session.user = token;
        }
        return session;
      },

      async jwt({ token, user }) {
        if (user) {
          return {
            ...token,
            id: user.id
          };
        } else return token;
      },
    },
  });
}
