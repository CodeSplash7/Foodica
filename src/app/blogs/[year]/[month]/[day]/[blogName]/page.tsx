"use client";
import Sidebar from "@/components/Sidebar";
//! --- blogs/[]/[]/[]/[] ----

// * ---<| Imports |>-----------------------------------------------------------------------
// redux
import { setBlogActive } from "@/store/blogsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
// helper components
import BlogPost from "@/components/BlogPost";
// react hooks
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
// * ---<|/ Imports |>-----------------------------------------------------------------------------------------------------
//
//
//
//
//
const ClientOnlyComponent = dynamic(() => import("@/components/BlogPost"), {
  ssr: false // This line disables server-side rendering
});
// * ---<| MAIN component BLOG POST |>-----------------------------------------------------
// Types
type BlogPostPageProps = {
  params: { year: string; month: string; day: string; blogName: string };
};
//
//
function BlogPostPage({ params }: BlogPostPageProps) {
  // ? ---< component code >--------------------------------------
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogs.blogs);

  useEffect(() => {
    const blog = blogs.find(
      (blog) =>
        blog.title.toLowerCase().split(" ").join("-") === params.blogName
    );
    if (blog) {
      dispatch(setBlogActive(blog.id));
    }
  }, [dispatch, blogs, params.blogName]);
  // ? ---</ component code >--------------------------------------
  //
  //
  // ? ---< return statement >--------------------------------------------------------------------
  return (
    <div
      className={`flex flex-col md:flex-row 
                    gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
    >
      {/* <BlogPost /> */}
      {/* <Suspense fallback={<div>HHHHHHHHHHHHH</div>}>
        <ClientOnlyComponent />
      </Suspense> */}
      {/* <Sidebar /> */}
    </div>
  );
  // ? ---</ return statement >--------------------------------------------------------------------
}

export default BlogPostPage;
//
// * ---<|/ MAIN component BLOG POST |>----------------------------------------------------
//
//
//
//
//
// * ---<| SECONDARY components |>---------------------------------

// * ---<|/ SECONDARY components |>---------------------------------
//
//
//
//
//
// * ---<| helper functions |>----------------------------------------------------
// * ---|> helper functions <|----------------------------------------------------
