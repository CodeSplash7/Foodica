import HighlightedBlog from "../../components/HighlightedBlog";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import MainBlogsSection from "@/components/MainBlogsSection";
import { getRandomBlog } from "@/utils/serverside/blogsFunctions";
import { Suspense } from "react";

export default function Blogs() {
  const randomBlog = getRandomBlog();
  return (
    <div className={`flex flex-col gap-[32px]`}>
      <HighlightedBlog randomBlog={randomBlog} />
      <MessageAboveBlogs />
      <Suspense>
        <MainBlogsSection />
      </Suspense>
    </div>
  );
}
