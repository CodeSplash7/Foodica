import HighlightedBlog from "@/components/HighlightedBlog";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import MainBlogsSection from "@/components/MainBlogsSection";

export type BlogPageSearchParams = {
  search?: string;
  tag?: string;
  page?: string;
  author?: string;
};

export default async function BlogsLoading({
  searchParams
}: {
  searchParams: BlogPageSearchParams;
}) {
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <HighlightedBlog searchParams={searchParams} randomBlog={"loading"} />
      <MessageAboveBlogs searchParams={searchParams} state={"loading"} />
      <MainBlogsSection searchParams={searchParams} blogs={"loading"} />
    </div>
  );
}
