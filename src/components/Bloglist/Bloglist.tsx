import { type Blog } from "@/utils/allSides/blogsFunctions";

import {
  filterSelectedBlogs,
  getNthDivision
} from "@/utils/allSides/blogsFunctions";

import BlogCard from "@/components/BlogCard";
import Pagination from "./Pagination/Pagination";
import { type BlogPageSearchParams } from "@/app/blogs/page";
import LoadingAnimation from "../LoadingAnimation";

type BlogListProps = {
  searchParams: BlogPageSearchParams;
  blogs: Blog[] | "loading";
  year?: string;
  month?: string;
  day?: string;
  ids?: string[];
};

const blogPageSize = 4;
export default async function BlogList({
  searchParams,
  blogs,
  year,
  month,
  day,
  ids
}: BlogListProps) {
  if (blogs === "loading")
    return (
      <div className="flex-[2]">
        <LoadingAnimation text="Loading, please wait!" />
      </div>
    );
  const { search, tag, page, author } = searchParams;

  const currentPage = Number(page) || 1;
  const onePageForAll = !searchParams.page;
  let selectedBlogs: Blog[] = [];

  if (blogs.length > 0) {
    selectedBlogs = filterSelectedBlogs(
      blogs,
      tag,
      search,
      author,
      year,
      month,
      day,
      ids
    );
  }

  const pageBlogs = getNthDivision(
    selectedBlogs,
    currentPage || 1,
    onePageForAll ? 9999 : blogPageSize
  );

  if (!pageBlogs) return <div className="flex-[2]">No blogs were found!</div>;
  if (pageBlogs)
    return (
      <>
        <div className={`flex flex-[2] flex-col gap-[32px] w-full`}>
          <div
            className={`flex-[2] grid h-fit gap-x-[3vw] w-full ${
              !onePageForAll && "gap-y-[72px] grid-cols-1 sm:grid-cols-2 "
            } ${onePageForAll && "gap-y-[24px] grid-cols-2 sm:grid-cols-3 "}`}
          >
            {pageBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} isSmall={onePageForAll} />
            ))}
          </div>
          {!onePageForAll && (
            <Pagination currentBlogPage={currentPage} allBlogs={blogs} />
          )}
        </div>
      </>
    );
}
