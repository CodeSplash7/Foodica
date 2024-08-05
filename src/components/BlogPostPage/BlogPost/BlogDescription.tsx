import AwaitableImage from "@/components/AwaitableImage";
import ClickableName from "@/components/ClickableName";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { User } from "@/utils/allSides/usersFunctions";
import { Skeleton } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";

const inter_600 = Inter({
  weight: "600",
  subsets: ["latin"]
});
const inter_300 = Inter({
  weight: "300",
  subsets: ["latin"]
});

export default async function BlogDescription({
  blog,
  authorUser
}: {
  blog: Blog | "loading";
  authorUser: User | null | "loading";
}) {
  return (
    <div className={`flex border-y-2 py-[32px] px-[16px] gap-[24px]`}>
      <BlogAuthorPicture
        pictureUrl={
          authorUser === "loading"
            ? "loading"
            : authorUser?.profile.profilePicture?.url!
        }
      />
      <div className={`flex-1 flex flex-col gap-[12px] `}>
        <BlogAuthorName
          authorName={blog === "loading" ? "loading" : blog.author}
        />
        <Description
          description={blog === "loading" ? "loading" : blog.description}
        />
      </div>
    </div>
  );
}

const BlogAuthorPicture: React.FC<{ pictureUrl: string | "loading" }> = ({
  pictureUrl
}) => {
  return (
    <div className="basis-[80px] relative">
      {pictureUrl === "loading" ? (
        <Skeleton variant="circular" sx={{ width: "100%", height: "80px" }} />
      ) : (
        <AwaitableImage
          src={pictureUrl}
          alt="user picture"
          height={256}
          width={256}
          fallBackStyles="rounded-full w-full h-[80px] text-[10px] absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center"
          className={`transition duration-300 w-full h-[80px] [object-fit:cover] rounded-full`}
        />
      )}
    </div>
  );
};

const BlogAuthorName: React.FC<{ authorName: string | "loading" }> = ({
  authorName
}) => {
  if (authorName === "loading")
    return (
      <Skeleton variant="text" sx={{ width: "50%", fontSize: "1.2rem" }} />
    );
  return (
    <ClickableName
      className={`transition duration-150 text-gray-800 hover:text-gray-500 ${inter_600.className} text-[1.2rem]`}
    >
      {authorName}
    </ClickableName>
  );
};

const Description: React.FC<{ description: string | "loading" }> = ({
  description
}) => {
  if (description === "loading")
    return (
      <>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </>
    );
  return (
    <div
      className={`leading-7 text-gray-700 [word-break:break-all] [overflow-wrap:break-word] ${inter_300.className}`}
    >
      {description}
    </div>
  );
};
