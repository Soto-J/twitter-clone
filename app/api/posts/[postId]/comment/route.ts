import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getPostById } from "@/app/actions/getPostById";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const data = await request.json();
    const { body } = data;

    const post = await getPostById(params);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    if (!post) {
      throw new Error("Post not found");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId: post.id,
      },
    });

    if (!comment) {
      throw new Error("Comment not created");
    }

    return NextResponse.json(comment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
