"use client";
//! --- blogs/[]/[]/[] ----

// * ---<| IMPORT |>-----------------------------------------------------------------------
//
//
// custom modules
import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
// hleper functions
import { checkForBlogName } from "../../page";
// redux
import { useAppDispatch, useAppSelector } from "@/store/store";
//
//
// * ---|> IMPORT <| -----------------------------------------------------------------------------------------------------
//
//
//
//
//
// * ---<| page component <<<BLOG PAGE>>> |>-----------------------------------------------------
//
//
export default function BlogPage({
  params
}: {
  params: { year: string; month: string; day: string };
}) {
  //
  //
  // ? ---<< component code >>----------------------------------
  //
  checkForBlogName({
    possibleName: params.day,
    appDispatch: useAppDispatch,
    appSelector: useAppSelector
  });
  //
  // ? --->> component code <<--------------------------------------
  //
  //
  // ? ---<< return statement >>-----------------------------------------------------------
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        POSTS OF{" "}
        <span className="underline">
          {params.year}{" "}
          {new Date(params.month).toLocaleString("en", { month: "long" })}{" "}
          {params.day}
        </span>
      </div>
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList
          oneDivisionForAll={true}
          currentDivision={1}
          year={params.year}
          month={params.month}
          day={params.day}
        />
        <Sidebar />
      </div>
    </div>
  );
}
// ? --->> return statement <<--------------------------------------------------------------------
