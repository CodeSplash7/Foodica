import { Blog, BlogComment } from "@/utils/allSides/blogsFunctions";
import { getUserByEmail, getUserById } from "@/utils/serverside/userFunctions";
import { getServerSession } from "next-auth";
import CommentMessage from "./CommentMessage";
import ReplySection from "./ReplySection";
import { CommentsSeparationLine } from "./BlogComments";
import CommentHeader from "./CommentHeader";

export default async function Comment({
  comment,
  commentIndex,
  blogId
}: {
  commentIndex: number;
  comment: BlogComment;
  blogId: string;
}) {
  const session = await getServerSession();
  const user = session?.user;
  const userId = (await getUserByEmail(user?.email))?.id;
  const commentAuthor = await getUserById(comment.userId);
  if (commentAuthor)
    return (
      <div
        id={`comment${commentIndex + 1}`}
        className={`flex flex-col gap-[16px]`}
      >
        <CommentHeader
          commentAuthor={commentAuthor}
          commentTimestamp={comment.timestamp}
        />
        <CommentMessage
          commentIndex={commentIndex + 1}
          message={comment.content}
        />
        <ReplySection
          blogId={blogId}
          parentCommentId={comment.id}
          commentAuthorName={commentAuthor.profile.username}
          userId={userId}
        />
        <CommentsSeparationLine />
      </div>
    );
}
