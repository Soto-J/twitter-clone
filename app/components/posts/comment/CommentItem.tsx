"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, type MouseEvent, useMemo } from "react";
import Avatar from "../../Avatar";
import getUserById from "@/app/actions/getUserById";
import { User } from "@prisma/client";
import { CommentWithUser } from "@/app/actions/getCommentsFromPost";

interface CommentItemProps {
  comment: CommentWithUser | null;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();
      router.push(`/users/${comment?.userId}`);
    },
    [comment, router]
  );

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment?.createdAt]);

  return (
    <div
      className="
        cursor-pointer
        border-b
        border-neutral-800
        p-5
        transition
        hover:bg-neutral-900
      "
    >
      <div className="flex items-start gap-3">
        <Avatar user={comment?.user} />
      </div>
    </div>
  );
};

export default CommentItem;
