"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { BlogComment } from "@/utils/allSides/blogsFunctions";

const inter_bolder = Inter({
  subsets: ["latin"],
  weight: "700"
});

export default function ReplySection({
  blogId,
  commentAuthorName,
  userId,
  isTopComment,
  comment
}: {
  blogId: string;
  commentAuthorName: string;
  userId: string | undefined;
  isTopComment: boolean;
  comment: BlogComment;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState("");

  function handleClick() {
    if (userId) {
      setIsReplying(true);
      return;
    }
    (async () => {
      setError("Log in to reply to comments!");
      await delay(5000);
      setError("");
    })();
  }
  return (
    <div>
      {isReplying ? (
        <CommentInput
          closeReply={() => setIsReplying(false)}
          blogId={blogId}
          userId={userId}
          commentAuthorName={commentAuthorName}
          parentCommentId={isTopComment ? comment.id : comment.parentId!}
        />
      ) : (
        <div
          onClick={handleClick}
          className={`w-fit transition duration-150 hover:text-gray-500 text-gray-700 ${inter_bolder.className}`}
        >
          REPLY
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
