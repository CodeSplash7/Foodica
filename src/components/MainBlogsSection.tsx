import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import { type BlogPageSearchParams } from "@/app/blogs/page";
import { type Blog } from "@/utils/allSides/blogsFunctions";
import { Suspense } from "react";
export default function MainBlogsSection({
  searchParams
}: {
  searchParams: BlogPageSearchParams;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row 
            gap-x-[16px] gap-y-[32px] mt-[32px] `}
    >
      <BlogList searchParams={searchParams} />
      <Sidebar />
    </div>
  );
}
