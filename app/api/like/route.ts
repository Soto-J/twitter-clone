import { NextResponse } from "next/server";
import { getPostById } from "@/app/actions/getPostById";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { postId, userId } = res.data;
    console.log("HELLO POST");
    const post = await getPostById({ postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found" });
    }

    if (post?.likedIds.includes(userId)) {
      return NextResponse.json({ error: "Already liked" });
    }

    const updatedLikedIds = [...(post.likedIds || []), userId];

    const updatedPostWithLikedIds = await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    console.log("updatedPostWithLikedIds:", updatedPostWithLikedIds);
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
