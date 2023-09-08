import getCurrentUser from "@/app/actions/getCurrentUser";
import { getPostById } from "@/app/actions/getPostById";
import Form from "@/app/components/Form";
import Header from "@/app/components/Header";
import PostItem from "@/app/components/posts/PostItem";

interface IParams {
  postId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const { postId } = params;
  const post = await getPostById({ postId });
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem user={currentUser} post={post} />
      <Form
        isComment
        placeholder="Reply to this post..."
        postId={postId}
        user={currentUser}
      />
    </>
  );
};

export default page;
