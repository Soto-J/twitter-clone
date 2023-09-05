import prisma from "@/libs/prismadb";

export async function getUserPostsById(userId?: string) {
  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      include: { user: true, comments: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error: any) {
    return null;
  }
}
