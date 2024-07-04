import { Blog } from "@/utils/allSides/blogsFunctions";
import Link from "next/link";

export default function ClickableTag({
  blog,
  className,
  tag
}: {
  blog?: Blog;
  tag?: string;
  className?: string;
}) {
  const tagToClick = blog ? blog.mainTag : tag ? tag : "";

  return (
    <Link href={`/blogs?t=${tagToClick.toLowerCase()}`} className={className}>
      {tagToClick}
    </Link>
  );
}
