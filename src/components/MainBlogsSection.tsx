import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import { type BlogPageSearchParams } from "@/app/blogs/page";
import LoadingAnimation from "./LoadingAnimation";
import { Blog } from "@/utils/allSides/blogsFunctions";
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
