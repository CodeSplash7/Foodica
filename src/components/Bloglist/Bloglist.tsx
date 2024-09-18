import { BlogListFilters, type Blog } from "@/types/blog-types";

import BlogCard from "@/components/BlogCard";
import Pagination from "./Pagination/Pagination";
import LoadingAnimation from "../LoadingAnimation";
import { BlogPageSearchParams } from "@/page-components/blogs-page";
import useFilteredBlogs from "./hooks/useFilteredBlogs";
import useRenderedBlogs from "./hooks/useRenderedBlogs";

type BlogListProps = {
  searchParams: BlogPageSearchParams;
  blogs: Blog[] | "loading";
  year?: string;
  month?: string;
  day?: string;
  ids?: string[];
};

export default async function BlogList({
  searchParams = {},
  blogs,
  year,
  month,
  day,
  ids
}: BlogListProps) {
  const { search, tag, page, author } = searchParams;
  const listFilters: BlogListFilters = [
    tag,
    search,
    author,
    year,
    month,
    day,
    ids
  ];
  const filteredBlogs = useFilteredBlogs(blogs, listFilters);

  const { renderedBlogs, onePageForAll, currentPage } = useRenderedBlogs(
    page,
    filteredBlogs
  );
  if (blogs === "loading")
    return (
      <div className="flex-[2]">
        <LoadingAnimation text="Loading, please wait!" />
      </div>
    );

  if (!renderedBlogs)
    return <div className="flex-[2]">No blogs were found!</div>;
  if (renderedBlogs)
    return (
      <>
        <div className={`flex flex-[2] flex-col gap-[32px] w-full`}>
          <div
            className={`flex-[2] grid h-fit gap-x-[3vw] w-full ${
              !onePageForAll && "gap-y-[72px] grid-cols-1 sm:grid-cols-2 "
            } ${onePageForAll && "gap-y-[24px] grid-cols-2 sm:grid-cols-3 "}`}
          >
            {renderedBlogs.map((blog) => (
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
