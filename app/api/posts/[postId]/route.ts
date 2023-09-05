import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { userId } = await request.json();

  const userPosts = await prisma.post.findMany({
    where: { userId },
    include: { user: true, comments: true },
    orderBy: { createdAt: "desc" },
  });
  // const posts =
  //   userId && typeof userId === "string"
  //     ? await prisma.post.findMany({
  //         where: { id: userId },
  //         include: { user: true, comments: true },
  //         orderBy: { createdAt: "desc" },
  //       })
  //     : await prisma.post.findMany({
  //         include: { user: true, comments: true },
  //         orderBy: { createdAt: "desc" },
  //       });

  return NextResponse.json(userPosts);
}
