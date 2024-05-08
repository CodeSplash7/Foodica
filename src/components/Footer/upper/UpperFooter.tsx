import { getBlogTags } from "@/utils/allSides/blogsFunctions";
import Category from "./Category";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default function UpperFooter() {
  const tags = getBlogTags();
  return (
    <div className={`h-fit flex flex-col`}>
      <div className={`flex flex-col gap-y-[16px]`}>
        <div
          className={`text-[rgb(54,57,64)] text-[20px] font-bold [letter-spacing:1.2px] ${roboto_condensed.className}`}
        >
          CATEGORIES
        </div>
        <div className={`flex flex-wrap gap-x-[16px] gap-y-[8px]`}>
          {tags.map((tag) => (
            <Category key={tag} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
