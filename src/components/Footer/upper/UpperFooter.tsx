import { blogTags } from "@/general-utils/blogsFunctions";
import Category from "./Category";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default async function UpperFooter() {
  const tags = blogTags;
  return (
    <div className={`h-fit flex flex-col`}>
      <div className={`flex flex-col gap-y-[16px]`}>
        <div
          className={`text-[rgb(54,57,64)] text-[20px] font-bold [letter-spacing:1.2px] ${roboto_condensed.className}`}
        >
          CATEGORIES
        </div>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-[16px] gap-y-[8px]`}
        >
          {tags.map((tag) => (
            <Category key={tag} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
