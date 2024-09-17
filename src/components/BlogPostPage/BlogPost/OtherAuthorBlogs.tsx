"use client";

import AwaitableImage from "@/components/AwaitableImage";
import { Blog } from "@/types/blog-types";
import { Inter } from "next/font/google";
import ChangeBlogButton from "./ChangeBlogsButton";
import { useCallback, useEffect, useState } from "react";
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
  const otherBlogs = useOtherBlogs(blog, authorBlogs);
  const { navigate, visibleBlogs } = useVisibleBlogs(otherBlogs);

  const responsiveClasses = ["flex", "hidden lg:flex", "hidden xl:flex"];
  return (
    <div
      className={`flex w-full items-center border-b pb-[32px] px-[32px] gap-[32px]`}
    >
      <ChangeBlogButton action={"-"} handleBlogsNavigation={navigate} />
      <div className="flex flex-row justify-between gap-[8px]">
        {blog === "loading"
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <OtherBlogCard
                  key={index}
                  responsiveClass={responsiveClasses[index]}
                  blog={"loading"}
                />
              ))
          : visibleBlogs.map((b, index) => (
              <OtherBlogCard
                key={index}
                responsiveClass={responsiveClasses[index]}
                blog={b}
              />
            ))}
      </div>

      <ChangeBlogButton action={"+"} handleBlogsNavigation={navigate} />
    </div>
  );
}

const OtherBlogCard: React.FC<{
  responsiveClass: string;
  blog: Blog | "loading";
}> = ({ responsiveClass, blog }) => {
  return (
    <ClickableTitle
      type="text"
      blog={blog}
      addStyles={`${responsiveClass} gap-[16px]`}
    >
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
              skeletonClassName={{ width: "96px", height: "96px" }}
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

function useOtherBlogs(
  currentBlog: Blog | "loading",
  authorBlogs: Blog[] | "loading"
) {
  const fetchOtherBlogs: () => Blog[] = () => {
    const otherBlogs =
      currentBlog === "loading" || authorBlogs === "loading"
        ? []
        : authorBlogs.filter((b) => b.id !== currentBlog.id);
    return otherBlogs;
  };
  return fetchOtherBlogs();
}

function useVisibleBlogs(otherBlogs: Blog[]) {
  const blogsCount = otherBlogs.length;

  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>(
    otherBlogs.slice(0, 3)
  );
  const [visibleBlogsIndex, setVisibleBlogsIndex] = useState<number>(0);

  const getElementAtIndex = useCallback((index: number) => {
    if (blogsCount === 0) {
      return undefined;
    }
    const wrappedIndex = index % blogsCount;
    return otherBlogs[wrappedIndex];
  }, [blogsCount, otherBlogs]);

  const handleBlogsNavigation = useCallback((action?: "-" | "+") => {
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
  }, [visibleBlogsIndex, blogsCount, getElementAtIndex]);

  useEffect(() => handleBlogsNavigation(), [handleBlogsNavigation]);

  return { navigate: handleBlogsNavigation, visibleBlogs };
}
