import "server-only";

import fs from "fs";
import path from "path";
import { Blog, getDivisions } from "../allSides/blogsFunctions";
import { redirect } from "next/navigation";

let cachedBlogs: Blog[];
function cacheBlogs() {
  if (!cachedBlogs) {
    const filePath = path.join(process.cwd(), "db", "db.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    cachedBlogs = JSON.parse(fileContents).blogs;
  }
}
export const getRecentBlogs = (count: number) => {
  cacheBlogs();
  const sortedBlogs = [...cachedBlogs].sort((a, b) => {
    const dateA = new Date(a.creationDate).getTime();
    const dateB = new Date(b.creationDate).getTime();
    return dateB - dateA;
  });

  return sortedBlogs.slice(0, count);
};

export const getBlogs: () => Blog[] = () => {
  cacheBlogs();

  return cachedBlogs;
};

export const getRandomBlog = () => {
  cacheBlogs();
  return cachedBlogs[Math.floor(Math.random() * cachedBlogs.length)];
};

export const getPagesCount = () => {
  cacheBlogs();
  return getDivisions(cachedBlogs, 4).length;
};

export const getRelatedBlogs = (
  irrelevanBlogId: number,
  tag: string,
  count: number
) => {
  cacheBlogs();
  let result: Blog[] = [];
  cachedBlogs.forEach((b) => {
    if (result.length > 2 || b.id === irrelevanBlogId) return;
    if (b.mainTag === tag) result.push(b);
    if (b.mainTag === tag) console.log(b.title);
  });
  if (result.length < 3) {
    console.log("HET");
    cachedBlogs.forEach((b) => {
      if (result.length > 2 || b.id === irrelevanBlogId) return;
      if (b.secondaryTags.includes(tag)) result.push(b);
    });
  }
  console.log(result);
  return result;
};

export function redirectToCorrectBlog(blogSelected: Blog) {
  const blogDate = new Date(blogSelected.creationDate);
  redirect(
    `/blogs/${blogDate.getFullYear()}/${
      blogDate.getMonth() + 1
    }/${blogDate.getDate()}/${blogSelected.title
      .toLowerCase()
      .split(" ")
      .join("-")}`
  );
}

export function checkForBlogName({ possibleName }: { possibleName: string }) {
  const blogSelected = getBlogs().find(
    (blog) => blog.title.toLowerCase().split(" ").join("-") === possibleName
  );
  if (blogSelected) {
    redirectToCorrectBlog(blogSelected);
  }
}
