import { Blog } from "@/types/blog-types";
import { Skeleton } from "@mui/material";

export default function RecipeInstructions({
  blog
}: {
  blog: Blog | "loading";
}) {
  const isLoading = blog === "loading";
  const directions = isLoading
    ? Array(3)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            className="w-full"
            sx={{ width: "100%", fontSize: "22px" }}
          />
        ))
    : blog.directions;
  return (
    <div className={`flex flex-col gap-[32px] w-full h-fit`}>
      <div className={` text-[26px] w-full text-start`}>Directions</div>
      <div className={`flex flex-col w-full h-fit gap-[24px]`}>
        {directions.map((direction, index) => (
          <RecipeInstruction key={index} index={index}>{direction}</RecipeInstruction>
        ))}
      </div>
    </div>
  );
}

const RecipeInstruction = ({
  children,
  index
}: {
  children: string | React.ReactNode;
  index: number;
}) => (
  <div className={`flex gap-[16px] w-full items-start`} key={index}>
    <div className={`font-bold text-[22px] w-fit h-fit leading-7`}>
      {index + 1}
    </div>
    <div className={`text-gray-700 overflow-hidden w-full`}>
      <span className="w-full [word-break:break-all] [overflow-wrap:break-word]">
        {children}
      </span>
    </div>
  </div>
);
