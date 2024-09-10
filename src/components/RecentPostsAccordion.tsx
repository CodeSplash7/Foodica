"use client";

import { Blog } from "@/types/blog-types";
import { useState } from "react";
import ClickableName from "./ClickableName";
import BlogPostCard from "./BlogPostCard";

export default function RecentPostsAccordion({
  blogs,
  username
}: {
  blogs: Blog[];
  username: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-md flex items-center"
      >
        <AccordionArrow isOpen={isOpen} />
        <span className="ml-2">See recent posts</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[280px]" : "max-h-0"
        }`}
      >
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-2 h-60">
            {blogs.slice(0, 3).map((blog) => (
              <BlogPostCard key={blog.id} blog={blog} />
            ))}
            <div className="relative w-full h-full group overflow-hidden bg-gray-100 flex items-center justify-center">
              <ClickableName
                label="See all blogs"
                addStyles="text-lg font-semibold text-center"
              >
                {username}
              </ClickableName>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionArrowProps {
  isOpen: boolean;
}

const AccordionArrow: React.FC<AccordionArrowProps> = ({ isOpen }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
    >
      <path
        d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
