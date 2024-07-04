"use client";
import { useSearchParams } from "next/navigation";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default function MessageAboveBlogs({ msg }: { msg?: string }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const tag = searchParams.get("t");
  const page = searchParams.get("p");
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
