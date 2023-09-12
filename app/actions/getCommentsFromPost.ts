import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface IParams {
  postId?: string;
}

const commentWithUser = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: { user: true },
});

export type CommentWithUser = Prisma.CommentGetPayload<typeof commentWithUser>;

export async function getCommentsFromPost(params: IParams) {
  try {
    const { postId } = params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    });
    
    return comments;
  } catch (error) {
    return null;
  }
}
