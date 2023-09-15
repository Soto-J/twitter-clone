import getCurrentUser from "@/app/actions/getCurrentUser";
import { PostWithUserAndComments } from "@/app/actions/getAllPosts";

import PostItem from "./PostItem";

interface PostFeedProps {
  posts: PostWithUserAndComments[] | null;
}

const PostFeed = async ({ posts }: PostFeedProps) => {
  const currentUser = await getCurrentUser();

  return (
    <>
      {posts?.map((post) => (
        <PostItem key={post.id} user={currentUser} post={post} />
      ))}
    </>
  );
};

export default PostFeed;
