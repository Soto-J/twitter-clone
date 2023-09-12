import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

// const postWithComments2 = Prisma.validator<Prisma.UserDefaultArgs>()({
//   select: { posts: true, comments: true },
// });

const postWithUserAndComments = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { user: true, comments: true },
});

export type PostWithUserAndComments = Prisma.PostGetPayload<typeof postWithUserAndComments>;


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
