"use client";
import { useCallback, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import placeholderImg from "../../public/images/placeholder.png";
import { User } from "@prisma/client";

interface AvatarProps {
  user?: User | null;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ user, isLarge, hasBorder }: AvatarProps) => {
  const router = useRouter();

  const onClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();

      router.push(`/users/${user?.id}`);
    },
    [router, user]
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
      <Image
        onClick={onClick}
        src={user?.profileImage || placeholderImg}
        alt={user?.name || "Profile Image"}
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
