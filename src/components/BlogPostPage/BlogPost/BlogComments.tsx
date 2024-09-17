"use client";
import { BlogComment } from "@/types/blog-types";
import Comment from "./Comment";

import { LoadingSpinner } from "@/components/Icons";

import { Roboto_Condensed } from "next/font/google";
import { useEffect, useState } from "react";
import { fetchAllAuthors } from "@/server-utils/authorsFunctions";
import { User } from "@/types/user-types";
const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700"
});

interface BlogCommentProps {
  commentList: BlogComment[] | "loading";
  blogId: string;
}

export default function BlogComments({
  commentList,
  blogId
}: BlogCommentProps) {
  const { commentCount, incrementCommentCount, commentAuthors } =
    useCommentInformation(commentList);

  return (
    <div className={`w-full`}>
      <CommentsCount commentCount={commentCount} />
      <CommentsDivider />
      <br />
      {!commentAuthors?.size ? null : commentList === "loading" ? (
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

function useCommentInformation(commentList: BlogComment[] | "loading") {
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    if (commentList !== "loading") {
      const fetchCommentAuthors = async () => {
        const allAuthors = await fetchAllAuthors(commentList);
        setCommentAuthors(allAuthors);
      };
      setCommentCount(commentList.length);
      fetchCommentAuthors();
    }
  }, [commentList]);

  function incrementCommentCount() {
    setCommentCount((prevCount) => prevCount + 1);
  }

  const [commentAuthors, setCommentAuthors] = useState<Map<
    string,
    User | null
  > | null>(null);

  return { commentCount, incrementCommentCount, commentAuthors };
}
