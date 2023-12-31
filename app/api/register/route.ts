import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const { email, name, username, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      username,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
