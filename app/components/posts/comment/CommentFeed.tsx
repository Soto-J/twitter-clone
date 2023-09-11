import getUserById from "@/app/actions/getUserById";
import CommentItem from "./CommentItem";
import { getCommentsFromPost } from "@/app/actions/getCommentsFromPost";
import { Comment, User } from "@prisma/client";

interface CommentFeedProps {
  comments: any
  };
  // comments?: {
  //   id: string;
  //   body: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  //   userId: string;
  //   postId: string;
  // }[];
}

const CommentFeed = async ({ comments = [] }: CommentFeedProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} user={comment.user} />
      ))}
    </>
  );
};

export default CommentFeed;
