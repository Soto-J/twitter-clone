import { getAllPosts } from "@/app/actions/getAllPosts";
import { getUserPostsById } from "@/app/actions/getUserPostsById";
import React from "react";

interface PostFeedProps {
  userId?: string;
}

const PostFeed = async ({ userId }: PostFeedProps) => {
  const posts = await getAllPosts();
  const userPosts = await getUserPostsById(userId);
  
  return <div>PostFeed</div>;
};

export default PostFeed;
