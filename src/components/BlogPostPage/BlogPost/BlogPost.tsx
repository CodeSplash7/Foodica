import { Blog } from "@/utils/allSides/blogsFunctions";
import "react-loading-skeleton/dist/skeleton.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import BlogConclusion from "./BlogConclusion";
import BlogDistribution from "./BlogDistribution";
import RelatedPosts from "./RelatedPosts";
import TagList from "./TagList";
import BlogComments from "./BlogComments";
import BlogDescription from "./BlogDescription";

export default function BlogPost({ blog }: { blog: Blog }) {
  return (
    <div className={`flex flex-[1] flex-col gap-[32px]`}>
      <RecipeCard blog={blog} />
      <BlogConclusion blog={blog} />
      <BlogDistribution />
      <RelatedPosts blog={blog} />
      <TagList blog={blog} />
      <BlogDescription blog={blog} />
      <BlogComments blog={blog} />
    </div>
  );
}
