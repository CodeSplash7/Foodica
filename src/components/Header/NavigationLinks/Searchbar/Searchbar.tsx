"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { blogsLinkBySearch } from "@/general-utils/app-routes";

export default function Searchbar() {
  const router = useRouter();
  const [textSearch, setTextSearch] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchBlogs();
    }
  }

  function searchBlogs() {
    router.replace(blogsLinkBySearch(textSearch));
  }

  return (
    <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#363940] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
      <div className="flex items-center justify-center fill-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Isolation_Mode"
          data-name="Isolation Mode"
          viewBox="0 0 24 24"
          width="22"
          height="22"
        >
          <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
        </svg>
      </div>
      <input
        type="text"
        className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
