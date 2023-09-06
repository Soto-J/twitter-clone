import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const { body } = await request.json();

    if (!body) {
      throw new Error("Body is required");
    }

    const currentUser = await getCurrentUser();

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser!.id,
      },
      include: { user: true, comments: true },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const allPosts = await prisma.post.findMany();

  return NextResponse.json(allPosts);
}
