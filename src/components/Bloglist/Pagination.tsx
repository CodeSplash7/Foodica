"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUrl } from "@/store/URLslice";
import { setCurrentBlogPage } from "@/store/blogsSlice";
import Link from "next/link";
import { MutableRefObject, useRef } from "react";

export default function Pagination() {
  return (
    <div className="relative mt-[32px] flex flex-row w-full h-fit gap-[16px] justify-between">
      <PaginationPreviosButton />
      <PaginationButtons />
      <PaginationNextButton />
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const [width, height] = ["21", "6"];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 49 14`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={direction === "right" ? "rotate-180" : ""}
    >
      <path
        d="M0.288387 6.32783C-0.096129 6.69906 -0.096129 7.30093 0.288387 7.67215L6.55444 13.7216C6.93896 14.0928 7.56238 14.0928 7.9469 13.7216C8.33141 13.3503 8.33141 12.7485 7.9469 12.3773L2.37707 6.99999L7.9469 1.62274C8.33141 1.25151 8.33141 0.649643 7.9469 0.278417C7.56238 -0.0928055 6.93896 -0.0928055 6.55444 0.278417L0.288387 6.32783ZM49 6.04942H0.984616V7.95057H49V6.04942Z"
        fill="#363940"
      />
    </svg>
  );
}

const buttonStyles = `flex flex-row items-center justify-center gap-[5px] px-[20px] py-[10px]
                      border rounded-[3px] border-transparent sm:border-[#aeaeae] hover:border-[#474747]
                      text-[14px] font-bold [letter-spacing:2px] text-[#50545e] sm:text-[#363940]
                      transition duration-200`;
const buttonTextStyles = `[font-family:'Roboto_Condensed',sans-serif] font-bold`;

function PaginationPreviosButton() {
  const dispatch = useAppDispatch();
  const currentBlogPage = useAppSelector(
    (state) => state.blogs.currentBlogPage
  );
  const destinatedBlogPage = currentBlogPage - 1;
  const urlDestination = `/blogs/${destinatedBlogPage}`;
  return (
    <Link
      href={urlDestination}
      className={
        buttonStyles +
        (currentBlogPage <= 1 ? " opacity-0 pointer-events-none" : "")
      }
      onClick={() => {
        dispatch(setUrl(urlDestination));
        dispatch(setCurrentBlogPage(destinatedBlogPage));
      }}
    >
      <ArrowIcon direction="left" />
      <div className={buttonTextStyles}>PREVIOUS</div>
    </Link>
  );
}

function PaginationNextButton() {
  const dispatch = useAppDispatch();
  const currentBlogPage = useAppSelector(
    (state) => state.blogs.currentBlogPage
  );
  const destinatedBlogPage = currentBlogPage + 1;
  const urlDestination = `/blogs/${destinatedBlogPage}`;
  const pagesCount = useAppSelector((state) => state.blogs.pagesCount);

  return (
    <Link
      href={urlDestination}
      className={
        buttonStyles +
        (currentBlogPage >= pagesCount ? " opacity-0 pointer-events-none" : "")
      }
      onClick={() => {
        dispatch(setUrl(urlDestination));
        dispatch(setCurrentBlogPage(destinatedBlogPage));
      }}
    >
      <div className={buttonTextStyles}>NEXT</div>
      <ArrowIcon direction="right" />
    </Link>
  );
}

function PaginationButton({
  btn,
  isActive
}: {
  btn: number | null;
  isActive: boolean;
}) {
  return (
    <Link
      href={String(btn)}
      className={`bg-white h-fit
                    border ${
                      isActive ? "border-[#c7c9cf]" : "border-transparent"
                    } hover:border-[#888888] rounded-[3px] 
                    text-[#525252] hover:text-black [font-family:Roboto_Condensed,sans-serif] text-[14px] sm:text-[18px] ${
                      btn ? "tracking-[2px]" : "tracking-[-1px]"
                    } 
                    py-[6px] sm:py-[6px] px-[10px] sm:px-[12px] flex items-center justify-center
                    transition duration-200
                    ${!btn && "pointer-events-none"}`}
    >
      {btn ? btn : "..."}
    </Link>
  );
}

function PaginationButtons() {
  const currentBlogPage = useAppSelector(
    (state) => state.blogs.currentBlogPage
  );

  let buttonPages = getButtonPages();
  buttonPages = filterNulls(buttonPages);
  buttonPages = removeDublicates(buttonPages);

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

function getButtonPages() {
  const currentBlogPage = useAppSelector(
    (state) => state.blogs.currentBlogPage
  );
  const pagesCount = useAppSelector((state) => state.blogs.pagesCount);

  let result: (number | null)[] = [];
  result.push(1);
  for (let i = 1; i <= pagesCount; i++) {
    if (i === currentBlogPage) {
      result.push(i);
    } else if ([i - 1, i + 1].includes(currentBlogPage)) {
      result.push(i);
    } else result.push(null);
  }
  result.push(pagesCount);
  return result;
}

function filterNulls(array: (number | null)[]) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    let valueToPush = array[i];

    const nullInsideSequence = array[i] === null && array[i + 1] === null;
    const nullOutsideSequence = array[i] === null && array[i - 1] !== null;
    const lastNullInSequnce = array[i] === null && array[i + 1] !== null;

    if (nullInsideSequence || nullOutsideSequence) continue;

    if (lastNullInSequnce) {
      valueToPush = null;
    }
    result.push(valueToPush);
  }

  return result;
}

function removeDublicates(array: any[]) {
  return [...new Set(array)];
}
