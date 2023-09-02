"use client";
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { IconType } from "react-icons";

import useLoginModal from "@/app/hooks/useLoginModal";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  logOut?: () => void;
}

const SidebarItem = ({ href, label, icon: Icon, logOut }: SidebarItemProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const session = useSession();

  const onClickHandler = useCallback(() => {
    if (logOut) {
      return logOut();
    }

    if (session.status === "unauthenticated" && href !== "/") {
      return loginModal.onOpen();
    }

    if (href) {
      return router.push(href);
    }
  }, [logOut, href, router, loginModal, session]);

  return (
    <div className="flex items-center">
      {/* Mobile */}
      <div
        onClick={onClickHandler}
        className="
          relative
          h-14
          w-14
          cursor-pointer
          items-center
          justify-center
          rounded-full
          p-4
          hover:bg-slate-300
          hover:bg-opacity-10
          lg:hidden
        "
      >
        <Icon size={28} color="white" />
        <p className="lg:text-xl lg:text-white">{label}</p>
      </div>

      {/* Desktop */}
      <div
        onClick={onClickHandler}
        className="
          hidden
          lg:relative
          lg:flex
          lg:cursor-pointer
          lg:items-center
          lg:gap-4
          lg:rounded-full
          lg:p-4
          lg:hover:bg-slate-300
          lg:hover:bg-opacity-10
        "
      >
        <Icon size={24} color="white" />
        <p className="lg:text-xl lg:text-white">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
