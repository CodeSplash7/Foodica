"use client"

import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  openSearchBar,
  closeSearchBar,
  setTextSearch
} from "@/store/pageHeaderSlice";
import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

export default function Searchbar() {
  const dispatch = useAppDispatch();

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(handleClickOutside, [dispatch]);

  const router = useRouter();
  // State variables
  const isSearchBarOpen = useAppSelector(
    (state) => state.pageHeader.searchbar.isOpen
  );
  const textSearch = useAppSelector(
    (state) => state.pageHeader.searchbar.textSearch
  );

  // Functions
  function handleOpenSearchbar() {
    return isSearchBarOpen
      ? dispatch(closeSearchBar())
      : dispatch(openSearchBar());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchBlogs();
    }
  }

  function searchBlogs() {
    router.replace(`/blogs/?s=${textSearch}`);
  }

  function handleClickOutside() {
    const innerHandleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        dispatch(closeSearchBar());
      }
    };

    document.addEventListener("click", innerHandleClickOutside);

    return () => {
      document.removeEventListener("click", innerHandleClickOutside);
    };
  }

  return (
    <div ref={divRef} className="flex relative group">
      <div
        className={`z-0 absolute rounded-full bg-[#818592] h-full ps-[16px] flex items-center justify-start overflow-hidden transition-all duration-200 right-0 ${
          isSearchBarOpen ? "w-[248px]" : "w-full"
        }`}
      >
        <input
          placeholder="Enter your keywords..."
          className="bg-transparent placeholder:text-[#eff4f7] text-white outline-none text-[16px]"
          value={textSearch}
          onChange={(e) => dispatch(setTextSearch(e.target.value))}
          onKeyDown={handleKeyDown}
        />
      </div>
      <svg
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-50"
        onClick={handleOpenSearchbar}
      >
        <circle
          cx="25"
          cy="25"
          r="25"
          className={`${
            isSearchBarOpen ? "fill-red-[#818592]" : "fill-[#363940]"
          } group-hover:fill-[#818592] transition duration-200`}
        />
        <path
          d="M23.5 30C27.0899 30 30 27.0899 30 23.5C30 19.9101 27.0899 17 23.5 17C19.9101 17 17 19.9101 17 23.5C17 27.0899 19.9101 30 23.5 30Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 34L29 29"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
