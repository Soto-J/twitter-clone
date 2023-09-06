"use client";
import { useCallback, useMemo, type MouseEvent } from "react";
import { useRouter } from "next/navigation";

import type { Comment, User } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";

import Avatar from "../Avatar";

interface PostItemProps {
  user?: User | null;
  post: {
    user?: User | null;
    id: string | null;
    body: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    likedIds: string[] | null;
    userId: string | null;
    comments: Comment[];
  };
}

const PostItem = ({ user, post }: PostItemProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const goToUser = useCallback(
    (e: MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();

      router.push(`/users/${post?.userId}`);
    },
    [post, router]
  );

  const goToPost = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      router.push(`/posts/${post.id}`);
    },
    [post, router]
  );

  const onLike = useCallback(() => {
    // e.stopPropogation();
    loginModal.onOpen();
  }, [loginModal]);

  const createdAt = useMemo(() => {
    if (!post.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post]);

  return (
    <div
      onClick={goToPost}
      className="
        cursor-pointer
        border-b
        border-neutral-800
        p-5
        transition
        hover:bg-neutral-700
      "
    >
      <div className="flex items-start gap-3">
        <Avatar user={post.user} />
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
              {post.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="
                hidden 
                cursor-pointer 
                text-neutral-500 
                hover:underline 
                md:block
              "
            >
              @{post.user?.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>

          <p className="mt-1 text-white">{post.body}</p>

          <div className="mt-3 flex items-center gap-10">
            <div
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                text-neutral-500
                transition
                hover:text-sky-500
              "
            >
              <AiOutlineMessage size={20} />
              <p>{post.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                text-neutral-500
                transition
                hover:text-red-500
              "
            >
              <AiOutlineHeart size={20} />
              <p>{post.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
