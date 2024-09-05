import RecipeCard from "../RecipeCard/RecipeCard";
import BlogConclusion from "./BlogConclusion";
import BlogDistribution from "./BlogDistribution";
import RelatedPosts from "./RelatedPosts";
import TagList from "./TagList";
import BlogDescription from "./BlogDescription";
import OtherAuthorBlogs from "./OtherAuthorBlogs";
import CommentSection from "./CommentSection";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { getUserByUsername } from "@/server-utils/userFunctions";
import { getBlogsByIds } from "@/server-utils/blogsFunctions";
import { Blog } from "@/types/blog-types";

export default async function BlogPost({ blog }: { blog: Blog | "loading" }) {
  const authorUser =
    blog === "loading" ? "loading" : await getUserByUsername(blog?.author);
  const authorBlogs =
    authorUser === "loading"
      ? "loading"
      : await getBlogsByIds(authorUser?.blogs);
  const session = await getServerSession();
  return (
    <div className={`flex flex-col gap-[32px] w-full `}>
      <RecipeCard blog={blog} />
      <BlogConclusion blog={blog} />
      <BlogDistribution />
      <RelatedPosts blog={blog} />
      <TagList blog={blog} />
      <BlogDescription blog={blog} authorUser={authorUser} />
      <OtherAuthorBlogs blog={blog} authorBlogs={authorBlogs} />
      <Suspense>
        <CommentSection session={session} blog={blog} />
      </Suspense>
    </div>
  );
}
