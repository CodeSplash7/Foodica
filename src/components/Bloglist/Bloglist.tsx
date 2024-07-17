import { type Blog } from "@/utils/allSides/blogsFunctions";

import {
  filterSelectedBlogs,
  getNthDivision
} from "@/utils/allSides/blogsFunctions";

import BlogCard from "@/components/BlogCard"; // const BlogCard = dynamic(() => import("@/components/BlogCard"));
import Pagination from "./Pagination/Pagination"; // const Pagination = dynamic(() => import("./Pagination/Pagination"));
import { type BlogPageSearchParams } from "@/app/blogs/page";
import { getBlogs } from "@/utils/serverside/blogsFunctions";

type BlogListProps = {
  searchParams: BlogPageSearchParams;
  year?: string;
  month?: string;
  day?: string;
  ids?: string[];
};

const blogPageSize = 4;
export default async function BlogList({
  searchParams,
  year,
  month,
  day,
  ids
}: BlogListProps) {
  const blogs = await getBlogs();
  const { search, tag, page, author } = searchParams;

  const currentDivision = Number(page) || 1;
  const oneDivisionForAll = !searchParams.page;
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
