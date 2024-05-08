"use client";
//! --- blogs/[] ----

// * ---<| IMPORT |>-----------------------------------------------------------------------
//
// local modules
import BlogList from "@/components/Bloglist/Bloglist";
// import Sidebar from "@/components/Sidebar";
// redux
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setBlogActive } from "@/store/blogsSlice";
// nextjs
import { redirect } from "next/navigation";
// types
import { Blog } from "@/store/blogsSlice";
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
export default function BlogPage({ params }: { params: { year: string } }) {
  //
  //
  // ? ---<< component code >>-------------------
  checkForBlogName({
    possibleName: params.year,
    appDispatch: useAppDispatch,
    appSelector: useAppSelector
  });
  // ? --->> component code <<--------------------------------------
  //
  //
  // ? ---<< return statement >>-----------------------------------------------------------
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        POSTS OF <span className="underline">{params.year}</span>
      </div>
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList
          oneDivisionForAll={true}
          currentDivision={1}
          year={params.year}
        />
        <Sidebar />
      </div>
    </div>
  );
  // ? --->>return statement<<--------------------------------------------------------------------
}
//
// * ---|> page component <<<BLOG PAGE>>> <|----------------------------------------------------
//
//
//
//
//
// * ---<| helper functions |>---------------------------------
//
//
// ? --->> 1 <<----
export function redirectToCorrectBlog(blogSelected: Blog) {
  const blogDate = new Date(blogSelected.creationDate);
  redirect(
    `/blogs/${blogDate.getFullYear()}/${
      blogDate.getMonth() + 1
    }/${blogDate.getDate()}/${blogSelected.title
      .toLowerCase()
      .split(" ")
      .join("-")}`
  );
}
// ? ---<< 1 >>----
//
//
// ? --->> 2 <<----
export function checkForBlogName({
  possibleName,
  appDispatch,
  appSelector
}: {
  possibleName: string;
  appSelector: typeof useAppSelector;
  appDispatch: typeof useAppDispatch;
}) {
  const dispatch = appDispatch();
  const blogSelected = appSelector((state) => state.blogs.blogs).find(
    (blog) => blog.title.toLowerCase().split(" ").join("-") === possibleName
  );
  if (blogSelected) {
    dispatch(setBlogActive(blogSelected.id));
    redirectToCorrectBlog(blogSelected);
  }
}
// ? ---<< 2 >>----
//
//
// * ----|> helper functions <|-----------------------------
