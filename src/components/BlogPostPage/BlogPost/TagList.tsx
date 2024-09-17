import ClickableTag from "@/components/ClickableTag";
import { Blog, BlogTag } from "@/types/blog-types";
import { Skeleton } from "@mui/material";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: ["500", "700"],
  subsets: ["latin"]
});

export default function TagList({ blog }: { blog: Blog | "loading" }) {
  const tagList =
    blog === "loading"
      ? "loading"
      : Array.from(new Set([blog.mainTag, ...blog.secondaryTags]));

  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[16px]`}>
      <div className={"border-t-2 border-gray-200 w-[128px] pb-[24px]"}></div>

      <div className={`${roboto_condensed.className} uppercase font-bold`}>
        Tags
      </div>
      <div className={`flex gap-[16px] flex-wrap justify-center`}>
        {tagList === "loading"
          ? Array(3)
              .fill(0)
              .map((_, index) => <Tag key={index} tag="loading" />)
          : tagList.map((tag, index) => <Tag key={index} tag={tag} />)}
      </div>

      <div className={"border-b-2 border-gray-200 w-[100px] pt-[24px]"}></div>
    </div>
  );
}

const Tag = ({ tag }: { tag: BlogTag | "loading" }) => {
  if (tag === "loading") {
    return <Skeleton variant="text" width={60} sx={{ fontSize: "0.9rem" }} />;
  }
  return (
    <div
      className={`flex w-fit h-fit pt-[10px] bg-transparent hover:bg-yellow-400 transition duration-300`}
    >
      {
        <ClickableTag
          tag={tag}
          addStyles={`${roboto_condensed.className} px-[8px] leading-[3px] border-b-8 border-yellow-400 text-[.9rem] tracking-tighter uppercase`}
        ></ClickableTag>
      }
    </div>
  );
};
