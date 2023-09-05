import prisma from "@/libs/prismadb";

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true, comments: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error: any) {
    return null;
  }
}
