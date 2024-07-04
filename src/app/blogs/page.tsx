import HighlightedBlog from "../../components/HighlightedBlog";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import MainBlogsSection from "@/components/MainBlogsSection";
import { getRandomBlog } from "@/utils/serverside/blogsFunctions";
import { Suspense } from "react";

export default async function Blogs() {
  const randomBlog = await getRandomBlog();
  return (
    <div className={`flex flex-col gap-[32px]`}>
      <Suspense>
        <HighlightedBlog randomBlog={randomBlog} />
      </Suspense>
      <Suspense>
        <MessageAboveBlogs />
      </Suspense>
      <Suspense>
        <MainBlogsSection />
      </Suspense>
    </div>
  );
}
