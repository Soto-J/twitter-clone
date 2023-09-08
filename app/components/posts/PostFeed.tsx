import { User, Comment } from "@prisma/client";
import PostItem from "./PostItem";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface PostFeedProps {
  posts?:
    | {
        user: User | null;
        id: string;
        body: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        likedIds: string[] | null;
        userId: string | null;
        comments: Comment[];
      }[]
    | null;
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
