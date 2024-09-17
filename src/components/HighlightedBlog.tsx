import { type Blog } from "@/types/blog-types";
import { type BlogPageSearchParams } from "@/page-components/blogs-page";
import ClickableTag from "@/components/ClickableTag";
import ClickableTitle from "@/components/ClickableTitle";
import { formatCreationDate } from "@/general-utils/formatCreationDate";
import { HighlightedBlogImage } from "./HighlightedBlogImage";
import CommentsLink from "./CommentsLink";
import { Skeleton } from "@mui/material";

export default function HighlightedBlog({
  randomBlog,
  searchParams
}: {
  searchParams: BlogPageSearchParams;
  randomBlog: Blog | "loading";
}) {
  if (randomBlog === "loading")
    return (
      <Skeleton variant="rounded" sx={{ height: "400px", marginTop: "64px" }} />
    );
  if (randomBlog && searchParams.page)
    return (
      <div className={`relative w-full h-fit flex justify-end mt-[64px]`}>
        <OverlayImage />
        <HighlightedBlogImage
          src={
            randomBlog.picture?.url || randomBlog.picture?.thumbnailUrl || ""
          }
        />
        <BlogIntroduction blog={randomBlog} />
      </div>
    );
}
function BlogIntroduction({ blog }: { blog: Blog }) {
  return (
    <div className="py-[96px] px-[24px] h-fit z-20 relative w-full md:w-1/2 flex flex-col items-center justify-center gap-[24px]">
      <ClickableTag blog={blog} addStyles="text-white md:text-[#363940]" />
      <div className={`border-t border-[#00000024] w-[48px]`}></div>
      <ClickableTitle
        blog={blog}
        type="text"
        addStyles={`text-white text-[26px] md:text-[#363940] after:bg-[#3cefff]`}
      />
      <AdditionalInfo blog={blog} />
      <ClickableTitle
        blog={blog}
        label={"READ MORE"}
        type="button"
        addStyles={`md:hidden`}
        contrast={true}
      />
      <ClickableTitle
        blog={blog}
        label={"READ MORE"}
        type="button"
        addStyles={`hidden md:block`}
        contrast={false}
      />
    </div>
  );
}

function OverlayImage() {
  return (
    <div className="z-10 absolute w-full h-full bg-black opacity-[.3] md:opacity-[1] md:bg-transparent md:[backgroundImage:linear-gradient(to_right,_transparent_20%,_#eff4f7_60%)]"></div>
  );
}
function AdditionalInfo({ blog }: { blog: Blog }) {
  return (
    <div className="text-white md:text-[#9297a4] flex gap-[16px] items-center">
      <div>{formatCreationDate(blog.creationDate)}</div>
      <div className="border-2 border-[#d2d7d9] w-[2px] h-[2px] rounded-full"></div>
      <CommentsLink addStyles="text-white md:text-[#9297a4]" blog={blog}>
        {blog.comments.length} comments
      </CommentsLink>
    </div>
  );
}
