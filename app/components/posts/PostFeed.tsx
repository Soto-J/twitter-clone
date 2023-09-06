import { User, Comment } from "@prisma/client";
import PostItem from "./PostItem";

interface PostFeedProps {
  user?: User | null;
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

const PostFeed = async ({ user, posts }: PostFeedProps) => {
  return (
    <>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostFeed;
