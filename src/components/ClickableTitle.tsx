import { type Blog } from "@/utils/allSides/blogsFunctions";
import Link from "next/link";

export default function ClickableTitle({
  blog,
  className,
  label,
  children
}: {
  blog: Blog;
  className: string;
  label?: string;
  children?: React.ReactNode;
}) {
  const urlTitle = blog.title.toLowerCase().split(" ").join("-");

  const blogDate = new Date(blog.creationDate);
  const href = `/blogs/${blogDate.getFullYear()}/${
    blogDate.getMonth() + 1
  }/${blogDate.getDate()}/${urlTitle}`;

  return (
    <Link href={href} className={className}>
      {children ? children : !!label ? label : blog.title}
    </Link>
  );
}
