import prisma from "@/libs/prismadb";

export interface IParams {
  userId?: string;
}

export async function getUserPostsById(params: IParams) {
  try {
    const posts = await prisma.post.findMany({
      where: params,
      include: { user: true, comments: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error: any) {
    return null;
  }
}
