import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

const postWithComments = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { posts: true, comments: true },
});

const postWithComments2 = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: { posts: true, comments: true },
});

export type PostWithComments = Prisma.UserGetPayload<typeof postWithComments>;


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
