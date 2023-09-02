import { User } from ".prisma/client";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";
import React from "react";

interface UserHeroProps {
  user: User | null;
}

const UserHero = ({ user }: UserHeroProps) => {
  return (
    <div>
      <div className="relative h-44 bg-neutral-700">
        {user?.coverImage && (
          <Image
            fill
            src={user.coverImage}
            alt={user.name || ""}
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={user?.id || ""} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
