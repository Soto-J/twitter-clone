import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getPostById } from "@/app/actions/getPostById";

interface IParams {
  postId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { data } = await request.json();
    console.log("data:", data);
    console.log("params:", params);
    // get post by id
    const post = await getPostById(params);

    // // Create a new comment
    // const comment = await prisma.comment.create({
    //   data: data,
    // });

    // const updatedComments = [comment, ...(post?.comments || [])].map(
    //   (comment) => ({ id: comment.id })
    // );

    // // update post with comment
    // const updatedPost = await prisma.post.update({
    //   where: { id: params.postId },
    //   data: {
    //     comments: {
    //       connect: updatedComments,
    //     },
    //   },
    // });

    return NextResponse.json("");
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
