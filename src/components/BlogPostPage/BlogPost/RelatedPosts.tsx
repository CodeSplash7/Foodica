import ClickableTitle from "@/components/ClickableTitle";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { formatCreationDate } from "@/utils/general-utils";
import { getRelatedBlogs } from "@/utils/serverside/blogsFunctions";
import { Roboto_Condensed } from "next/font/google";
import Image from "next/image";
const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default async function RelatedPosts({ blog }: { blog: Blog }) {
  const relatedPosts = await getRelatedBlogs(blog.id, blog.mainTag, 3);
  return (
    <div className={`flex flex-col gap-[16px]`}>
      <div
        className={`${roboto_condensed.className} text-[18px] font-bold uppercase`}
      >
        Related
      </div>
      <div className={`flex gap-[16px] w-full flex-wrap`}>
        {relatedPosts.map((p) => (
          <ClickableTitle
            blog={p}
            className={`flex-1 group flex flex-col gap-[8px] basis-[128px] opacity-90 hover:opacity-100`}
            key={p.id}
          >
            <div className="relative w-full h-[168px] [object-fit:cover]">
              <Image
                className={`w-full h-full [object-fit:cover]`}
                alt="blog image"
                src={p.picture?.url || ""}
                fill={true}
              />
            </div>
            <div
              className={`text-blue-600 group-hover:underline hover:text-cyan-600 text-[.9rem]`}
            >
              {p.title}
            </div>
            <div className={`text-gray-500 text-[.9rem]`}>
              {formatCreationDate(p.creationDate)}
              <div>In "{p.mainTag}"</div>
            </div>
          </ClickableTitle>
        ))}
      </div>
    </div>
  );
}
