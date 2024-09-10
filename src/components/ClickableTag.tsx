"use client" ;import { Blog, BlogTag } from "@/types/blog-types";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { blogsLinkByTag } from "@/general-utils/app-routes";
import { useRouter } from "next/navigation";

const roboto_condensed_400 = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function ClickableTag({
  useNavigation,
  blog,
  addStyles,
  tag
}: {
  useNavigation?: boolean;
  blog?: Blog;
  tag?: BlogTag;
  addStyles?: string;
}) {
  const router = useRouter();
  const tagToClick = blog ? blog.mainTag : tag ? tag : "";
  const classnames = `tag-link ${roboto_condensed_400.className} ${addStyles}`;

  const handleClick = () => {
    if (tagToClick) {
      router.push(blogsLinkByTag(tagToClick));
    }
  };

  if (useNavigation) {
    return (
      <span className={classnames} onClick={handleClick}>
        {tagToClick}
      </span>
    );
  }

  return (
    <Link
      href={tagToClick ? blogsLinkByTag(tagToClick) : "#"}
      className={classnames}
    >
      {tagToClick}
    </Link>
  );
}
