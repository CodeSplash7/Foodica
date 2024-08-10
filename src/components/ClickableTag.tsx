import { Blog } from "@/utils/allSides/blogsFunctions";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed_400 = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function ClickableTag({
  blog,
  addStyles,
  tag
}: {
  blog?: Blog;
  tag?: string;
  addStyles?: string;
}) {
  const tagToClick = blog ? blog.mainTag : tag ? tag : "";

  return (
    <Link
      href={`/blogs?tag=${tagToClick.toLowerCase()}`}
      className={`relative z-10 before:content-[''] before:absolute before:z-[-1] before:top-0 before:bottom-0 before:left-[-0.25em] before:right-[-0.25em] before:bg-[#fc2f70] before:origin-bottom before:scale-y-[0.1] before:transition-transform before:duration-100 before:ease-in-out hover:before:scale-y-[1] hover:before:bg-[hsla(341,97%,59%,0.75)] ${roboto_condensed_400.className} transition duration-150 ${addStyles}`}
    >
      {tagToClick}
    </Link>
  );
}
