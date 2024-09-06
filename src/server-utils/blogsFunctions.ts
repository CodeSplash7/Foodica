"use server";

import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { BlogComment, Blog, BlogTag, BlogReply } from "@/types/blog-types";
import crypto from "crypto";
import { addBlogToUser } from "./userFunctions";
import { blogLinkByBlog } from "@/general-utils/app-routes";
import { getDivisions } from "@/general-utils/blogsFunctions";

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
  sourceBlogId: string,
  tag: string,
  count: number
) => Promise<Blog[]> = async (sourceBlogId, tag, count) => {
  await initializeBlogs();
  let result: Blog[] = [];
  cachedBlogs.forEach((b) => {
    if (result.length > count - 1 || b.id === sourceBlogId) return;
    if (b.mainTag === tag) result.push(b);
  });
  if (result.length < count) {
    cachedBlogs.forEach((b) => {
      if (result.length > 2 || b.id === sourceBlogId) return;
      if (b.secondaryTags.includes(tag as BlogTag)) result.push(b);
    });
  }
  return result;
};

export async function redirectToCorrectBlog(blogSelected: Blog) {
  redirect(blogLinkByBlog(blogSelected));
}

export async function checkForBlogName(possibleName: string) {
  await initializeBlogs();
  const blogSelected = cachedBlogs.find(
    (blog) => blog.title.toLowerCase().split(" ").join("-") === possibleName
  );
  if (blogSelected) {
    return blogSelected;
  }
}

export async function addCommentToBlog(
  postId: string,
  userId: string,
  content: string
) {
  await initializeBlogs();
  const blog = await getBlogById(postId);
  if (!blog) {
    return {
      ok: false,
      error: "Couldn't find the blog in the database.",
      res: undefined
    };
  }
  const newComment: BlogComment = {
    id: crypto.randomBytes(16).toString("hex"),
    postId,
    userId,
    content,
    timestamp: new Date().toString(),
    replies: []
  };

  blog.comments.push(newComment);
  updateDb();
  return { ok: true, error: null, res: newComment };
}

export async function createReply(
  replyContent: string,
  commentId: string,
  userId: string
) {
  await initializeBlogs();

  const allBlogs = await getBlogs();
  let commentBlog: Blog | undefined;
  let comment: BlogComment | undefined;
  allBlogs.forEach((b) =>
    b.comments.forEach((c) => {
      if (c.id === commentId) {
        comment = c;
        commentBlog = b;
      }
    })
  );
  if (comment === undefined) return { res: null, error: "Comment not found" };
  if (!commentBlog) return { res: null, error: "Comment not found" };

  const newReply: BlogReply = {
    content: replyContent,
    id: crypto.randomBytes(16).toString("hex"),
    parentId: commentId,
    postId: commentBlog.id,
    timestamp: new Date().toString(),
    userId
  };

  comment.replies.push(newReply);
  commentBlog.comments = commentBlog.comments.map((c) =>
    c.id === comment!.id ? comment! : c
  );
  cachedBlogs = cachedBlogs.map((b) =>
    b.id === commentBlog!.id ? commentBlog! : b
  );
  updateDb();
  return { res: newReply, error: null };
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
export async function replaceAuthorName(blogId: string, newAuthorName: string) {
  await initializeBlogs();
  const blog = await getBlogById(blogId);
  if (!blog) return { ok: false, error: "Blog id is invalid" };
  blog.author = newAuthorName;
  setCache(cachedBlogs.map((b) => (b.id === blog.id ? blog : b)));
  updateDb();
  return { ok: true, error: null };
}
