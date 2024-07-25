"use server";

import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import {
  BlogComment,
  Blog,
  BlogTag,
  getDivisions
} from "@/utils/allSides/blogsFunctions";
import crypto from "crypto";
import { addBlogToUser } from "./userFunctions";

const filePath = path.join(process.cwd(), "db", "blogs.json");

let cachedBlogs: Blog[] = [];
let blogsInitialized = false;
let lastModified = 0;

const initializeBlogs = async () => {
  const stats = await fs.promises.stat(filePath);
  const currentModified = stats.mtimeMs;

  if (!blogsInitialized || lastModified !== currentModified) {
    try {
      const fileContents = await fs.promises.readFile(filePath, "utf-8");
      cachedBlogs = JSON.parse(fileContents);
      blogsInitialized = true;
      lastModified = currentModified;
    } catch (error) {
      console.error("Failed to load blogs from file", error);
      cachedBlogs = [];
      blogsInitialized = false;
    }
  }
};

const loadBlogsFromFile: () => Promise<Blog[]> = async () => {
  let cachedBlogs = [];
  try {
    const fileContents = await fs.promises.readFile(filePath, "utf-8"); // Use await to handle the promise

    cachedBlogs = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load blogs from file:", error);
  }
  return cachedBlogs;
};
loadBlogsFromFile();

function setCache(data: Blog[]) {
  cachedBlogs = data;
}

async function updateDb(): Promise<void> {
  try {
    const dbBlogs = await fs.promises.readFile(filePath, "utf-8");
    const cachedStringifiedBlogs = JSON.stringify(cachedBlogs);
    if (dbBlogs !== cachedStringifiedBlogs) {
      await fs.promises.writeFile(filePath, cachedStringifiedBlogs, "utf-8");
      // Reset the cache
      blogsInitialized = false;
      await initializeBlogs();
    }
  } catch (error) {
    console.error("Failed to update the database:", error);
  }
}

export const getRecentBlogs = async (count: number): Promise<Blog[]> => {
  await initializeBlogs();
  const sortedBlogs = [...cachedBlogs].sort((a, b) => {
    const dateA = new Date(a.creationDate).getTime();
    const dateB = new Date(b.creationDate).getTime();
    return dateB - dateA;
  });

  return sortedBlogs.slice(0, count);
};

export const getBlogs: () => Promise<Blog[]> = async () => {
  await initializeBlogs();
  return cachedBlogs;
};

export const getBlogById: (id: string) => Promise<Blog | undefined> = async (
  id
) => {
  await initializeBlogs();
  return cachedBlogs.find((b) => b.id === id);
};

export const getBlogsByIds: (
  ids: string[] | undefined
) => Promise<Blog[]> = async (ids) => {
  if (!ids) return [];
  await initializeBlogs();
  return cachedBlogs.filter((b) => ids.find((id) => b.id === id));
};

export const getRandomBlog: () => Promise<Blog> = async () => {
  await initializeBlogs();
  return cachedBlogs[Math.floor(Math.random() * cachedBlogs.length)];
};

export const getPagesCount: () => Promise<number> = async () => {
  await initializeBlogs();
  return getDivisions(cachedBlogs, 4).length;
};

export const getRelatedBlogs: (
  irrelevanBlogId: string,
  tag: string,
  count: number
) => Promise<Blog[]> = async (irrelevanBlogId, tag, count) => {
  await initializeBlogs();
  let result: Blog[] = [];
  cachedBlogs.forEach((b) => {
    if (result.length > count - 1 || b.id === irrelevanBlogId) return;
    if (b.mainTag === tag) result.push(b);
  });
  if (result.length < count) {
    cachedBlogs.forEach((b) => {
      if (result.length > 2 || b.id === irrelevanBlogId) return;
      if (b.secondaryTags.includes(tag as BlogTag)) result.push(b);
    });
  }
  return result;
};

export async function redirectToCorrectBlog(blogSelected: Blog) {
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

export async function checkForBlogName({
  possibleName
}: {
  possibleName: string;
}) {
  await initializeBlogs();
  const blogSelected = cachedBlogs.find(
    (blog) => blog.title.toLowerCase().split(" ").join("-") === possibleName
  );
  if (blogSelected) {
    redirectToCorrectBlog(blogSelected);
  }
}

export async function addCommentToBlog(comment: BlogComment, blogId: string) {
  await initializeBlogs();
  const blog = await getBlogById(blogId);
  if (!blog) {
    return { ok: false, error: "Couldn't find the blog in the database." };
  }
  blog.comments.push(comment);
  updateDb();
  return { ok: true, error: null };
}

export async function createBlog(
  data: string,
  options?: { update: boolean; id?: string; authorEmail?: string | null }
): Promise<Blog | { error: string }> {
  if (options?.update && !options?.id) return { error: "Blog not found" };
  await initializeBlogs();
  if (!options?.update) {
    const newBlogInfo = JSON.parse(data);
    const id = crypto.randomBytes(16).toString("hex");
    const creationDate = new Date().toString();
    const comments: any = [];

    const newBlog: Blog = { ...newBlogInfo, id, creationDate, comments };
    cachedBlogs.push(newBlog);
    updateDb();
    addBlogToUser(options?.authorEmail, id);
    return newBlog;
  }

  if (options.update && options.id) {
    const newBlogInfo = JSON.parse(data) as Blog;
    const oldBlogInfo = await getBlogById(options.id);
    if (!oldBlogInfo) return { error: "Blog not found" };
    const newBlog: Blog = { ...oldBlogInfo, ...newBlogInfo };
    setCache(
      cachedBlogs.map((b) => {
        if (b.id === newBlog.id) return newBlog;
        return b;
      })
    );
    updateDb();
    return newBlog;
  }

  return {} as Blog;
}

export async function getBlogByUrlName(urlName: string | undefined) {
  await initializeBlogs();
  const blog = cachedBlogs.find(
    (blog) =>
      blog.title.toLowerCase().split(" ").join("-").split("&").join("%26") ===
      urlName
  );
  return blog;
}

export async function deleteBlogPost(blogId: string): Promise<boolean> {
  try {
    // Load the blogs from file
    let cachedBlogs = await loadBlogsFromFile();

    // Find the index of the blog with the given ID
    const index = cachedBlogs.findIndex((blog) => blog.id === blogId);

    if (index === -1) {
      console.error("Blog not found with ID:", blogId);
      return false;
    }

    // Remove the blog from the cached array
    cachedBlogs.splice(index, 1);

    // Update the JSON file with the modified data
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(cachedBlogs, null, 2),
      "utf-8"
    );

    // Update the cachedBlogs variable in memory
    await initializeBlogs();

    return true;
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return false;
  }
}
