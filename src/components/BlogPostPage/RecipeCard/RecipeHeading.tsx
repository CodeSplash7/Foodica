import { Blog } from "@/utils/allSides/blogsFunctions";

export default function RecipeHeading({ blog }: { blog: Blog }) {
  return (
    <div className={`flex flex-col w-full h-fit gap-[16px]`}>
      <h1 className={`font-semibold text-[26px] sm:text-[34px] text-[#222222]`}>
        {blog.title}
      </h1>
      <p className={`text-[16px] font-light italic text-gray-500`}>
        Recipe by {blog.author}
      </p>
      <div
        className={`border-t border-gray-400 border-dashed text-[16px] font-light text-gray-500`}
      ></div>
      <p className={`text-[16px] font-light text-gray-500`}>
        Course: <span className={`font-bold text-black`}>{blog.mainTag}</span>
        <span className={`px-[24px] text-slate-300`}>/</span>
        Difficulty:{" "}
        <span className={`font-bold text-black`}>{blog.difficulty}</span>
      </p>
    </div>
  );
}
