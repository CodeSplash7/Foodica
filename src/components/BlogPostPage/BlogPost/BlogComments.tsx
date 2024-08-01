import { BlogComment, type Blog } from "@/utils/allSides/blogsFunctions";
import { Roboto_Condensed } from "next/font/google";
import Comment from "./Comment";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700"
});

export default async function BlogComments({
  comments,
  blogId
}: {
  comments: BlogComment[];
  blogId: string;
}) {
  const topComments = comments.filter((c) => !c.parentId);
  return (
    <div className={`w-full`}>
      <div
        className={`${roboto_condensed.className} text-gray-800 uppercase w-full text-center text-[24px]`}
      >
        {comments.length} comments
      </div>
      <CommentsSeparationLine />
      <br />
      <div className={`w-full flex flex-col gap-[24px]`}>
        {topComments.map((c, i) => (
          <Comment
            isTopComment={true}
            key={i}
            blogId={blogId}
            comment={c}
            commentIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

export function CommentsSeparationLine() {
  return <div className="w-full border-t"></div>;
}
