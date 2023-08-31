"use client";
import { signOut } from "next-auth/react";

import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

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
  },
  {
    label: "Profile",
    href: "/users/123",
    icon: FaUser,
  },
];

interface SidebarProps {
  currentUser: User | null;
}

const Sidebar = ({ currentUser }: SidebarProps) => {
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
            />
          ))}

          {currentUser && (
            <SidebarItem
              label="Logout"
              icon={BiLogOut}
              logOut={() => signOut()}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
