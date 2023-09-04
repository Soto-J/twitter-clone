import { redirect } from "next/navigation";

import { User } from "@prisma/client";
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";

import Header from "@/app/components/Header";
import UserHero from "./UserHero";
import UserBio from "./UserBio";

export interface UserWithfollowingCount extends User {
  followersCount: number;
}

interface IParams {
  userId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const user = (await getUserById(params)) as UserWithfollowingCount;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  return (
    <div>
      <Header label={user?.name || ""} showBackArrow />
      <UserHero user={user} />
      <UserBio user={user} currentUser={currentUser} />
    </div>
  );
};

export default page;
