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

    if (!post?.userId) {
      throw new Error("Post not found");
    }

    await prisma.notification.create({
      data: {
        userId: post.userId,
        body: `${currentUser.username} commented on your post`,
      },
    });

    await prisma.user.update({
      where: { id: post.userId },
      data: { hasNotification: true },
    });

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId: post.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
