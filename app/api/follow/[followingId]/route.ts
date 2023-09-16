import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  followingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { followingId } = params;

    if (!followingId) {
      throw new Error("User id is required");
    }

    const currentUser = await getCurrentUser();
    const userToFollow = await prisma.user.findUnique({
      where: { id: followingId },
    });

    if (currentUser?.followingIds.includes(followingId)) {
      throw new Error("User already followed");
    }

    if (!userToFollow || !currentUser) {
      throw new Error("User not found");
    }

    await prisma.notification.create({
      data: {
        userId: followingId,
        body: `${currentUser?.username} followed you`,
      },
    });

    await prisma.user.update({
      where: { id: followingId },
      data: { hasNotification: true },
    });

    const updatedfollowingIds = [...currentUser.followingIds, followingId];

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: updatedfollowingIds },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { followingId } = params;
    if (!followingId) {
      throw new Error("User id is required");
    }

    const currentUser = await getCurrentUser();
    const userToUnfollow = await prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!userToUnfollow) {
      throw new Error("User not found");
    }

    const updatedfollowingIds = currentUser?.followingIds.filter(
      (id) => id !== followingId
    );

    const updatedUser = await prisma.user.update({
      where: { id: currentUser?.id },
      data: { followingIds: updatedfollowingIds },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    NextResponse.error();
  }
}
