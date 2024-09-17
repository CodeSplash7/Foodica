"use client";
import CommentInput from "./CommentInput";
import BlogComments from "./BlogComments";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Blog, BlogComment } from "@/types/blog-types";
import { getUserByEmail } from "@/server-utils/userFunctions";
import { addCommentToBlog } from "@/server-utils/blogsFunctions";

export default function CommentSection({
  blog,
  session
}: {
  session: Session | null;
  blog: Blog | "loading";
}) {
  const { commentList, addComment } = useCommentList(blog);
  const currentUserId = useCurrentUserId(session);
  const handleNewComment = useHandleNewComment(blog, addComment, currentUserId);
  if (blog === "loading") {
    return <div>Loading comments...</div>;
  }

  return (
    <div id="comments" className="w-full flex flex-col gap-8">
      <CommentInput userId={currentUserId} onAddComment={handleNewComment} />
      <BlogComments blogId={blog.id} commentList={commentList} />
    </div>
  );
}

function useCommentList(blog: Blog | "loading") {
  const [commentList, setCommentList] = useState<BlogComment[] | "loading">(
    "loading"
  );
  useEffect(() => {
    if (blog !== "loading") setCommentList(blog.comments);
  }, [blog]);

  function addComment(newComment: BlogComment) {
    setCommentList((prevComments) => {
      if (prevComments !== "loading") return [...prevComments, newComment];
      return "loading"; // never gonna happen but typescript forces its
    });
  }

  return { commentList, addComment };
}

export function useCurrentUserId(session: Session | null) {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByEmail(session?.user?.email || "");
      setCurrentUserId(user?.id);
    };
    fetchUser();
  }, [session?.user?.email]);

  return currentUserId;
}

function useHandleNewComment(
  blog: Blog | "loading",
  addComment: (newComment: BlogComment) => void,
  currentUserId?: string
) {
  return async (content: string) => {
    if (blog === "loading" || !currentUserId) return { ok: false };
    const { res: newComment } = await addCommentToBlog(
      blog.id,
      currentUserId,
      content
    );
    if (!newComment) return { ok: false };
    addComment(newComment);
    return { ok: true };
  };
}
