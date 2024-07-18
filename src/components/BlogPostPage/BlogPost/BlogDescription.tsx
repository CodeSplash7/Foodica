import AwaitableImage from "@/components/AwaitableImage";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { Inter } from "next/font/google";
const inter_600 = Inter({
  weight: "600",
  subsets: ["latin"]
});
const inter_300 = Inter({
  weight: "300",
  subsets: ["latin"]
});

export default function BlogDescription({ blog }: { blog: Blog }) {
  return (
    <div className={`flex border-y-2 py-[32px] px-[16px] gap-[24px]`}>
      {/* <AwaitableImage /> */}Awaitable Image
      <div className={`flex flex-col gap-[16px] `}>
        <div className={`${inter_600.className} text-[1.2rem]`}>
          Author name
        </div>
        <div
          className={`leading-[30px] tracking-[0.4px] ${inter_300.className}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quidem
          fuga ratione ducimus ex nisi, rem reiciendis porro neque eveniet
          voluptant quibusdam itaque ab
          cumque enim est doloremque laborum aut. Iusto odit, id velit sint
          eaque laudantium rem ducimus aliquid assumenda tenetur. Beatae maxime
          eaque non.
        </div>
      </div>
    </div>
  );
}
