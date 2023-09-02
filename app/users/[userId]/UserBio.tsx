"use client";
import { format } from "date-fns";
import { User } from "@prisma/client";
import Button from "@/app/components/Button";
import { BiCalendar } from "react-icons/bi";
import { UserWithfollowingCount } from "./page";

interface UserBioProps {
  user: UserWithfollowingCount;
  currentUser: User | null;
}

const UserBio = ({ user, currentUser }: UserBioProps) => {
  const createdAt = () => {
    if (!user?.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  };

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {user?.id === currentUser?.id ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button secondary label="Follow" onClick={() => {}} />
        )}
      </div>

      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>
          <p className="text-neutral-500">@{user?.username}</p>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-white">
            {user?.bio || "This account has no bio."}
          </p>
          <div
            className="
                mt-4
                flex
                items-center
                gap-2
                text-neutral-500  
              "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt()}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-1">
            <p className="text-white">{user?.followingIds.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-white">{user?.followersCount}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
