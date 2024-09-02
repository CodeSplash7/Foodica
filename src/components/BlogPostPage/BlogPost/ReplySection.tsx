"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { BlogComment, BlogReply } from "@/utils/allSides/blogsFunctions";
import { CommentsDivider } from "./BlogComments";
import Replies from "./Replies";
import { useSession } from "next-auth/react";
import { User } from "@/utils/allSides/usersFunctions";
import { createReply } from "@/utils/serverside/blogsFunctions";
import { useCurrentUserId } from "./CommentSection";

const inter_bolder = Inter({
  subsets: ["latin"],
  weight: "700"
});

export default function ReplySection({
  blogId,
  commentAuthor,
  comment,
  commentIndex,
  isReply,
  incrementCommentCount,
  addReply
}: {
  blogId: string;
  commentAuthor: User;
  comment: BlogComment;
  commentIndex?: number;
  isReply?: boolean;
  addReply?: (reply: BlogReply) => void;
  incrementCommentCount: () => void;
}) {
  const { data: session } = useSession();
  const userId = useCurrentUserId(session);
  const { isReplying, error, handleOpenReplyInput, closeReply } =
    useReplyState(userId);

  const replyHandler = useHandleReplies(
    userId,
    comment,
    incrementCommentCount,
    !!isReply,
    addReply
  );

  return (
    <div>
      <div>
        {isReplying ? (
          <CommentInput
            closeReply={closeReply}
            userId={userId}
            commentAuthorName={commentAuthor.profile.username}
            onAddComment={replyHandler.handleNewReply}
          />
        ) : (
          <ReplyButton handleClick={handleOpenReplyInput} />
        )}
        {error && <div>{error}</div>}
      </div>
      <CommentsDivider />
      {replyHandler.addReply && replyHandler.replies.length && !isReply && commentIndex !== undefined ? (
        <Replies
          incrementCommentCount={incrementCommentCount}
          comment={comment}
          blogId={blogId}
          commentAuthor={commentAuthor}
          commentIndex={commentIndex}
          replies={replyHandler.replies}
          addReply={replyHandler.addReply}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ReplyButton: React.FC<{ handleClick: () => void }> = ({
  handleClick
}) => {
  return (
    <div
      onClick={handleClick}
      className={`w-fit transition duration-150 hover:text-gray-500 text-gray-700 ${inter_bolder.className}`}
    >
      REPLY
    </div>
  );
};

function useReplyState(userId: string | undefined) {
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState("");

  function handleOpenReplyInput() {
    if (userId) return setIsReplying(true);

    (async () => {
      setError("Log in to reply to comments!");
      await delay(5000);
      setError("");
    })();
  }

  function closeReply() {
    setIsReplying(false);
  }

  return { isReplying, error, handleOpenReplyInput, closeReply };
}

function useHandleReplies(
  userId: string | undefined,
  comment: BlogComment,
  incrementCommentCount: () => void,
  isReply: boolean,
  addReply: ((reply: BlogReply) => void) | undefined
) {
  let replies;
  let handleNewReply;
  let hookAddReply;

  if (isReply && addReply) {
    const res = useReplyToReply(userId, comment, addReply);
    (replies = res.replies), (handleNewReply = res.handleNewReply);
  } else {
    const res = useReplyToComment(userId, comment, incrementCommentCount);
    (replies = res.replies),
      (handleNewReply = res.handleNewReply),
      (hookAddReply = res.addReply);
  }

  return {
    replies,
    handleNewReply,
    addReply: hookAddReply
  };
}

function useReplyToComment(
  userId: string | undefined,
  comment: BlogComment,
  incrementCommentCount: () => void
) {
  const [replies, setReplies] = useState<BlogReply[]>(comment.replies);
  const addReply = (reply: BlogReply) => {
    setReplies([...replies, reply]);
    incrementCommentCount();
  };

  const handleNewReply = async (content: string) => {
    if (!userId) return { ok: false };
    const { res: reply } = await createReply(content, comment.id, userId);
    if (!reply) return { ok: false };
    addReply(reply);
    return { ok: true };
  };

  return { replies, handleNewReply, addReply };
}

function useReplyToReply(
  userId: string | undefined,
  comment: BlogComment,
  addReply: (reply: BlogReply) => void
) {
  const [replies] = useState<BlogReply[]>(comment.replies);

  const handleNewReply = async (content: string) => {
    if (!userId) return { ok: false };
    const { res: reply } = await createReply(content, comment.id, userId);
    if (!reply) return { ok: false };
    addReply(reply);
    return { ok: true };
  };

  return { replies, handleNewReply };
}
