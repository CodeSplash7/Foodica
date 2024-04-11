"use client";

import BlogCard from "@/components/BlogCard";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Blog, setCurrentBlogPage, setPagesCount } from "@/store/blogsSlice";
import { useEffect } from "react";

type BlogListProps = {
  oneDivisionForAll: boolean;
  currentDivision: number;
  tag?: string;
  keyword?: string;
};

const blogPageSize = 4;
export default function BlogList({
  oneDivisionForAll,
  currentDivision,
  tag,
  keyword
}: BlogListProps) {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogs.blogs);
  let selectedBlogs: Blog[] = [];

  if (blogs.length > 0) {
    if (tag) {
      selectedBlogs = blogs.filter(
        (blog) => blog.mainTag.toLowerCase() === tag.toLowerCase()
      );
    }
    if (keyword) {
      selectedBlogs = (
        selectedBlogs.length > 0 ? selectedBlogs : tag ? [] : blogs
      ).filter((blog) => {
        const allValuesString = Object.values(blog).join(" ").toLowerCase();
        if (allValuesString.includes(keyword.toLowerCase())) return true;
      });
    }
    if (!tag && !keyword) {
      selectedBlogs = blogs;
    }
  }
  const pageBlogs = getNthDivision(
    selectedBlogs,
    currentDivision || 1,
    oneDivisionForAll ? 9999 : blogPageSize
  );

  useEffect(() => {
    dispatch(setCurrentBlogPage(currentDivision));
    dispatch(
      setPagesCount(
        getDivisions(selectedBlogs, oneDivisionForAll ? 9999 : blogPageSize)
          .length
      )
    );
  }, [blogs]);

  if (pageBlogs)
    return (
      <>
        <div className={`flex flex-[2] flex-col gap-[32px]`}>
          <div
            className={`flex-[2] grid h-fit gap-x-[3vw] ${
              !oneDivisionForAll && "gap-y-[72px] grid-cols-1 sm:grid-cols-2 "
            } ${
              oneDivisionForAll && "gap-y-[24px] sm:grid-cols-3 grid-cols-2"
            }`}
          >
            {pageBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isSmall={oneDivisionForAll}
              ></BlogCard>
            ))}
          </div>
          {!oneDivisionForAll && <Pagination />}
        </div>
      </>
    );
}

function getNthDivision<T extends any[]>(
  array: T,
  nthDivision: number,
  divisionSize: number
) {
  const dividedArray = getDivisions(array, divisionSize);
  if (nthDivision > 0 && nthDivision <= dividedArray.length) {
    return dividedArray[nthDivision - 1] as T;
  } else {
    return null;
  }
}

export function getDivisions(array: any[], divisionSize: number) {
  let dividedArray = [];
  for (let i = 0; i < array.length; i += divisionSize) {
    dividedArray.push(array.slice(i, i + divisionSize));
  }
  return dividedArray;
}
