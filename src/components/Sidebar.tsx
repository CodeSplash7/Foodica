"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  PinterestIcon,
  YoutubeIcon
} from "./Icons";

import { formatCreationDate } from "@/app/HighlightedBlog";
import { useAppSelector } from "@/store/store";

export default function Sidebar() {
  return (
    <div className={`flex-1 flex flex-col gap-[64px]`}>
      <AboutMeSection />
      <SectionDivider />
      <FollowMeSection />
      <SectionDivider />
      <RecentBlogsSection count={4} />
    </div>
  );
}

function SectionDivider() {
  return <div className={`border-t-2 w-1/3 self-center`}></div>;
}

function AboutMeSection() {
  return (
    <div className={`flex flex-col gap-[16px]`}>
      <div
        className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
      >
        ABOUT ME
      </div>
      <Image
        alt="about me image"
        src="/about-me-image.png"
        width={400}
        height={400}
      />
      <div className={`text-[#444444] text-[16px] [letter-spacing:.3px]`}>
        Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam quis risus
        eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
      </div>
    </div>
  );
}

function FollowMeSection() {
  return (
    <div className={`flex flex-wrap flex-col gap-[16px]`}>
      <div className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}>
        FOLLOW ME
      </div>
      <div className={`flex gap-[16px]`}>
        <Link href="https://www.facebook.com/profile.php?id=100058719204557">
          <FacebookIcon w="36" />
        </Link>
        <Link href="">
          <XIcon w="36" />
        </Link>
        <Link href="https://www.instagram.com/roscarares007/?next=%2F">
          <InstagramIcon w="36" />
        </Link>
        <Link href="">
          <PinterestIcon w="36" />
        </Link>
        <Link href="">
          <YoutubeIcon w="36" />
        </Link>
      </div>
    </div>
  );
}

function RecentBlogsSection({ count }: { count: number }) {
  const recentBlogs = getRecentBlogs(count);
  return (
    <div className={`gap-[16px] flex flex-col`}>
      <div className={` [letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}>
        RECENT POSTS
      </div>
      <div className={`gap-[24px] h-fit flex flex-col`}>
        {recentBlogs.map((blog) => (
          <div key={blog.id} className="flex gap-[16px]">
            <Image
              className={`w-[72px] h-[48px] [object-fit:cover`}
              alt="blog image"
              src={"/" + blog.image.src}
              width={blog.image.width}
              height={blog.image.height}
            />
            <div className={`flex flex-col`}>
              <div className={`hover:text-[#818592] transition duration-150 font-bold [line-height:1.3] text-[16px]`}>
                {blog.title}
              </div>
              <div className={`text-[14px] font-thin [letter-spacing:.5px] text-[#acacac]`}>
                {formatCreationDate(blog.creationDate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRecentBlogs(count: number) {
  const blogs = useAppSelector((state) => state.blogs.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.creationDate).getTime();
    const dateB = new Date(b.creationDate).getTime();
    return dateB - dateA;
  });

  return sortedBlogs.slice(0, count);
}
