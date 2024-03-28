import Image from "next/image";
import Link from "next/link";

import { type StaticImageData } from "next/image";
import { type Blog, type BlogComment } from "@/store/blogsSlice";

import { formatCreationDate } from "@/app/HighlightedBlog";

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  const { image, tag, title, creationDate, author, comments, description } =
    blog;
  return (
    <div className={`h-fit w-full flex flex-col items-center gap-[16px]`}>
      <BlogCardImage image={image} />
      <BlogCardTag tag={tag} />
      <BlogCardTitle title={title} />
      <BlogCardInfo info={{ creationDate, author, comments }} />
      <BlogCardDesc desc={description} />
      <BlogCardButton />
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

function BlogCardImage({ image }: { image: StaticImageData }) {
  return (
    <Image
      className={`[object-fit:cover]    w-[360px] sm:w-full    h-[540px] sm:h-[64vw] md:h-[42vw]`}
      alt="blog image"
      src={"/" + image.src}
      width={image.width}
      height={image.height}
    />
  );
}
function BlogCardTag({ tag }: { tag: string }) {
  return (
    <div
      className={`w-full flex justify-center mt-[24px] 
        [letter-spacing:1.2px] text-[#acacac] hover:text-[#838a9a] text-[16px] [font-family:'Roboto_Condensed',sans-serif] 
        transition duraiton-150`}
    >
      {tag.toLocaleUpperCase()}
    </div>
  );
}

function BlogCardTitle({ title }: { title: string }) {
  return (
    <Link
      href=""
      className={`text-[rgb(54,57,64)] hover:text-[#818592] text-[20px] font-bold 
        transition duration-150`}
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
