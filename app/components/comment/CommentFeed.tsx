import CommentItem from "./CommentItem";
import { CommentWithUser } from "@/app/actions/getCommentsFromPost";

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
