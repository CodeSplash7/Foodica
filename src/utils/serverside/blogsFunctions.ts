import "server-only";

import fs from "fs";
import path from "path";
import { Blog, getDivisions } from "../allSides/blogsFunctions";

let cachedBlogs: any;
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
