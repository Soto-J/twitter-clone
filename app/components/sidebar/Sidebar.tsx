"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { User } from "@prisma/client";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

interface SidebarProps {
  currentUser: User | null;
}

const Sidebar = ({ currentUser }: SidebarProps) => {
  const router = useRouter();
  const session = useSession();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
    },
  ];

  const logOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="col-span-1 h-full pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              alert={item.alert}
            />
          ))}

          {currentUser && (
            <SidebarItem label="Logout" icon={BiLogOut} logOut={logOut} />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
