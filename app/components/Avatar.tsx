"use client";
import { useCallback, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import placeholderImg from "../../public/images/placeholder.png";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const router = useRouter();

  const onClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();

      router.push(`/users/${userId}`);
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
      <Image
        onClick={onClick}
        src={placeholderImg}
        alt="avatar"
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
