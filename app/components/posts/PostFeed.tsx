import { User, Comment } from "@prisma/client";
import { getUserPostsById } from "@/app/actions/getUserPostsById";
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
  // const allPosts = await getAllPosts();
  console.log("user", user);
  if (user === null) {
    return (
      <>
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </>
    );
  }
  
  const userPosts = await getUserPostsById(user?.id);

  return (
    <>
      {userPosts?.map((post) => (
        <PostItem key={post.id} user={user} post={post} />
      ))}
    </>
  );
};

export default PostFeed;
