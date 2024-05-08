import { Blog } from "@/store/blogsSlice";
import Link from "next/link";

export default function ClickableTag({
  blog,
  className
}: {
  blog: Blog;
  className?: string;
}) {
  return (
    <Link href={`/blogs?t=${blog.mainTag.toLowerCase()}`} className={className}>
      {blog.mainTag}
    </Link>
  );
}
