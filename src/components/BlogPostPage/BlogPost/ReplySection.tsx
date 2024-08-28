"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { Blog, BlogComment, BlogReply } from "@/utils/allSides/blogsFunctions";
import { CommentsDivider } from "./BlogComments";
import Replies from "./Replies";
import { getUserByEmail } from "@/utils/serverside/userFunctions";
import { useSession } from "next-auth/react";
import { User } from "@/utils/allSides/usersFunctions";
import { createReply } from "@/utils/serverside/blogsFunctions";
import { useRender } from "@/components/RegisterForm/CustomInput";

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
  const [userId, setUserId] = useState<string>();
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState("");
  const [replies, setReplies] = useState<BlogReply[]>(comment.replies);

  useEffect(() => {
    (async () => {
      setUserId((await getUserByEmail(session?.user?.email))?.id);
    })();
  }, [session]);

  const handleNewReply = async (content: string) => {
    if (!userId) return { ok: false };
    const { res: reply } = await createReply(content, comment.id, userId);
    if (!reply) return { ok: false };
    setReplies([...replies, reply]);
    incrementCommentCount();
    if (isReply) addReply?.(reply);
    return { ok: true };
  };
  return (
    <div>
      <div>
        {isReplying ? (
          <CommentInput
            closeReply={() => setIsReplying(false)}
            blogId={blogId}
            userId={userId}
            commentAuthorName={commentAuthor.profile.username}
            onAddComment={handleNewReply}
          />
        ) : (
          <ReplyButton handleClick={handleOpenReplyInput} />
        )}
        {error && <div>{error}</div>}
      </div>
      <CommentsDivider />
      {replies.length && !isReply && commentIndex !== undefined ? (
        <Replies
          incrementCommentCount={incrementCommentCount}
          comment={comment}
          blogId={blogId}
          commentAuthor={commentAuthor}
          commentIndex={commentIndex}
          replies={replies}
          addReply={(reply: BlogReply) => setReplies([...replies, reply])}
        />
      ) : (
        <></>
      )}
    </div>
  );
  function handleOpenReplyInput() {
    if (userId) return setIsReplying(true);

    (async () => {
      setError("Log in to reply to comments!");
      await delay(5000);
      setError("");
    })();
  }
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
