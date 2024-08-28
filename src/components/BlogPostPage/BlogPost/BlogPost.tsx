import { Blog } from "@/utils/allSides/blogsFunctions";
import RecipeCard from "../RecipeCard/RecipeCard";
import BlogConclusion from "./BlogConclusion";
import BlogDistribution from "./BlogDistribution";
import RelatedPosts from "./RelatedPosts";
import TagList from "./TagList";
import BlogDescription from "./BlogDescription";
import OtherAuthorBlogs from "./OtherAuthorBlogs";
import { getUserByUsername } from "@/utils/serverside/userFunctions";
import { getBlogsByIds } from "@/utils/serverside/blogsFunctions";
import CommentSection from "./CommentSection";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function BlogPost({ blog }: { blog: Blog | "loading" }) {
  const authorUser =
    blog === "loading" ? "loading" : await getUserByUsername(blog?.author);
  const authorBlogs =
    authorUser === "loading"
      ? "loading"
      : await getBlogsByIds(authorUser?.blogs);
  const session = await getServerSession();
  return (
    <div className={`flex  flex-col gap-[32px] w-full max-w-[1000px]`}>
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
