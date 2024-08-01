import { findRepliesForComment } from "@/utils/serverside/blogsFunctions";
import Comment from "./Comment";
import { CommentsSeparationLine } from "./BlogComments";

export default async function Replies({
  parentCommentId,
  blogId,
  parentCommentIndex
}: {
  parentCommentId: string;
  blogId: string;
  parentCommentIndex?: number;
}) {
  const replies = await findRepliesForComment(parentCommentId);
  return (
    <div className="w-full flex flex-col gap-[24px]">
      {replies.map((r, i) => (
        <div className="flex w-full h-full flex-col gap-[0px]">
          <Comment
            parentCommentIndex={parentCommentIndex}
            isTopComment={false}
            key={i}
            blogId={blogId}
            comment={r}
            commentIndex={i}
          />
          <CommentsSeparationLine />
        </div>
      ))}
    </div>
  );
}
