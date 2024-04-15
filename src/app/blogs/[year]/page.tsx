import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";

export default async function BlogPage({
  params
}: {
  params: { year: string };
}) {
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
        <BlogList
          oneDivisionForAll={true}
          currentDivision={1}
          year={params.year}
        />
        <Sidebar />
      </div>
    </div>
  );
}
