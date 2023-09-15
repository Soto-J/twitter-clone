import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(options);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
