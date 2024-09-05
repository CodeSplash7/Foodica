import { type Blog, type BlogComment } from "@/types/blog-types";

import ClickableTag from "../style/ClickableTag";
import ClickableTitle from "./ClickableTitle";
import { formatCreationDate } from "@/general-utils/formatCreationDate";
import ClickableName from "./ClickableName";
import BlogCardPicture from "./BlogCardPicture";
import CommentsLink from "./CommentsLink";
import { shortenText } from "@/general-utils/shortenText";

type BlogCardProps = {
  blog: Blog;
  isSmall: boolean;
};

export default function BlogCard({ blog, isSmall }: BlogCardProps) {
  const { picture, creationDate, author, comments, description } = blog;
  return (
    <div
      className={`relative h-fit w-full flex flex-col items-start gap-[16px] ${
        isSmall && "gap-[8px]"
      }`}
    >
      <BlogCardPicture picture={picture} isSmall={isSmall} />
      <BlogCardTag blog={blog} isSmall={isSmall} />
      <BlogCardTitle blog={blog} isSmall={isSmall} />
      {!isSmall && (
        <>
          <BlogCardInfo blog={blog} info={{ creationDate, author, comments }} />
          <BlogCardDesc desc={description} />
          <BlogCardButton blog={blog} />
        </>
      )}
    </div>
  );
}

function BlogCardTag({ blog, isSmall }: { blog: Blog; isSmall: boolean }) {
  return (
    <ClickableTag
      blog={blog}
      addStyles={`${isSmall && "mt-[8px] text-[14px] tracking-[0.8px]"}`}
    />
  );
}

function BlogCardTitle({ blog, isSmall }: { blog: Blog; isSmall: boolean }) {
  return (
    <ClickableTitle
      addStyles={`${!isSmall && "text-[20px]"} ${
        isSmall && "text-[16px] md:text-[20px]"
      }`}
      type="text"
      blog={blog}
    />
  );
}

function BlogCardInfo({
  info,
  blog
}: {
  info: { creationDate: string; author: string; comments: BlogComment[] };
  blog: Blog;
}) {
  const { creationDate, author, comments } = info;
  return (
    <div
      className={`flex flex-wrap gap-[8px] items-center w-full
        text-[12px] sm:text-[16px]`}
    >
      <div className="text-gray-600">{formatCreationDate(creationDate)}</div>
      <div className="border-2 border-[#d2d7d9] rounded-full w-[2px] h-[2px"></div>
      <div>
        <span className="text-[#818592]">by</span>{" "}
        <ClickableName addStyles={`text-gray-600`}>{author}</ClickableName>
      </div>
      <div className="border-2 border-[#d2d7d9] rounded-full w-[2px] h-[2px]"></div>
      <div>
        <CommentsLink addStyles={`text-gray-600`} blog={blog}>
          {comments.length} comments
        </CommentsLink>
      </div>
    </div>
  );
}

function BlogCardDesc({ desc }: { desc: string }) {
  return (
    <div
      className={`w-full text-[16px] text-[#4c4c4c] [line-height:28.8px] [text-spacing:.7px] break-words`}
    >
      {shortenText(desc, 500)}
    </div>
  );
}

function BlogCardButton({ blog }: { blog: Blog }) {
  return <ClickableTitle blog={blog} type="button" label="READ MORE" />;
}
