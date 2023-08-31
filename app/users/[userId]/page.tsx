import { useParams } from "next/navigation";

import getUserById from "@/app/actions/getUserById";

import Header from "../../components/Header";

interface IParams {
  userId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const user = await getUserById(params);
  console.log("USER", user);

  return (
    <div>
      <Header label="Users" showBackArrow />
      <p className="text-white">{user?.name}</p>
    </div>
  );
};

export default page;
