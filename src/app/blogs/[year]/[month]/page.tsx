import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import { checkForBlogName, getBlogs } from "@/utils/serverside/blogsFunctions";

export default function BlogPage({
  params
}: {
  params: { year: string; month: string };
}) {
  checkForBlogName({
    possibleName: params.month
  })

  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        POSTS OF{" "}
        <span className="underline">
          {params.year}{" "}
          {new Date(params.month).toLocaleString("en", { month: "long" })}
        </span>
      </div>
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList blogs={getBlogs()} year={params.year} month={params.month} />
        <Sidebar />
      </div>
    </div>
  );
}
