"use client";
import { useCallback, type MouseEvent, useMemo } from "react";
import { useRouter } from "next/navigation";

import { CommentWithUser } from "@/app/actions/getCommentsFromPost";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../Avatar";

interface CommentItemProps {
  comment: CommentWithUser;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();
      router.push(`/users/${comment.userId}`);
    },
    [comment, router]
  );

  const createdAt = useMemo(() => {
    if (!comment.createdAt) return null;

    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);

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
        <div>
          <div className="flex items-center gap-2">
            <p
              onClick={goToUser}
              className="
                cursor-pointer
                font-semibold
              text-white
                hover:underline
              "
            >
              {comment?.user.name}
            </p>
            <span
              className="
                hidden 
                cursor-pointer 
                text-neutral-500 
                hover:underline 
                md:block
              "
            >
              @{comment.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt} ago</span>
          </div>

          <p className="text-white">{comment.body}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
