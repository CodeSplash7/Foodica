import { Blog } from "@/utils/allSides/blogsFunctions";
import "react-loading-skeleton/dist/skeleton.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import BlogDescription from "./BlogDescription";
import BlogDistribution from "./BlogDistribution";
import RelatedPosts from "./RelatedPosts";
import TagList from "./TagList";

export default function BlogPost({ blog }: { blog: Blog }) {
  return (
    <div className={`flex-[2] flex flex-col w-full h-fit gap-[32px]`}>
      <RecipeCard blog={blog} />
      <BlogDescription blog={blog} />
      <BlogDistribution />
      <RelatedPosts blog={blog} />
      <TagList blog={blog} />
    </div>
  );
}
