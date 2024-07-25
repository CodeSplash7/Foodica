"use client";

import AwaitableImage from "@/components/AwaitableImage";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { Inter } from "next/font/google";
import ChangeBlogButton from "./ChangeBlogsButton";
import { useEffect, useState } from "react";
import ClickableTitle from "@/components/ClickableTitle";
const inter = Inter({
  weight: "600",
  subsets: ["latin"]
});

export default function OtherAuthorBlogs({
  authorBlogs,
  blog
}: {
  authorBlogs: Blog[];
  blog: Blog;
}) {
  const otherAuthorBlogs = authorBlogs.filter((b) => b.id !== blog.id);
  const blogsCount = otherAuthorBlogs.length;
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>(
    otherAuthorBlogs.slice(0, 3)
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
    return otherAuthorBlogs[wrappedIndex];
  }

  const blogsTemplateStyles = ["flex", "hidden lg:flex", "hidden xl:flex"];
  return (
    <div
      className={`flex w-full items-center border-b pb-[32px] px-[32px] gap-[32px]`}
    >
      <ChangeBlogButton
        action={"-"}
        handleBlogsNavigation={handleBlogsNavigation}
      />
      <div className="flex flex-row justify-between gap-[8px]">
        {visibleBlogs.map((b, index) => (
          <ClickableTitle
            key={blog.id}
            blog={blog}
            className={`${blogsTemplateStyles[index]} gap-[16px]`}
          >
            <div className="relative">
              <AwaitableImage
                src={b?.picture?.url ?? null}
                alt="blog picture"
                className="transition duration-300 w-[96px] h-[96px] [object-fit:cover]"
                fallBackStyles="absolute flex items-center justify-center text-gray-500 bg-gray-300 w-[96px] h-[96px]"
                height={256}
                width={256}
              />
            </div>
            <div className={`text-[1.1rem] w-[128px] ${inter.className}`}>
              {b?.title}
            </div>
          </ClickableTitle>
        ))}
      </div>

      <ChangeBlogButton
        action={"+"}
        handleBlogsNavigation={handleBlogsNavigation}
      />
    </div>
  );
}
