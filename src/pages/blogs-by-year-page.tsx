import BlogList from "@/components/Bloglist/Bloglist";
import {
  checkForBlogName,
  getBlogs,
  redirectToCorrectBlog
} from "@/server-utils/blogsFunctions";
import Sidebar from "@/components/Sidebar";
import PostsDateDisplay from "@/components/PostsDateDisplay";

export default async function BlogByYearPage({
  params
}: {
  params: { year: string };
}) {
  const isBlogTitle = await checkForBlogName(params.year);
  if (isBlogTitle) return redirectToCorrectBlog(isBlogTitle);
  const blogs = await getBlogs();

  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <PostsDateDisplay {...params} />
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList blogs={blogs} searchParams={{}} year={params.year} />
        <Sidebar />
      </div>
    </div>
  );
}
