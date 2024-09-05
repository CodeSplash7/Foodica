
import { blogLinkByBlog } from "@/general-utils/app-routes";
import { Blog } from "@/types/blog-types";
import { Roboto_Condensed } from "next/font/google";
import Link from "next/link";

const roboto_condensed_700 = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"],
  display: "swap"
});

export default function ClickableTitle({
  blog,
  label,
  children,
  type,
  addStyles,
  contrast
}: {
  contrast?: boolean;
  blog: Blog | "loading";
  type: "button" | "text" | "other";
  label?: string;
  children?: React.ReactNode;
  addStyles?: string;
}) {
  if (blog === "loading") return <div>{children}</div>;
  const href = blogLinkByBlog(blog);

  if (type === "text")
    return (
      <Link
        href={href}
        className={`relative 
        before:absolute before:top-0 before:bottom-0 before:left-[-8px] before:w-[2px] before:bg-[#fc2f70] before:scale-y-0 before:origin-top 
        hover:before:origin-bottom hover:before:scale-y-100 
        before:transition-transform before:duration-300 before:ease-linear 
        after:absolute after:top-0 after:bottom-0 after:right-[-8px] after:w-[2px] after:bg-[#fc2f70] after:scale-y-0 after:origin-bottom 
        hover:after:origin-top hover:after:scale-y-100 after:transition-transform after:duration-300 after:ease-linear 
        font-bold 
        ${addStyles}
      transition duration-150 `}
      >
        {children ? children : label ? label : blog.title}
      </Link>
    );

  if (type === "button")
    return (
      <Link href={href} className={`${addStyles}`}>
        <div className="relative inline-block cursor-pointer outline-none border-none bg-transparent p-0 text-inherit font-inherit w-48 h-auto group">
          <span
            className={`relative block w-12 h-12 ${
              contrast ? "bg-white" : "bg-[#363940]"
            } rounded-[1.625rem] transition-all duration-500 ease-out group-hover:w-full`}
            aria-hidden="true"
          >
            <span className="absolute top-0 bottom-0 m-auto left-2.5 w-[1.125rem] h-[0.125rem] bg-none transition-all duration-500 ease-out group-hover:translate-x-4">
              <span
                className={`absolute top-[-0.29rem] right-[0.0625rem] w-[0.625rem] h-[0.625rem] border-t-[0.125rem] border-r-[0.125rem] ${
                  contrast ? "border-[#363940]" : "border-white"
                } rotate-45`}
              ></span>
            </span>
          </span>
          <span
            className={`${
              roboto_condensed_700.className
            } absolute inset-0 py-3 ml-[1.85rem] text-center ${
              contrast ? "text-white" : "text-[#363940]"
            } font-bold leading-6 uppercase transition-all duration-500 ease-out ${
              contrast ? "group-hover:text-[#363940]" : "group-hover:text-white"
            }`}
          >
            {children ? children : label ? label : blog.title}
          </span>
        </div>
      </Link>
    );
  if (type === "other") {
    return (
      <Link className={addStyles} href={href}>
        {children}
      </Link>
    );
  }
}
