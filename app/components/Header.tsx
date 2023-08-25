"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header = ({ label, showBackArrow }: HeaderProps) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b border-neutral-800 p-5">
      <div className="flex items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={28}
            className="cursor-pointer transition hover:opacity-70"
          />
        )}
        <h1 className="text-xl font-semibold text-white">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
