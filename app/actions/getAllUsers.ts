import prisma from "@/libs/prismadb";

export default async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return users;
  } catch (error: any) {
    return null;
  }
}
