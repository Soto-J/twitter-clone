import prisma from "@/libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getUserById(params: IParams) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    console.log("getUserById()", user);
    if (!user) {
      return null;
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: { has: userId },
      },
    });

    return {
      ...user,
      followersCount,
    };
  } catch (error: any) {
    throw new Error();
  }
}
