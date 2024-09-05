import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { BlogTag } from "@/types/blog-types";
import { getBlogs } from "@/server-utils/blogsFunctions";
import { blogsLinkByTag } from "@/general-utils/app-routes";
const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default async function Category({ name }: { name: BlogTag }) {
  const blogs = await getBlogs();
  const count = blogs.filter((blog) => blog.mainTag === name).length;
  return (
    <Link
      href={blogsLinkByTag(name)}
      className={`bg-white border border-[#c7c7c7] rounded-sm
                    gap-[8px] flex justify-between
                    group`}
    >
      <span
        className={`transition duration-150 group-hover:text-[#777] 
                  text-[#444] text-[14px] ${roboto_condensed.className}
                  flex items-center justify-center 
                  py-[8px] pl-[8px] break-all`}
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
