import prisma from "@/libs/prismadb";

export interface IParams {
  userId?: string;
  postId?: string;
}

export async function getUserPostsById(params: IParams) {
  try {
    const { userId, postId } = params;

    const searchId = userId ? { userId } : { id: postId };

    const posts = await prisma.post.findMany({
      where: searchId,
      include: { user: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    return posts;
  } catch (error: any) {
    return null;
  }
}
