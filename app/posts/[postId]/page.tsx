import { getUserPostsById } from "@/app/actions/getUserPostsById";

interface IParams {
  postId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const postId = params.postId;
  const userPosts = await getUserPostsById(params);

  // console.log("params", params);
  // console.log("USER POSTS",userPosts);
  return <div>pagee</div>;
};

export default page;
