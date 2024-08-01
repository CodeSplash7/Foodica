import { BlogComment } from "@/utils/allSides/blogsFunctions";
import { getUserByEmail, getUserById } from "@/utils/serverside/userFunctions";
import { getServerSession } from "next-auth";
import CommentMessage from "./CommentMessage";
import ReplySection from "./ReplySection";
import { CommentsSeparationLine } from "./BlogComments";
import CommentHeader from "./CommentHeader";
import Replies from "./Replies";

export default async function Comment({
  comment,
  commentIndex,
  blogId,
  isTopComment,
  parentCommentIndex
}: {
  commentIndex: number;
  comment: BlogComment;
  blogId: string;
  isTopComment: boolean;
  parentCommentIndex?: number;
}) {
  const session = await getServerSession();
  const user = session?.user;
  const userId = (await getUserByEmail(user?.email))?.id;
  const commentAuthor = await getUserById(comment.userId);
  if (commentAuthor)
    return (
      <div
        id={`${
          isTopComment
            ? `comment${commentIndex}`
            : `comment${parentCommentIndex}reply${commentIndex}`
        }`}
        className={`self-start w-full flex flex-col gap-[16px] ${
          isTopComment ? "gap-[16px]" : "gap-[8px]"
        }`}
      >
        <CommentHeader
          commentAuthor={commentAuthor}
          commentTimestamp={comment.timestamp}
          isTopComment={isTopComment}
        />
        <CommentMessage
          parentCommentIndex={parentCommentIndex}
          isTopComment={isTopComment}
          commentIndex={commentIndex}
          message={comment.content}
        />
        <ReplySection
          comment={comment}
          isTopComment={isTopComment}
          blogId={blogId}
          commentAuthorName={commentAuthor.profile.username}
          userId={userId}
        />
        <CommentsSeparationLine />
        {isTopComment && (
          <div className="self-end w-11/12">
            <Replies
              parentCommentIndex={commentIndex}
              blogId={blogId}
              parentCommentId={comment.id}
            />
          </div>
        )}
      </div>
    );
}
