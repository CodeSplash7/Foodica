import HighlightedBlog from "../../components/HighlightedBlog";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import MainBlogsSection from "@/components/MainBlogsSection";
import { getRandomBlog } from "@/utils/serverside/blogsFunctions";
import { Suspense } from "react";
import { getBlogs } from "@/utils/serverside/blogsFunctions";
import { Blog } from "@/utils/allSides/blogsFunctions";

export type BlogPageSearchParams = {
  search?: string;
  tag?: string;
  page?: string;
  author?: string;
};

export default async function Blogs({
  searchParams
}: {
  searchParams: BlogPageSearchParams;
}) {
  const randomBlog = await getRandomBlog();
  return (
    <div className={`flex flex-col gap-[32px]`}>
      <Suspense>
        <HighlightedBlog searchParams={searchParams} randomBlog={randomBlog} />
      </Suspense>
      <Suspense>
        <MessageAboveBlogs searchParams={searchParams} />
      </Suspense>
      <MainBlogsSection searchParams={searchParams} />
    </div>
  );
}
