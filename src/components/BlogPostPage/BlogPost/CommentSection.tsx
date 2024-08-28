"use client";
import { Blog, BlogComment } from "@/utils/allSides/blogsFunctions";
import CommentInput from "./CommentInput";
import BlogComments from "./BlogComments";
import { getUserByEmail } from "@/utils/serverside/userFunctions";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { addCommentToBlog } from "@/utils/serverside/blogsFunctions";

export default function CommentSection({
  blog,
  session
}: {
  session: Session | null;
  blog: Blog | "loading";
}) {
  const [commentList, setCommentList] = useState<BlogComment[] | "loading">(
    "loading"
  );

  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByEmail(session?.user?.email || "");
      setCurrentUserId(user?.id);
    };
    if (blog !== "loading") setCommentList(blog.comments);

    fetchUser();
  }, []);

  const handleNewComment = async (content: string) => {
    if (blog === "loading" || !currentUserId) return { ok: false };
    const { res: newComment } = await addCommentToBlog(
      blog.id,
      currentUserId,
      content
    );
    if (!newComment) return { ok: false };
    setCommentList((prevComments) => {
      if (prevComments !== "loading") return [...prevComments, newComment];
      return "loading"; // never gonna happen but typescript forces its
    });
    return { ok: true };
  };
  if (blog === "loading" || commentList === "loading") {
    return <div>Loading comments...</div>;
  }
  return (
    <div id="comments" className="w-full flex flex-col gap-8">
      <CommentInput
        blogId={blog.id}
        userId={currentUserId}
        onAddComment={handleNewComment}
      />
      <BlogComments blogId={blog.id} commentList={commentList} />
    </div>
  );
}
