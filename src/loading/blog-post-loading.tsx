import BlogPost from "@/components/BlogPostPage/BlogPost/BlogPost";
import Sidebar from "@/components/Sidebar";

export default function BlogsPostLoading() {
  return (
    <div
      className={`flex flex-col md:flex-row justify-center
        gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
    >
      <BlogPost blog={"loading"} />
      <Sidebar />
    </div>
  );
}
