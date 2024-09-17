import { filterSelectedBlogs } from "@/general-utils/blogsFunctions";
import { Blog, BlogListFilters } from "@/types/blog-types";
import { useMemo } from "react";

export default function useFilteredBlogs(
  blogs: Blog[] | "loading",
  filters: BlogListFilters
) {
  const selectedBlogs = useMemo(() => {
    if (blogs === "loading" || !blogs.length) return [];
    return filterSelectedBlogs(blogs, ...filters);
  }, [filters, blogs]);

  return selectedBlogs;
}
