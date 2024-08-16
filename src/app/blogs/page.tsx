import HighlightedBlog from "../../components/HighlightedBlog";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import MainBlogsSection from "@/components/MainBlogsSection";
import { getBlogs, getRandomBlog } from "@/utils/serverside/blogsFunctions";

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
  const blogs = await getBlogs();

  return (
    <div className={`flex flex-col gap-[32px]`}>
      <HighlightedBlog searchParams={searchParams} randomBlog={randomBlog} />
      <MessageAboveBlogs searchParams={searchParams} />
      <MainBlogsSection blogs={blogs} searchParams={searchParams} />
    </div>
  );
}
