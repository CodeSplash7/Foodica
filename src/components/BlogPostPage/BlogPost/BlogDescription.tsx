import { Blog } from "@/utils/allSides/blogsFunctions";

export default function BlogDescription({ blog }: { blog: Blog }) {
  return (
    <div
      className={`leading-7 text-gray-700 [word-break:break-all] [overflow-wrap:break-word]`}
    >
      {blog.description}
    </div>
  );
}
