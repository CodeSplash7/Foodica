import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  PinterestIcon,
  YoutubeIcon
} from "./Icons";

import ClickableTitle from "./ClickableTitle";
import { getRecentBlogs } from "@/utils/serverside/blogsFunctions";
import { formatCreationDate } from "@/utils/general-utils";

export default function Sidebar() {
  return (
    // <div className={`basis-[196px] flex flex-col gap-[64px]`}>
    <div className={`flex flex-col gap-[64px] md:w-[200px] w-full`}>
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
    <div className={`flex flex-col gap-[16px] w-full`}>
      <div
        className={`w-full [letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
      >
        ABOUT ME
      </div>
      <Image
        alt="about me image"
        src="/images/creator/about-me-image.png"
        width={400}
        height={400}
        className={`w-full`}
      />
      <div
        className={`text-[#444444] text-[16px] [letter-spacing:.3px] w-full`}
      >
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
      <div
        className={`[letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
      >
        FOLLOW ME
      </div>
      <div className={`flex flex-wrap gap-[16px]`}>
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

async function RecentBlogsSection({ count }: { count: number }) {
  const recentBlogs = await getRecentBlogs(count);
  return (
    <div className={`gap-[16px] flex flex-col`}>
      <div
        className={` [letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
      >
        RECENT POSTS
      </div>
      <div className={`gap-[24px] h-fit flex flex-col`}>
        {recentBlogs.map((blog) => (
          <ClickableTitle blog={blog} key={blog.id} className="flex gap-[16px]">
            <Image
              className={`w-[72px] h-[48px] [object-fit:cover]`}
              alt="blog image"
              src={blog.picture?.url || ""}
              width={100}
              height={100}
            />
            <div className={`flex flex-col`}>
              <div
                className={`hover:text-[#818592] transition duration-150 font-bold [line-height:1.3] text-[16px]`}
              >
                {blog.title}
              </div>
              <div
                className={`text-[14px] font-thin [letter-spacing:.5px] text-[#acacac]`}
              >
                {formatCreationDate(blog.creationDate)}
              </div>
            </div>
          </ClickableTitle>
        ))}
      </div>
    </div>
  );
}
