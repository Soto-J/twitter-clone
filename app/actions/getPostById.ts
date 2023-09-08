import prisma from "@/libs/prismadb";

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

    return post;
  } catch (error) {
    return null;
  }
}
