"use client";
import { BlogComment, BlogReply } from "@/utils/allSides/blogsFunctions";
import CommentHeader from "./CommentHeader";
import CommentMessage from "./CommentMessage";
import ReplySection from "./ReplySection";
import { User } from "@/utils/allSides/usersFunctions";

export default function Replies({
  replies,
  commentIndex,
  commentAuthor,
  blogId,
  comment,
  incrementCommentCount,
  addReply
}: {
  replies: BlogReply[];
  commentIndex: number;
  blogId: string;
  commentAuthor: User;
  comment: BlogComment;
  incrementCommentCount: () => void;
  addReply: (reply: BlogReply) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-[24px]">
      {replies.map((reply, index) => (
        <Reply
          incrementCommentCount={incrementCommentCount}
          key={index}
          comment={comment}
          blogId={blogId}
          commentAuthor={commentAuthor}
          reply={reply}
          htmlReplyId={`comment${commentIndex}:reply${index}`}
          addReply={addReply}
        />
      ))}
    </div>
  );
}

const Reply: React.FC<{
  commentAuthor: User;
  htmlReplyId: string;
  reply: BlogReply;
  blogId: string;
  comment: BlogComment;
  incrementCommentCount: () => void;
  addReply: (reply: BlogReply) => void;
}> = ({
  htmlReplyId,
  reply,
  commentAuthor,
  blogId,
  comment,
  incrementCommentCount,
  addReply
}) => {
  return (
    <div
      id={htmlReplyId}
      className={`self-start w-full flex flex-col gap-[16px] pl-[64px]`}
    >
      <CommentHeader
        commentAuthor={commentAuthor}
        commentTimestamp={reply.timestamp}
        isReply
      />
      <CommentMessage htmlCommentId={htmlReplyId} message={reply.content} />
      <ReplySection
        incrementCommentCount={incrementCommentCount}
        isReply
        comment={comment}
        blogId={blogId}
        commentAuthor={commentAuthor}
        addReply={addReply}
      />
    </div>
  );
};
