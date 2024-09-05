import { type Blog } from "@/types/blog-types";
import { blogCommentsLinkByBlog } from "@/general-utils/app-routes";
import Link from "next/link";

export default function CommentsLink({
  blog,
  children,
  addStyles
}: {
  blog: Blog | "loading";
  children?: React.ReactNode;
  addStyles?: string;
}) {
  if (blog === "loading") return <div>{children}</div>;

  const href = blogCommentsLinkByBlog(blog);

  return (
    <Link
      href={href}
      className={`relative 
        before:absolute before:top-0 before:bottom-0 before:left-[-8px] before:w-[2px] before:bg-[#fc2f70] before:scale-y-0 before:origin-top 
        hover:before:origin-bottom hover:before:scale-y-100 
        before:transition-transform before:duration-300 before:ease-linear 
        after:absolute after:top-0 after:bottom-0 after:right-[-8px] after:w-[2px] after:bg-[#fc2f70] after:scale-y-0 after:origin-bottom 
        hover:after:origin-top hover:after:scale-y-100 after:transition-transform after:duration-300 after:ease-linear 
        font-regular 
      transition duration-150 ${addStyles}`}
    >
      {children}
    </Link>
  );
}
