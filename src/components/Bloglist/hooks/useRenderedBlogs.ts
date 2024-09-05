import { getNthDivision } from "@/general-utils/blogsFunctions";
import { Blog } from "@/types/blog-types";
import { useMemo } from "react";

const blogPageSize = 4;
export default function useRenderedBlogs(
  page: string | undefined,
  filteredBlogs: Blog[]
) {
  const onePageForAll = !page;
  const currentPage = Number(page) || 1;

  const renderedBlogs = useMemo(
    () =>
      getNthDivision(
        filteredBlogs,
        currentPage || 1,
        onePageForAll ? 9999 : blogPageSize
      ),
    [filteredBlogs]
  );

  return { renderedBlogs, onePageForAll, currentPage };
}
