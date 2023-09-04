import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const { body } = await request.json();
  const currentUser = await getCurrentUser();

  const post = await prisma.post.create({
    data: {
      body,
      userId: currentUser!.id,
    },
  });

  return NextResponse.json(post);
}

export async function GET(request: Request) {
  const { userId } = await request.json();

  const posts =
    userId && typeof userId === "string"
      ? await prisma.post.findMany({
          where: { id: userId },
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        })
      : await prisma.post.findMany({
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });

  return NextResponse.json(posts);
}
