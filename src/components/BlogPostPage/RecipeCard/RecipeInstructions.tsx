import { Blog } from "@/utils/allSides/blogsFunctions";

export default function RecipeInstructions({ blog }: { blog: Blog }) {
  const directions = blog.directions;
  return (
    <div className={`flex flex-col gap-[32px] h-fit`}>
      <div className={` text-[26px] w-full text-start`}>Directions</div>
      <div className={`flex flex-col w-full h-fit gap-[24px]`}>
        {directions.map((direction, index) => (
          <div className={`flex gap-[16px] w-full items-start`} key={index}>
            <div className={`font-bold text-[22px] w-fit h-fit leading-7`}>
              {index + 1}
            </div>
            <div className={`text-gray-700 overflow-hidden`}>
              <span className="[word-break:break-all] [overflow-wrap:break-word]">{direction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
