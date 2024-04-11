import Image from "next/image";
import Link from "next/link";

import { type StaticImageData } from "next/image";
import { type Blog, type BlogComment } from "@/store/blogsSlice";

import { formatCreationDate } from "@/app/HighlightedBlog";

type BlogCardProps = {
  blog: Blog;
  isSmall: boolean;
};

export default function BlogCard({ blog, isSmall }: BlogCardProps) {
  const {
    image,
    mainTag: tag,
    title,
    creationDate,
    author,
    comments,
    description
  } = blog;
  return (
    <div
      className={`h-fit w-full sm:w-full flex flex-col items-start gap-[16px] ${
        isSmall && "gap-[8px]"
      }`}
    >
      <BlogCardImage image={image} isSmall={isSmall} />
      <BlogCardTag tag={tag} isSmall={isSmall} />
      <BlogCardTitle title={title} isSmall={isSmall} />
      {!isSmall && <BlogCardInfo info={{ creationDate, author, comments }} />}
      {!isSmall && <BlogCardDesc desc={description} />}
      {!isSmall && <BlogCardButton />}
    </div>
  );
}

function shortenText(text: string, maxLength: number) {
  const words = text.split(" ");

  if (words.length <= maxLength) {
    return text;
  }

  const shortenedText = words.slice(0, maxLength).join(" ") + " [...]";
  return shortenedText;
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
      src={"/" + image.src}
      width={image.width}
      height={image.height}
    />
  );
}
function BlogCardTag({ tag, isSmall }: { tag: string; isSmall: boolean }) {
  return (
    <div
      className={`w-full flex justify-${isSmall ? "start" : "center"} mt-[24px] 
        tracking-[1.2px] text-[#acacac] hover:text-[#838a9a] text-[16px] [font-family:'Roboto_Condensed',sans-serif] 
        transition duration-150 
        ${isSmall && "mt-[8px] text-[14px] tracking-[0.8px]"}`}
    >
      {tag.toLocaleUpperCase()}
    </div>
  );
}

function BlogCardTitle({
  title,
  isSmall
}: {
  title: string;
  isSmall: boolean;
}) {
  return (
    <Link
      href=""
      className={`text-[rgb(54,57,64)] hover:text-[#818592] ${
        !isSmall && "text-[20px]"
      } ${isSmall && "text-[16px] md:text-[20px]"} font-bold 
        transition duration-150 `}
    >
      {title}
    </Link>
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
      className={`flex flex-wrap gap-[8px] items-center 
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
      className={`text-[16px] text-[#4c4c4c] [line-height:28.8px] [text-spacing:.7px]`}
    >
      {shortenText(desc, 56)}
    </div>
  );
}

function BlogCardButton() {
  return (
    <div
      className={`[letter-spacing:2px] [font-family:'Roboto_Condensed',sans-serif] text-[#363940] hover:text-white text-[14px] font-bold
        border-2 hover:border-transparent rounded-sm
      bg-white hover:bg-[#363940]
        transition duration-150 
        px-[32px] py-[12px]`}
    >
      READ MORE
    </div>
  );
}
