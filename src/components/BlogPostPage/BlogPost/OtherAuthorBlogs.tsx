"use client";

import AwaitableImage from "@/components/AwaitableImage";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { Inter } from "next/font/google";
import ChangeBlogButton from "./ChangeBlogsButton";
import { useEffect, useState } from "react";
import ClickableTitle from "@/components/ClickableTitle";
import { Skeleton } from "@mui/material";
const inter = Inter({
  weight: "600",
  subsets: ["latin"]
});

export default function OtherAuthorBlogs({
  authorBlogs,
  blog
}: {
  authorBlogs: Blog[] | "loading";
  blog: Blog | "loading";
}) {
  const getAllOtherBlogs: () => [Blog[], number] = () => {
    const otherBlogs =
      blog === "loading" || authorBlogs === "loading"
        ? []
        : authorBlogs.filter((b) => b.id !== blog.id);
    return [otherBlogs, otherBlogs.length];
  };

  const [otherBlogs, blogsCount] = getAllOtherBlogs();
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>(
    otherBlogs.slice(0, 3)
  );
  const [visibleBlogsIndex, setVisibleBlogsIndex] = useState<number>(0);

  useEffect(() => handleBlogsNavigation(), []);

  function handleBlogsNavigation(action?: "-" | "+") {
    let newBlogsIndex = visibleBlogsIndex;
    if (action === "-") newBlogsIndex--;
    if (action === "+") newBlogsIndex++;
    if (newBlogsIndex < 0) {
      newBlogsIndex = blogsCount - 1;
    }
    if (newBlogsIndex > blogsCount - 1) {
      newBlogsIndex = 0;
    }
    const newCurrentBlogs = Array.from(
      { length: blogsCount <= 3 ? blogsCount : 3 },
      (_, i) => getElementAtIndex(newBlogsIndex + i)
    );
    setVisibleBlogs(newCurrentBlogs as Blog[]);
    setVisibleBlogsIndex(newBlogsIndex);
  }

  function getElementAtIndex(index: number) {
    if (blogsCount === 0) {
      return undefined;
    }
    const wrappedIndex = index % blogsCount;
    return otherBlogs[wrappedIndex];
  }

  const responsiveClasses = ["flex", "hidden lg:flex", "hidden xl:flex"];
  return (
    <div
      className={`flex w-full items-center border-b pb-[32px] px-[32px] gap-[32px]`}
    >
      <ChangeBlogButton
        action={"-"}
        handleBlogsNavigation={handleBlogsNavigation}
      />
      <div className="flex flex-row justify-between gap-[8px]">
        {blog === "loading"
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <OtherBlogCard
                  responsiveClass={responsiveClasses[index]}
                  blog={"loading"}
                />
              ))
          : visibleBlogs.map((b, index) => (
              <OtherBlogCard
                responsiveClass={responsiveClasses[index]}
                blog={b}
              />
            ))}
      </div>

      <ChangeBlogButton
        action={"+"}
        handleBlogsNavigation={handleBlogsNavigation}
      />
    </div>
  );
}

const OtherBlogCard: React.FC<{
  responsiveClass: string;
  blog: Blog | "loading";
}> = ({ responsiveClass, blog }) => {
  return (
    <ClickableTitle blog={blog} className={`${responsiveClass} gap-[16px]`}>
      <div className="relative">
        <>
          {blog === "loading" && (
            <Skeleton variant="rounded" width={96} height={96} />
          )}
          {blog !== "loading" && (
            <AwaitableImage
              src={blog?.picture?.url ?? null}
              alt="blog picture"
              className="transition duration-300 w-[96px] h-[96px] [object-fit:cover]"
              fallBackStyles="absolute flex items-center justify-center text-gray-500 bg-gray-300 w-[96px] h-[96px]"
              height={256}
              width={256}
            />
          )}
        </>
      </div>
      <>
        {blog === "loading" && (
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              sx={{ height: "28px", width: "128px", fontSize: "1.1rem" }}
            />
            <Skeleton
              variant="text"
              sx={{ height: "28px", width: "128px", fontSize: "1.1rem" }}
            />
            <Skeleton
              variant="text"
              sx={{ height: "28px", width: "128px", fontSize: "1.1rem" }}
            />
          </div>
        )}
        {blog !== "loading" && (
          <div className={`text-[1.1rem] w-[128px] ${inter.className}`}>
            {blog?.title}
          </div>
        )}
      </>
    </ClickableTitle>
  );
};
