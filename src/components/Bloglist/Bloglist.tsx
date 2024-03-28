"use client";

import BlogCard from "@/components/BlogCard";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Blog, setCurrentBlogPage, setPagesCount } from "@/store/blogsSlice";
import { useEffect } from "react";

type BlogListProps = {
  currentDivision: number;
  tag?: string;
  keywords?: string;
};

const blogPageSize = 4;
export default function BlogList({
  currentDivision,
  tag,
  keywords
}: BlogListProps) {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogs.blogs);

  let selectedBlogs: Blog[];
  if (tag) {
    selectedBlogs = blogs.filter((blog) => blog.tag === tag);
  }
  if (keywords) {
    selectedBlogs = blogs.filter(() => {});
  }
  if (!tag && !keywords) {
    selectedBlogs = blogs;
  }
  const pageBlogs = getNthDivision(blogs, currentDivision || 1);

  useEffect(() => {
    dispatch(setCurrentBlogPage(currentDivision));
    dispatch(setPagesCount(getDivisions(blogs).length));
  }, [blogs]);

  if (pageBlogs)
    return (
      <>
        <div className={`flex flex-[2] flex-col gap-[32px]`}>
          <div
            className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
          >
            LATEST POSTS
          </div>
          <div
            className={`flex-[2] gap-y-[72px] gap-x-[3vw] h-fit grid grid-cols-1 sm:grid-cols-2`}
          >
            {pageBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog}></BlogCard>
            ))}
          </div>
          <Pagination />
        </div>
      </>
    );
}

function getNthDivision<T extends any[]>(array: T, nthDivision: number) {
  const dividedArray = getDivisions(array);
  if (nthDivision > 0 && nthDivision <= dividedArray.length) {
    return dividedArray[nthDivision - 1] as T;
  } else {
    return null;
  }
}

export function getDivisions(array: any[]) {
  let dividedArray = [];
  for (let i = 0; i < array.length; i += blogPageSize) {
    dividedArray.push(array.slice(i, i + blogPageSize));
  }
  return dividedArray;
}
