import BlogList from "@/components/Bloglist/Bloglist";
import { checkForBlogName, getBlogs } from "@/utils/serverside/blogsFunctions";
import Sidebar from "@/components/Sidebar";

export default function BlogPage({ params }: { params: { year: string } }) {
  checkForBlogName({
    possibleName: params.year
  });
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        POSTS OF <span className="underline">{params.year}</span>
      </div>
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList blogs={getBlogs()} year={params.year} />
        <Sidebar />
      </div>
    </div>
  );
}
