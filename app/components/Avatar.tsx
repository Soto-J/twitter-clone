"use client";
import { useCallback } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { useRouter } from "next/navigation";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const router = useRouter();
  // const currentUser = await getCurrentUser();
  // console.log("CURRENTUSER", currentUser);

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
      relative
      cursor-pointer
      rounded-full
      transition
      hover:opacity-90
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      `}
    >
      Avatar
    </div>
  );
};

export default Avatar;
