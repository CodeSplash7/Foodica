import { useAppDispatch, useAppSelector } from "@/store/store";
import Link from "next/link";

export default function UpperFooter() {
  const tags = useAppSelector((state) => state.tags.tags);
  return (
    <div className={`h-fit flex flex-col`}>
      <div className={`flex flex-col gap-y-[16px]`}>
        <div
          className={`text-[rgb(54,57,64)] text-[20px] font-bold [letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif]`}
        >
          CATEGORIES
        </div>
        <div className={`flex flex-wrap gap-x-[16px] gap-y-[8px]`}>
          {tags.map((tag) => (
            <Category key={tag} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Category({ name }: { name: string }) {
  // the number of blogs with the corresponding tag/name
  const count = useAppSelector(
    (state) => state.blogs.blogs.filter((blog) => blog.mainTag === name).length
  );
  return (
    <Link
      href={`/blogs?t=${name.toLocaleLowerCase()}`}
      className={`bg-white border border-[#c7c7c7] rounded-sm
                    gap-[8px] flex overflow-hidden 
                    group`}
    >
      <span
        className={`transition duration-150 group-hover:text-[#777] 
                  text-[#444] text-[14px] [font-family:'Roboto_Condensed',sans-serif]
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
