import { Blog } from "@/utils/allSides/blogsFunctions";
import CommentInput from "./CommentInputField";

export default async function CommentSection({
  blog,
  authorId
}: {
  blog: Blog;
  authorId: string;
}) {
  return (
    <div>
      <CommentInput blog={blog} authorId={authorId} />
    </div>
  );
}
