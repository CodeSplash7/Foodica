import { Roboto_Condensed } from "next/font/google";
// import { type BlogPageSearchParams } from "@/app/blogs/page";
import { Skeleton } from "@mui/material";
import { BlogPageSearchParams } from "@/page-components/blogs-page";

const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default function MessageAboveBlogs({
  msg,
  searchParams,
  state
}: {
  searchParams: BlogPageSearchParams;
  msg?: string;
  state?: "loading";
}) {
  if (state === "loading")
    return (
      <Skeleton
        variant="text"
        sx={{ fontSize: "18px", letterSpacing: "1.2px", width: "150px" }}
      />
    );
  let [search, tag, page]: (string | undefined)[] = ["", "", ""];
  if (searchParams) {
    search = searchParams.search;
    tag = searchParams.tag;
    page = searchParams.page;
  }
  if (!msg) {
    if (page && !search && !tag) msg = "latest posts";
    if (search) msg = `search results for "${search}"`;
    if (tag) msg = `search results for tag "${tag}"`;
    if (!search && !tag && !page) msg = "all blogs";
  }
  return (
    <div
      className={`[letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
    >
      {msg?.toUpperCase()}
    </div>
  );
}
