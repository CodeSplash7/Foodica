import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

import ClickableTitle from "./ClickableTitle";
import { getRecentBlogs } from "@/utils/serverside/blogsFunctions";
import { formatCreationDate } from "@/utils/general-utils";
import AwaitableImage from "./AwaitableImage";

export default function Sidebar() {
  return (
    <div className={`flex flex-col gap-[64px] md:basis-[200px]`}>
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
        className={`h-fit w-full [letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
      >
        ABOUT ME
      </div>
      <div className="relative w-full sm:w-1/2 md:w-full h-[70vw] sm:h-[184px]">
        <AwaitableImage
          fallBackStyles="h-full w-full absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center"
          alt="about me image"
          src="/images/creator/about-me-image.png"
          width={400}
          height={400}
          className={`w-full h-full transition duration-300`}
        />
      </div>
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
      <SocialLinks />
    </div>
  );
}

async function RecentBlogsSection({ count }: { count: number }) {
  const recentBlogs = await getRecentBlogs(count);
  return (
    <div className={`gap-[16px] w-full flex flex-col`}>
      <div
        className={`[letter-spacing:1.2px] ${roboto_condensed.className} text-[18px] font-bold`}
      >
        RECENT POSTS
      </div>
      <div className={`gap-[24px] w-full h-fit flex flex-col`}>
        {recentBlogs.map((blog) => (
          <ClickableTitle
            type={"other"}
            blog={blog}
            key={blog.id}
            addStyles="flex flex-row gap-[16px] w-full"
          >
            <div className="relative">
              <AwaitableImage
                fallBackStyles="text-[10px] w-[72px] h-[48px] absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center"
                className={`transition duration-300 w-[72px] h-[48px] [object-fit:cover]`}
                alt="blog image"
                src={blog.picture?.url || ""}
                width={100}
                height={100}
              />
            </div>
            <div className={`flex flex-col w-full`}>
              <div
                className={`w-full hover:text-[#818592] transition duration-150 font-bold [line-height:1.3] text-[16px]`}
              >
                {blog.title}
              </div>
              <div
                className={`w-full text-[14px] font-thin [letter-spacing:.5px] text-[#acacac]`}
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

const socialLinks = [
  {
    href: "#",
    className: "containerOne",
    svgClassName: "instagramSvg",
    viewBox: "0 0 16 16",
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
  },
  {
    href: "#",
    className: "containerTwo",
    svgClassName: "twitterSvg",
    viewBox: "0 0 16 16",
    path: "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
  },
  {
    href: "#",
    className: "containerThree",
    svgClassName: "linkdinSvg",
    viewBox: "0 0 448 512",
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
  },
  {
    href: "#",
    className: "containerFour",
    svgClassName: "facebookSvg",
    viewBox: "0 0 48 48",
    path: "M29,3c-5.523,0-10,4.477-10,10v5h-6v8h6v19h8V26h7l1-8h-8v-4c0-2.209,1.791-4,4-4h4V3.322 C33.091,3.125,30.921,2.996,29,3L29,3z"
  },
  {
    href: "#",
    className: "containerFive",
    svgClassName: "githubSvg",
    viewBox: "-2.5 0 19 19",
    path: "M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"
  }
];

const SocialLinks = () => (
  <div className="card2">
    {socialLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        className={`socialContainer ${link.className}`}
      >
        <svg
          className={`socialSvg ${link.svgClassName}`}
          viewBox={link.viewBox}
        >
          <path d={link.path}></path>
        </svg>
      </a>
    ))}
  </div>
);
