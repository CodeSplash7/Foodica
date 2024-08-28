import { getBlogByUrlName } from "@/utils/serverside/blogsFunctions";
import BlogPost from "./BlogPost/BlogPost";
import Sidebar from "../Sidebar";

type BlogPostPageProps = {
  params: { year: string; month: string; day: string; blogName: string };
};
async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = await getBlogByUrlName(params.blogName);
  await delay()
  if (blog)
    return (
      <div
        className={`flex flex-col md:flex-row justify-center
        gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogPost blog={blog} />
        <Sidebar />
      </div>
    );
}

export default BlogPostPage;
const delay = () => new Promise((resolve) => setTimeout(resolve, 5000));
