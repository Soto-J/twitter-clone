import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const { id, ...userPreviousData } = currentUser!;

  console.log("HELLO");
  const { name, username, bio, profileImage, coverImage } =
    await request.json();

  const editData: any = {};
  if (name) editData.name = name;
  if (username) editData.username = username;
  if (bio) editData.bio = bio;
  if (profileImage) editData.profileImage = profileImage;
  if (coverImage) editData.coverImage = coverImage;

  const updatedData = { ...userPreviousData, ...editData };

  const updatedUser = await prisma?.user.update({
    where: { id: currentUser?.id },
    data: updatedData,
  });

  return NextResponse.json(updatedUser);
}
