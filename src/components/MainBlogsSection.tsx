import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import { type BlogPageSearchParams } from "@/page-components/blogs-page";
import { Blog } from "@/types/blog-types";
export default function MainBlogsSection({
  searchParams,
  blogs
}: {
  searchParams: BlogPageSearchParams;
  blogs: Blog[] | "loading";
}) {
  return (
    <div
      className={`flex flex-col md:flex-row items-start
            gap-x-[16px] gap-y-[32px] mt-[32px] `}
    >
      <BlogList blogs={blogs} searchParams={searchParams} />
      <Sidebar />
    </div>
  );
}
