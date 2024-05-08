import Image from "next/image";

import { type StaticImageData } from "next/image";
import { type Blog, type BlogComment } from "@/utils/allSides/blogsFunctions";

import ClickableTag from "./ClickableTag";
import ClickableTitle from "./ClickableTitle";
import { formatCreationDate, shortenText } from "@/utils/general-utils";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: ["700", "400"],
  subsets: ["latin"]
});

type BlogCardProps = {
  blog: Blog;
  isSmall: boolean;
};

export default function BlogCard({ blog, isSmall }: BlogCardProps) {
  const { image, creationDate, author, comments, description } = blog;
  return (
    <div
      className={`h-fit w-full flex flex-col items-start gap-[16px] ${
        isSmall && "gap-[8px]"
      }`}
    >
      <BlogCardImage image={image} isSmall={isSmall} />
      <BlogCardTag blog={blog} isSmall={isSmall} />
      <BlogCardTitle blog={blog} isSmall={isSmall} />
      {!isSmall && <BlogCardInfo info={{ creationDate, author, comments }} />}
      {!isSmall && <BlogCardDesc desc={description} />}
      {!isSmall && <BlogCardButton blog={blog} />}
    </div>
  );
}

function BlogCardImage({
  image,
  isSmall
}: {
  image: StaticImageData;
  isSmall: boolean;
}) {
  return (
    <Image
      className={`[object-fit:cover] w-full    ${
        isSmall
          ? "h-[32vw] sm:h-[32vw] md:h-[32vw]"
          : "h-[540px] sm:h-[64vw] md:h-[42vw]"
      }
              `}
      alt="blog image"
      src={"/images/" + image.src}
      width={image.width}
      height={image.height}
    />
  );
}
function BlogCardTag({ blog, isSmall }: { blog: Blog; isSmall: boolean }) {
  return (
    <ClickableTag
      blog={blog}
      className={`w-full flex justify-${isSmall ? "start" : "center"} mt-[24px] 
                  uppercase tracking-[1.2px] text-[#acacac] hover:text-[#838a9a] text-[16px] ${
                    roboto_condensed.className
                  }
                  transition duration-150 
                ${isSmall && "mt-[8px] text-[14px] tracking-[0.8px]"}`}
    />
  );
}

function BlogCardTitle({ blog, isSmall }: { blog: Blog; isSmall: boolean }) {
  return (
    <ClickableTitle
      className={`text-[rgb(54,57,64)] hover:text-[#818592] w-full ${
        !isSmall && "text-[20px]"
      } ${isSmall && "text-[16px] md:text-[20px]"} font-bold 
      transition duration-150 `}
      blog={blog}
    />
  );
}

function BlogCardInfo({
  info
}: {
  info: { creationDate: string; author: string; comments: BlogComment[] };
}) {
  const { creationDate, author, comments } = info;
  return (
    <div
      className={`flex flex-wrap gap-[8px] items-center w-full
        text-[12px] sm:text-[16px]`}
    >
      <div className="text-[#999999]">{formatCreationDate(creationDate)}</div>
      <div className="border-2 border-[#d2d7d9] rounded-full w-[2px] h-[2px"></div>
      <div className="text-[#363940] hover:text-[#818592]">
        <span className="text-[#818592]">by</span> {author}
      </div>
      <div className="border-2 border-[#d2d7d9] rounded-full w-[2px] h-[2px]"></div>
      <div className="text-[#363940] hover:text-[#818592]">
        {comments.length} comments
      </div>
    </div>
  );
}

function BlogCardDesc({ desc }: { desc: string }) {
  return (
    <div
      className={`w-full text-[16px] text-[#4c4c4c] [line-height:28.8px] [text-spacing:.7px]`}
    >
      {shortenText(desc, 56)}
    </div>
  );
}

function BlogCardButton({ blog }: { blog: Blog }) {
  return (
    <ClickableTitle
      blog={blog}
      label={"READ MORE"}
      className={`[letter-spacing:2px] ${roboto_condensed.className} text-[#363940] hover:text-white text-[14px] font-bold
        border-2 hover:border-transparent rounded-sm
      bg-white hover:bg-[#363940]
        transition duration-150
        px-[32px] py-[12px]`}
    />
  );
}
