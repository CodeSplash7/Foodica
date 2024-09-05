import { Blog } from "@/types/blog-types";
import PaginationButtons from "./PaginationButtons";
import PaginationDirectionButton from "./PaginationDirectionButton";
import { getDivisions } from "@/general-utils/blogsFunctions";
import { useMemo } from "react";

export default function Pagination({
  currentBlogPage,
  allBlogs
}: {
  currentBlogPage: number;
  allBlogs: Blog[];
}) {
  const pagesCount = useMemo(
    () => getDivisions(allBlogs, 4).length,
    [allBlogs]
  );
  return (
    <div className="relative mt-[32px] flex flex-row w-full h-fit gap-[16px] justify-between">
      <PaginationDirectionButton
        direction="left"
        currentBlogPage={currentBlogPage}
        pagesCount={pagesCount}
      />
      <PaginationButtons
        currentBlogPage={currentBlogPage}
        pagesCount={pagesCount}
      />
      <PaginationDirectionButton
        direction="right"
        currentBlogPage={currentBlogPage}
        pagesCount={pagesCount}
      />
    </div>
  );
}
