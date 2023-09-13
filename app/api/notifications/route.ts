import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: Request) {
  const { userId } = await req.json();
  try {
    if (!userId) {
      throw new Error("Invalid user id");
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    await prisma.user.updateMany({
      where: { id: userId },
      data: { hasNotification: false },
    });
    
    return NextResponse.json(notifications);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
