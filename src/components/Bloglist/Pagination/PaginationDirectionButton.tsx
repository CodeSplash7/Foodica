import Link from "next/link";
import DirectionIcon from "./DirectionIcon";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

const buttonStyles = `flex flex-row items-center justify-center gap-[5px] px-[20px] py-[10px]
                      border rounded-[3px] border-transparent sm:border-[#aeaeae] hover:border-[#474747]
                      text-[14px] font-bold [letter-spacing:2px] text-[#50545e] sm:text-[#363940]
                      transition duration-200`;

export default function PaginationDirectionButton({
  direction,
  currentBlogPage,
  pagesCount
}: {
  direction: "left" | "right";
  currentBlogPage: number;
  pagesCount: number;
}) {
  let destinatedPage: number = 1;
  let buttonInvisibilityCondition: boolean = false;
  let buttonTextLabel = "";

  if (direction === "left") {
    buttonInvisibilityCondition = currentBlogPage <= 1;
    buttonTextLabel = "PREVIOUS";
    destinatedPage = currentBlogPage - 1;
  }
  if (direction === "right") {
    buttonInvisibilityCondition = currentBlogPage >= pagesCount;
    buttonTextLabel = "NEXT";
    destinatedPage = currentBlogPage + 1;
  }

  return (
    <Link
      href={`/blogs?p=${destinatedPage}`}
      className={
        buttonStyles +
        (buttonInvisibilityCondition ? " opacity-0 pointer-events-none" : "")
      }
    >
      {direction === "left" && <DirectionIcon direction={direction} />}
      <div className={roboto_condensed.className}>{buttonTextLabel}</div>
      {direction === "right" && <DirectionIcon direction={direction} />}
    </Link>
  );
}
