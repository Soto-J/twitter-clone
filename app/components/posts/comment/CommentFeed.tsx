import getUserById from "@/app/actions/getUserById";
import CommentItem from "./CommentItem";
import {
  CommentWithUser,
  getCommentsFromPost,
} from "@/app/actions/getCommentsFromPost";
import { Comment, User } from "@prisma/client";

interface CommentFeedProps {
  comments: CommentWithUser[] | null;
}

const CommentFeed = async ({ comments }: CommentFeedProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
