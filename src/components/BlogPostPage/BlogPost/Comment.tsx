"use client";
import { type BlogComment } from "@/types/blog-types";
import { type User } from "@/types/user-types";

import CommentMessage from "./CommentMessage";
import ReplySection from "./ReplySection";
import CommentHeader from "./CommentHeader";

import { useCallback, useEffect, useState } from "react";

interface CommentProps {
  commentIndex: number;
  comment: BlogComment;
  blogId: string;
  incrementCommentCount: () => void;
  commentAuthors: Map<string, User | null>;
}

export default function Comment({
  comment,
  commentIndex,
  blogId,
  incrementCommentCount,
  commentAuthors
}: CommentProps) {
  const commentAuthor = useCommentAuthor(commentAuthors, comment);
  if (commentAuthor)
    return (
      <div
        id={`comment${commentIndex}`}
        className={`self-start w-full flex flex-col gap-[16px] `}
      >
        <CommentHeader
          commentAuthor={commentAuthor}
          commentTimestamp={comment.timestamp}
        />
        <CommentMessage
          htmlCommentId={`comment${commentIndex}`}
          message={comment.content}
        />
        <ReplySection
          incrementCommentCount={incrementCommentCount}
          comment={comment}
          commentIndex={commentIndex}
          blogId={blogId}
          commentAuthor={commentAuthor}
        />
      </div>
    );
}

function useCommentAuthor(
  commentAuthors: Map<string, User | null>,
  comment: BlogComment
) {
  const [commentAuthor, setCommentAuthor] = useState<User | null | undefined>();
  const getCommentAuthor = useCallback(async () => {
    setCommentAuthor(commentAuthors.get(comment.userId));
  }, [comment.userId]);
  useEffect(() => {
    getCommentAuthor();
  }, [getCommentAuthor]);

  return commentAuthor;
}
