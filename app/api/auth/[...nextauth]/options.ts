import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { User } from "@prisma/client";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("SES", { session, token });

      const user = { ...session.user, id: token.sub };
      return { ...session, user };
    },
    jwt: ({ token, user }) => {
      // console.log("jwt", { token, user });

      const u = user as unknown as User;
      if (user) {
        return { ...token, id: u.id };
      }
      
      return token;
    },
  },
  pages: { signIn: "/" },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  // jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
};
