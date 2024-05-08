"use client";

//* ---<| IMPORT |>-------------------------------------------------------------------
// Hooks
import { useSearchParams } from "next/navigation";
// Types
import { type Blog } from "@/utils/allSides/blogsFunctions";
// Helper components
import ClickableTag from "@/components/ClickableTag";
import ClickableTitle from "./ClickableTitle";
import { formatCreationDate } from "@/utils/general-utils";
import { Suspense } from "react";
import { HighlightedBlogImage } from "./HighlightedBlogImage";

import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

//* ---<|/ IMPORT |>-------------------------------------------------------------------
//
//
//
//
//
//* ---<| MAIN |>----------------------------------------------------------
export default function HighlightedBlog({ randomBlog }: { randomBlog: Blog }) {
  //? ---< component code >------------------------
  const searchParams = useSearchParams();
  const page = searchParams.get("p");
  //? ---</ component code >-----------------------
  //
  //? ---< return statement >--------------------
  if (randomBlog && page)
    return (
      <>
        <div className={`relative w-full h-fit flex justify-end mt-[64px]`}>
          <OverlayImage />
          <Suspense fallback={<h1 className="self-center">Loading...</h1>}>
            <HighlightedBlogImage src={randomBlog.image.src} />
          </Suspense>
          <BlogIntroduction blog={randomBlog} />
        </div>
      </>
    );
  //? ---</ return statement >--------------------
}
//* ---<|/ MAIN |>----------------------------------------------------------
//
//
//
//
//
//* ---<| SECONDARY COMPONENTS |>-------------------------------------
//
//? ---< 1 - BlogIntroduction >---------------------------------
function BlogIntroduction({ blog }: { blog: Blog }) {
  //? ------< return statement >-----------------
  return (
    <div className="py-[96px] px-[24px] h-fit z-20 relative w-full md:w-1/2 flex flex-col items-center justify-center gap-[24px]">
      <ClickableTag
        blog={blog}
        className={`text-white md:text-[#9297A4] hover:text-[#aeb4be] 
                    text-[16px] [font-family:'Roboto_Condensed',sans-serif]
                    transition duration-150`}
      />
      <div className={`border-t border-[#00000024] w-[48px]`}></div>
      <ClickableTitle
        blog={blog}
        className={`text-center text-white text-[26px] 
                  md:text-[#363940] md:hover:text-[#8b909c] md:text-[36px]
                  hover:text-[#e3e3e3] 
                    transition duration-150 
                    font-bold md:font-normal`}
      />
      <AdditionalInfo
        comments={blog.comments}
        creationDate={blog.creationDate}
      />
      <ClickableTitle
        blog={blog}
        label={"READ MORE"}
        className={`tracking-[2px] ${roboto_condensed.className} text-[14px] font-bold
                  text-[#363940] md:text-white hover:text-white 
                  bg-white 
                  md:bg-[#363940] hover:bg-[#363940] md:hover:bg-[#818592] 
                  transition duration-150 
                  px-[32px] py-[12px] rounded-sm`}
      />
    </div>
  );
  //? ------</ return statement >-----------------
}
//? ---</ 1 - BlogIntroduction >---------------------------------
//
//
//? ---< 2 - BackgroundImage >-----------------------------------

//? ---</ 2 - BackgroundImage >-----------------------------------
//
//
//? ---< 3 - OverlayImage >-----------------------------------
function OverlayImage() {
  //? ------< return statement >----------------
  return (
    <div className="z-10 absolute w-full h-full bg-black opacity-[.3] md:opacity-[1] md:bg-transparent md:[backgroundImage:linear-gradient(to_right,_transparent_20%,_#eff4f7_60%)]"></div>
  );
  //? ------</ return statement >----------------
}
//? ---</ 3 - OverlayImage >-----------------------------------
//
//
//? ---< 4 - AdditionalInfo >----------------------------------
function AdditionalInfo({
  creationDate,
  comments
}: {
  creationDate: string;
  comments: any[];
}) {
  return (
    <div className="text-white md:text-[#9297a4] flex gap-[16px] items-center">
      <div>{formatCreationDate(creationDate)}</div>
      <div className="border-2 border-[#d2d7d9] w-[2px] h-[2px] rounded-full"></div>
      <div>{comments.length} comments</div>
    </div>
  );
}
//? ---</ 4 - AdditionalInfo >----------------------------------
//
//
//* ---<|/ SECONDARY COMPONENTS |>-------------------------------------
//
//
//
//
//
//* ---<| Helper functions |>-------------------------------------

//* ---<|/ Helper functions |>-------------------------------------
