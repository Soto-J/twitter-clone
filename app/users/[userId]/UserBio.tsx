"use client";
import { useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { User } from "@prisma/client";
import { UserWithfollowingCount } from "./page";
import { BiCalendar } from "react-icons/bi";
import { useEditModal } from "@/app/hooks/useEditModal";

import Button from "@/app/components/Button";
import axios from "axios";
import toast from "react-hot-toast";

interface UserBioProps {
  user?: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    followingIds: string[];
    createdAt: Date | null;
    followersCount: number;
  } | null;

  currentUser: User | null;
}

const UserBio = ({ user, currentUser }: UserBioProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const editModal = useEditModal();

  const isFollowing = useMemo(
    () => currentUser?.followingIds.includes(user?.id || ""),
    [currentUser, user]
  );

  const createdAt = () => {
    if (!user?.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  };

  const onEditClick = useCallback(() => {
    editModal.onOpen();
  }, [editModal]);

  const onFollowClick = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = isFollowing
        ? await axios.delete(`/api/follow/${user!.id}`)
        : await axios.post(`/api/follow/${user!.id}`);

      if (res.status !== 200) {
        throw new Error(
          isFollowing ? "Error Unfolling User" : "Error Following User"
        );
      }

      const toastMessage = res.data.followingIds.includes(user?.id)
        ? "User Successfully Followed!"
        : "User Unfollowed!";

      toast.success(toastMessage);
      return router.refresh();
    } catch (error: any) {
      console.error(error);
      return toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [user, toast, axios, router, currentUser, setIsLoading, isFollowing]);

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {user?.id === currentUser?.id ? (
          <Button
            label="Edit"
            secondary
            onClick={onEditClick}
            disabled={isLoading}
          />
        ) : (
          <Button
            label={isFollowing ? "Unfollow" : "Follow"}
            outline={isFollowing}
            secondary={!isFollowing}
            onClick={onFollowClick}
            disabled={isLoading}
          />
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
