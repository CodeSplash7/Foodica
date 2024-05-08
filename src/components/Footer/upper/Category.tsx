import { getBlogs } from "@/utils/serverside/blogsFunctions";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function Category({ name }: { name: string }) {
  const blogs = getBlogs();
  // the number of blogs with the corresponding tag/name
  const count = blogs.filter((blog) => blog.mainTag === name).length;
  return (
    <Link
      href={`/blogs?t=${name.toLowerCase()}`}
      className={`bg-white border border-[#c7c7c7] rounded-sm
                    gap-[8px] flex overflow-hidden 
                    group`}
    >
      <span
        className={`transition duration-150 group-hover:text-[#777] 
                  text-[#444] text-[14px] ${roboto_condensed.className}
                  flex items-center justify-center 
                  p-[8px] `}
      >
        {name.toUpperCase()}
      </span>
      <span
        className={`transition duration-150 group-hover:text-white group-hover:bg-slate-300 
                text-[#838383] font-bold text-[11px] [font-family:'Roboto_Condensed',sans-serif]
                bg-[#f2f5f7] p-[8px] 
                flex items-center justify-center`}
      >
        {count}
      </span>
    </Link>
  );
}
