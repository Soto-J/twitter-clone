"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  isAuth?: User | null;
}

const SidebarItem = ({
  href,
  label,
  icon: Icon,
  onClick,
  isAuth,
}: SidebarItemProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  console.log("isAuth", isAuth);

  const onClickHandler = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (!isAuth) {
      return loginModal.onOpen();
    }

    if (href) {
      return router.push(href);
    }
  }, [onClick, href, router]);

  return (
    <div className="flex items-center">
      {/* Mobile */}
      <div
        onClick={onClick}
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
