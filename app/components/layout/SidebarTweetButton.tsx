import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";

interface SidebarTweetButtonProps {}

const SidebarTweetButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
      {/* Mobile */}
      <div
        className="
          mt-6
          flex
          h-14
          w-14
          cursor-pointer
          items-center
          justify-center
          rounded-full
          bg-sky-500
          transition
          hover:bg-opacity-80
          lg:hidden
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      {/* Desktop */}
      <div
        className="
          hidden
          lg:mt-6
          lg:block
          lg:cursor-pointer
          lg:rounded-full
          lg:bg-sky-500
          lg:px-4
          lg:py-2
          lg:transition
          lg:hover:bg-opacity-90
        "
      >
        <p className="
        
        ">Tweet</p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
