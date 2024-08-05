import { Blog } from "@/utils/allSides/blogsFunctions";
import { Skeleton } from "@mui/material";

export default function BlogConclusion({ blog }: { blog: Blog | "loading" }) {
  if (blog === "loading")
    return (
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    );
  return (
    <div
      className={`leading-7 text-gray-700 [word-break:break-all] [overflow-wrap:break-word]`}
    >
      {blog.conclusion}
    </div>
  );
}
