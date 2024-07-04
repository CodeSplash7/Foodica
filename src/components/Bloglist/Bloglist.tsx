"use client";

import dynamic from "next/dynamic";
import { type Blog } from "@/utils/allSides/blogsFunctions";

import { useSearchParams } from "next/navigation";
import {
  filterSelectedBlogs,
  getNthDivision
} from "@/utils/allSides/blogsFunctions";

const BlogCard = dynamic(() => import("@/components/BlogCard"));
const Pagination = dynamic(() => import("./Pagination/Pagination"));

type BlogListProps = {
  blogs: Blog[];
  year?: string;
  month?: string;
  day?: string;
  ids?: number[];
};

const blogPageSize = 4;
export default function BlogList({
  blogs,
  year,
  month,
  day,
  ids
}: BlogListProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const tag = searchParams.get("t");
  const page = searchParams.get("p");

  const currentDivision = Number(page) || 1;
  const oneDivisionForAll = page === null ? true : false;

  let selectedBlogs: Blog[] = [];

  if (blogs.length > 0) {
    selectedBlogs = filterSelectedBlogs(blogs, tag, search, year, month, day, ids);
  }

  const pageBlogs = getNthDivision(
    selectedBlogs,
    currentDivision || 1,
    oneDivisionForAll ? 9999 : blogPageSize
  );

  if (pageBlogs)
    return (
      <>
        <div className={`flex flex-[2] flex-col gap-[32px] w-full`}>
          <div
            className={`flex-[2] grid h-fit gap-x-[3vw] w-full ${
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
          {!oneDivisionForAll && (
            <Pagination currentBlogPage={currentDivision} allBlogs={blogs} />
          )}
        </div>
      </>
    );
}
