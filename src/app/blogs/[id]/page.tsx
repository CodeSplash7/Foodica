import BlogList from "../../../components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import HighlightedBlog from "../../HighlightedBlog";
import http from "@/httpService";

export default async function BlogPage({ params }: { params: { id: string } }) {
  const res = await http.get("blogs/api/random");
  const highlightedBlog = res.data;
  return (
    <div className={`flex flex-col gap-[32px]`}>
      <HighlightedBlog blog={highlightedBlog} />
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        LATEST POSTS
      </div>
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] `}
      >
        <BlogList
          oneDivisionForAll={false}
          currentDivision={Number(params.id)}
        />
        <Sidebar />
      </div>
    </div>
  );
}
