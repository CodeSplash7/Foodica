import { filterSelectedBlogs } from "@/general-utils/blogsFunctions";
import { Blog, BlogListFilters } from "@/types/blog-types";
import { useMemo } from "react";

export default function useFilteredBlogs(
  blogs: Blog[],
  filters: BlogListFilters
) {
  if (!blogs.length) return [];
  let selectedBlogs: Blog[] = [];
  selectedBlogs = useMemo(
    () => filterSelectedBlogs(blogs, ...filters),
    [filters]
  );

  return selectedBlogs;
}
