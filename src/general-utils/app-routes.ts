import { Blog, BlogTag } from "@/types/blog-types";
import {
  urlNameToUsername,
  usernameToUrl
} from "./usersFunctions";

// Accounts
export const signoutPageLink = "/api/auth/signout";
export const signinPageLink = "/api/auth/signin";
export const registerPageLink = "/register?actionType=register";
export const updateAccountPageLink = "/register?actionType=update";

export const aboutMeImageSrc = "/images/creator/about-me-image.png";
export const guestUserImageSrc = "/images/userImages/guest-user.png";

export const blogsLinkByPage = (pageCount: number) =>
  `/blogs?page=${pageCount}`;
export const blogsLinkByTag = (tag: BlogTag) =>
  `/blogs?tag=${tag.toLowerCase()}`;
export const blogLinkByBlog = (blogSelected: Blog) => {
  const blogDate = new Date(blogSelected.creationDate);
  return `/blogs/${blogDate.getFullYear()}/${
    blogDate.getMonth() + 1
  }/${blogDate.getDate()}/${urlNameToUsername(blogSelected.title)}`;
};
export const blogsLinkBySearch = (textSearch: string) =>
  `/blogs/?search=${textSearch}`;
export const blogCommentsLinkByBlog = (blogSelected: Blog) =>
  blogLinkByBlog(blogSelected) + "#comments";

export const authorNamePageLink = (authorName: string) =>
  `/authors/${usernameToUrl(authorName)}`;

export const aboutPageLink = "/about";
export const blogsPageLink = "/blogs";

export const createBlogPageLink = (blogId?: string) =>
  blogId ? `/create-blog?actionType=update&blog=${blogId}` : "/create-blog";

export const contactPageLink = "/contact";
