import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface IParams {
  postId?: string;
}

export async function getPostById(params: IParams) {
  try {
    const { postId } = params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true, comments: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    return null;
  }
}
