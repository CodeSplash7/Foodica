"use client";

import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import { useSearchParams } from "next/navigation";

export default function Blogs() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const tag = searchParams.get("t");

  return (
    <div className={`flex flex-col gap-[32px]`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        {search && `SEARCH RESULTS FOR "${search}"`}
        {tag && `SEARCH RESULTS FOR TAG "${tag}"`}
        {!search && !tag && "ALL BLOGS"}
      </div>

      <div
        className={`flex flex-col md:flex-row 
                  gap-x-[16px] gap-y-[32px] mt-[32px] `}
      >
        <BlogList
          oneDivisionForAll={true}
          currentDivision={1}
          keyword={search ? search : undefined}
          tag={tag ? tag : undefined}
        />
        <Sidebar />
      </div>
    </div>
  );
}
