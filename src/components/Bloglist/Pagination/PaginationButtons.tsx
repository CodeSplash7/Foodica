import filterNulls from "@/general-utils/filterNulls";
import PaginationButton from "./PaginationButton";
import removeDuplicates from "@/general-utils/removeDuplicates";
import { getButtonPages } from "@/general-utils/getButtonPages";

export default function PaginationButtons({
  currentBlogPage,
  pagesCount
}: {
  currentBlogPage: number;
  pagesCount: number;
}) {
  let buttonPages = getButtonPages(currentBlogPage, pagesCount);
  buttonPages = filterNulls(buttonPages);
  buttonPages = removeDuplicates(buttonPages);

  return (
    <div className="flex gap-[6px] items-center absolute sm:relative left-[50%] sm:left-0 translate-x-[-50%] sm:translate-x-0">
      {buttonPages.map((btn) => {
        return (
          <PaginationButton
            key={btn}
            btn={btn}
            isActive={currentBlogPage === btn}
          />
        );
      })}
    </div>
  );
}
