import { type Blog } from "@/utils/allSides/blogsFunctions";
import PaginationButtons from "./PaginationButtons";
import PaginationDirectionButton from "./PaginationDirectionButton";
import { getDivisions } from "@/utils/allSides/blogsFunctions";

export default function Pagination({
  currentBlogPage,
  allBlogs
}: {
  currentBlogPage: number;
  allBlogs: Blog[];
}) {
  const pagesCount = getDivisions(allBlogs, 4).length;
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
