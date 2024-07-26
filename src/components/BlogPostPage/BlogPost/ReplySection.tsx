"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import CommentInput from "./CommentInput";

const inter_bolder = Inter({
  subsets: ["latin"],
  weight: "700"
});

export default function ReplySection({
  blogId,
  parentCommentId,
  commentAuthorName,
  userId
}: {
  blogId: string;
  parentCommentId: string;
  commentAuthorName: string;
  userId: string | undefined;
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
          blogId={blogId}
          userId={userId}
          commentAuthorName={commentAuthorName}
          parentCommentId={parentCommentId}
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
