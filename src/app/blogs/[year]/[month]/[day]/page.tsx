import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import {
  checkForBlogName,
  getBlogs,
  redirectToCorrectBlog
} from "@/utils/serverside/blogsFunctions";

export default async function BlogPage({
  params
}: {
  params: { year: string; month: string; day: string };
}) {
  const isBlogTitle = await checkForBlogName(params.day);
  if (isBlogTitle) return redirectToCorrectBlog(isBlogTitle);
  const blogs = await getBlogs();
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        POSTS OF{" "}
        <span className="underline">
          {params.year}{" "}
          {new Date(params.month).toLocaleString("en", { month: "long" })}{" "}
          {params.day}
        </span>
      </div>
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
