import prisma from "@/libs/prismadb";

interface IParams {
  postId?: string;
}

export async function getCommentsFromPost(params: IParams) {
  try {
    const { postId } = params;
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  } catch (error) {
    return null;
  }
}
