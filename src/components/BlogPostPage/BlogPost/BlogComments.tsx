import { BlogComment } from "@/utils/allSides/blogsFunctions";
import Comment from "./Comment";

import "./LoadingAnimation.css";
import { LoadingSpinner } from "@/components/Icons";

import { Roboto_Condensed } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { fetchAllAuthors } from "@/utils/serverside/authorsFunctions";
import { User } from "@/utils/allSides/usersFunctions";
const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700"
});

interface BlogCommentProps {
  commentList: BlogComment[] | "loading";
  blogId: string;
}

export default function BlogcommentList({
  commentList,
  blogId
}: BlogCommentProps) {
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    if (commentList !== "loading") {
      setCommentCount(commentList.length);
      fetchCommentAuthors();
    }
  }, [commentList]);
  const [commentAuthors, setCommentAuthors] = useState<Map<
    string,
    User | null
  > | null>(null);

  const fetchCommentAuthors = async () => {
    if (commentList === "loading") return;
    const allAuthors = await fetchAllAuthors(commentList);
    delay(10000);
    setCommentAuthors(allAuthors);
  };

  return (
    <div className={`w-full`}>
      <CommentsCount commentCount={commentCount} />
      <CommentsDivider />
      <br />
      {commentList === "loading" || !commentAuthors?.size ? (
        <LoadingSpinner />
      ) : (
        <div className={`w-full flex flex-col gap-[24px]`}>
          {commentList.map((c, i) => (
            <Comment
              commentAuthors={commentAuthors}
              incrementCommentCount={incrementCommentCount}
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

  function incrementCommentCount() {
    setCommentCount((prevCount) => prevCount + 1);
  }
}

export function CommentsDivider() {
  return <div className="w-full border-t"></div>;
}

const CommentsCount: React.FC<{ commentCount: number }> = ({
  commentCount
}) => (
  <div
    className={`${roboto_condensed.className} text-gray-800 uppercase w-full text-center text-[24px]`}
  >
    {commentCount} comments
  </div>
);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
