import ClickableName from "@/components/ClickableName";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { hashId } from "@/utils/serverside/blogIdHashing";
import { getServerSession } from "next-auth";
import { Roboto_Condensed } from "next/font/google";
import Link from "next/link";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

export default async function RecipeHeading({ blog }: { blog: Blog }) {
  const session = await getServerSession();
  return (
    <div className={`flex flex-col w-full h-fit gap-[16px]`}>
      <h1 className={`font-semibold text-[26px] sm:text-[34px] text-[#222222]`}>
        {blog.title}
      </h1>
      {session && session.user?.name === blog.author && (
        <Link
          href={`/create-blog?for=update&blog=${await hashId(blog.id)}`}
          className={`mt-[16px] self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white bg-gray-800`}
        >
          Update Blog
        </Link>
      )}
      <p className={`text-[16px] font-light italic text-gray-500`}>
        Recipe by{" "}
        <ClickableName
          className={`hover:text-gray-700 duration-150 transition`}
        >
          {blog.author}
        </ClickableName>
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
