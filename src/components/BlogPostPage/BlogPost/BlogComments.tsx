import { BlogComment, type Blog } from "@/utils/allSides/blogsFunctions";
import { Roboto_Condensed } from "next/font/google";
import Comment from "./Comment";
import "./LoadingAnimation.css";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700"
});

export default async function BlogComments({
  comments,
  blogId
}: {
  comments: BlogComment[] | "loading";
  blogId: string;
}) {
  const topComments =
    comments === "loading" || blogId === "loading"
      ? "loading"
      : comments.filter((c) => !c.parentId);
  return (
    <div className={`w-full`}>
      <div
        className={`${roboto_condensed.className} text-gray-800 uppercase w-full text-center text-[24px]`}
      >
        {comments === "loading" ? "" : comments.length} comments
      </div>
      <CommentsSeparationLine />
      <br />
      {topComments === "loading" ? (
        <LoadingAnimation />
      ) : (
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
      )}
    </div>
  );
}

export function CommentsSeparationLine() {
  return <div className="w-full border-t"></div>;
}

const LoadingAnimation = () => {
  return (
    <svg className="loading-spinner w-[40px]" viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20"></circle>
    </svg>
  );
};
