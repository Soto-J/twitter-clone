import getAllUsers from "@/app/actions/getAllUsers";
import Button from "../Button";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const Followbar = async () => {
  const users = await getAllUsers();
  const session = await getServerSession();
  console.log("USERS", users);
  console.log("SESSION", session);
  if (users?.length === 0 || session === null) {
    return null;
  }

  return (
    <div className="hidden px-6 py-4 lg:block">
      <div className="rounded-xl bg-neutral-800 p-4">
        <h2 className="text-xl font-bold text-white">Who to follow</h2>
        <div className="mt-4 flex flex-col gap-6">
          {users?.map((user) => (
            <div key={user.id} className="flex gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-neutral-400">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followbar;
