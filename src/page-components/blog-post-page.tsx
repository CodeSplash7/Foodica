import Sidebar from "@/components/Sidebar";
import BlogPost from "@/components/BlogPostPage/BlogPost/BlogPost";
import { getBlogByUrlName } from "@/server-utils/blogsFunctions";
import { delay } from "@/general-utils/delay";
import { urlNameToUsername } from '@/general-utils/usersFunctions';

type BlogPostPageProps = {
  params: { year: string; month: string; day: string; blogName: string };
};
async function BlogPostPage({ params }: BlogPostPageProps) {
  await delay(5000)
  const blog = await getBlogByUrlName(params.blogName);
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
