"use client";
import { useSearchParams } from "next/navigation";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default function MessageAboveBlogs() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const tag = searchParams.get("t");
  const page = searchParams.get("p");
  return (
    <div
      className={`[letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
    >
      {page && !search && !tag && "LATEST POSTS"}
      {search && `SEARCH RESULTS FOR "${search}"`}
      {tag && `SEARCH RESULTS FOR TAG "${tag}"`}
      {!search && !tag && !page && "ALL BLOGS"}
    </div>
  );
}
