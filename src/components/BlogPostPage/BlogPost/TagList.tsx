import ClickableTag from "@/components/ClickableTag";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: ["500", "700"],
  subsets: ["latin"]
});

export default function TagList({ blog }: { blog: Blog }) {
  const tagList = Array.from(new Set([blog.mainTag, ...blog.secondaryTags]));
  return (
    <div className={`w-full h-fit  flex flex-col items-center gap-[16px]`}>
      <div className={"border-t-2 border-gray-200 w-[128px] pb-[24px]"}></div>

      <div className={`${roboto_condensed.className} uppercase font-bold`}>
        Tags
      </div>
      <div className={`flex gap-[16px] flex-wrap justify-center`}>
        {tagList.map((tag) => (
          <div
            className={`flex w-fit h-fit pt-[10px] bg-transparent hover:bg-yellow-400 transition duration-300`}
          >
            <ClickableTag
              tag={tag}
              className={`${roboto_condensed.className} px-[8px] leading-[3px] border-b-8 border-yellow-400 text-[.9rem] tracking-tighter uppercase`}
            ></ClickableTag>
          </div>
        ))}
      </div>

      <div className={"border-b-2 border-gray-200 w-[100px] pt-[24px]"}></div>
    </div>
  );
}
