import { Blog } from "@/utils/allSides/blogsFunctions";
import RecipeIngredients from "./RecipeIngredients";
import RecipeImage from "./RecipeImage";
import RecipeHeading from "./RecipeHeading";
import RecipeDetails from "./RecipeDetails";
import RecipeInstructions from "./RecipeInstructions";

export default function RecipeCard({ blog }: { blog: Blog | "loading" }) {
  return (
    <div
      className={`flex flex-col w-full h-fit overflow-hidden rounded-lg border gap-[16px] pb-[32px]`}
    >
      <RecipeImage blog={blog} />
      <div
        className={`flex flex-col w-full h-fit overflow-hidden gap-[16px] px-[32px]`}
      >
        <RecipeHeading blog={blog} />
        <RecipeDetails blog={blog} />
        <RecipeIngredients blog={blog} />
        <RecipeInstructions blog={blog} />
      </div>
    </div>
  );
}
