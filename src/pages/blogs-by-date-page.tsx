import BlogList from "@/components/Bloglist/Bloglist";
import PostsDateDisplay from "@/components/PostsDateDisplay";
import Sidebar from "@/components/Sidebar";
import {
  checkForBlogName,
  getBlogs,
  redirectToCorrectBlog
} from "@/server-utils/blogsFunctions";

export default async function BlogsByDatePage({
  params
}: {
  params: { year: string; month: string; day: string };
}) {
  const isBlogTitle = await checkForBlogName(params.day);
  if (isBlogTitle) return redirectToCorrectBlog(isBlogTitle);
  const blogs = await getBlogs();
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <PostsDateDisplay {...params} />
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList
          blogs={blogs}
          searchParams={{}}
          year={params.year}
          month={params.month}
          day={params.day}
        />
        <Sidebar />
      </div>
      
    </div>
  );
}
