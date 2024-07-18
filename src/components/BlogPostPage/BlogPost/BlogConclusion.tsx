import { Blog } from "@/utils/allSides/blogsFunctions";

export default function BlogConclusion({ blog }: { blog: Blog }) {
  return (
    <div
      className={`leading-7 text-gray-700 [word-break:break-all] [overflow-wrap:break-word]`}
    >
      {blog.conclusion}
    </div>
  );
}
