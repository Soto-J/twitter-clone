import { redirect } from "next/navigation";

import { User } from "@prisma/client";
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";

import Header from "@/app/components/Header";
import UserHero from "./UserHero";
import UserBio from "./UserBio";
import PostFeed from "@/app/components/posts/PostFeed";
import { getUserPostsById } from "@/app/actions/getUserPostsById";

export interface UserWithfollowingCount extends User {
  followersCount: number;
}

interface IParams {
  userId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  console.log("params", params);
  const currentUser = await getCurrentUser();

  const user = await getUserById(params);
  const userPosts = await getUserPostsById(params);
  console.log("user", user);

  if (!currentUser) {
    return redirect("/");
  }

  return (
    <div>
      <Header label={user?.name || ""} showBackArrow />
      <UserHero user={user} />
      <UserBio user={user} currentUser={currentUser} />
      <PostFeed user={user} posts={userPosts} />
    </div>
  );
};

export default page;
