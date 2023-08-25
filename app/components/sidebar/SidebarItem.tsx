"use client";
import { IconType } from "react-icons";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick: () => void;
}

const SidebarItem = ({
  href,
  label,
  icon: Icon,
  onClick,
}: SidebarItemProps) => {
  return (
    <div className="flex items-center">
      {/* Mobile */}
      <div
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
        <Icon size={28} color="white" onClick={onClick} />
      </div>

      {/* Desktop */}
      <div
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
        <p className="text-xl text-white">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
