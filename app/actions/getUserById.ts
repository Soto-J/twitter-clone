import prisma from "@/libs/prismadb";

export default async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: { has: id },
      },
    });

    return {
      ...user,
      followersCount,
    };
  } catch (error: any) {
    return null;
  }
}
