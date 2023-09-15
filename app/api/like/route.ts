import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import { getPostById } from "@/app/actions/getPostById";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { postId, userId } = res.data;

    const post = await getPostById({ postId });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.likedIds.includes(userId)) {
      throw new Error("Already liked");
    }

    // Create notification && Update User.hasNotification
    if (post.userId) {
      await prisma.notification.create({
        data: {
          userId: post.userId,
          body: `Someone liked your post`,
        },
      });

      await prisma.user.update({
        where: { id: post.userId },
        data: { hasNotification: true },
      });
    }

    const updatedLikedIds = [...(post.likedIds || []), userId];

    const updatedPostWithLikedIds = await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPostWithLikedIds);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();
    const { userId, postId } = res;

    const post = await getPostById({ postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found" });
    }

    const updatedLikedIds = post.likedIds.filter((id) => id !== userId);

    const updatedPostWithLikedIds = await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPostWithLikedIds);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
