import { Blog } from "@/utils/allSides/blogsFunctions";
import CommentInputField from "./CommentInputField";

export default async function CommentSection({ blog }: { blog: Blog }) {
  return (
    <div>
      <CommentInputField blog={blog} />
    </div>
  );
}
