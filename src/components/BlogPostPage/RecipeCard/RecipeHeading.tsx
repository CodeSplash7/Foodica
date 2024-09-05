import Skeleton from "@mui/material/Skeleton";

import ClickableName from "@/components/ClickableName";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { Button3 } from "@/components/styled-buttons";
import options from "@/app/api/auth/[...nextauth]/options";
import { Blog } from "@/types/blog-types";
import { createBlogPageLink } from "@/general-utils/app-routes";
import { hashId } from "@/server-utils/blogIdHashing";

export default async function RecipeHeading({
  blog
}: {
  blog: Blog | "loading";
}) {
  const isLoading = blog === "loading";

  const session = await getServerSession(options);

  return (
    <div className={`flex flex-col w-full h-fit gap-[16px]`}>
      <RecipeTitle title={isLoading ? "" : blog.title} isLoading={isLoading} />
      <UpdateRecipe blog={blog} session={session} />
      <RecipeAuthor
        blogAuthor={isLoading ? "" : blog.author}
        isLoading={isLoading}
      />
      <div
        className={`border-t border-gray-400 border-dashed text-[16px] font-light text-gray-500`}
      ></div>
      <RecipeCourseAndDifficulty blog={blog} />
    </div>
  );
}

const RecipeTitle = ({
  title,
  isLoading
}: {
  title: string;
  isLoading: boolean;
}) => {
  if (isLoading) return <RecipeTitleSkeleton />;
  return (
    <h1 className={`font-semibold text-[26px] sm:text-[34px] text-[#222222]`}>
      {title}
    </h1>
  );
};

const RecipeTitleSkeleton = () => (
  <Skeleton
    sx={{ fontSize: "26px", "@media (min-width: 640px)": { fontSize: "34px" } }}
  />
);

const UpdateRecipe = async ({
  session,
  blog
}: {
  session: Session | null;
  blog: Blog | "loading";
}) => {
  const isLoading = blog === "loading";
  if (isLoading) return;
  if (session && session.user?.name === blog.author)
    return (
      <Link href={createBlogPageLink(await hashId(blog.id))}>
        <Button3 text="Update Blog" />
      </Link>
    );
};

const RecipeAuthor = ({
  blogAuthor,
  isLoading
}: {
  blogAuthor: string;
  isLoading: boolean;
}) => {
  if (isLoading) return <RecipeAuthorSkeleton />;
  return (
    <p className={`text-[16px] font-light italic text-gray-500`}>
      Recipe by{" "}
      <ClickableName addStyles={`hover:text-gray-700 duration-150 transition`}>
        {blogAuthor}
      </ClickableName>
    </p>
  );
};

const RecipeAuthorSkeleton = () => (
  <Skeleton
    width={100}
    variant={`text`}
    sx={{ fontSize: "16px", display: "inline-block" }}
  />
);

const RecipeCourseAndDifficulty = ({ blog }: { blog: Blog | "loading" }) => {
  if (blog === "loading") {
    return <RecipeCourseAndDifficultySkelleton />;
  }
  return (
    <p className={`text-[16px] font-light text-gray-500`}>
      Course: <span className={`font-bold text-black`}>{blog.mainTag}</span>
      <span className={`px-[24px] text-slate-300`}>/</span>
      Difficulty:{" "}
      <span className={`font-bold text-black`}>{blog.difficulty}</span>
    </p>
  );
};

const RecipeCourseAndDifficultySkelleton = () => (
  <Skeleton
    variant={`text`}
    sx={{ fontSize: "16px", display: "inline-block" }}
  />
);
