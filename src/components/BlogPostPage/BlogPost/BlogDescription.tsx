import AwaitableImage from "@/components/AwaitableImage";
import ClickableName from "@/components/ClickableName";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { User } from "@/utils/allSides/usersFunctions";
import { Inter } from "next/font/google";
const inter_600 = Inter({
  weight: "600",
  subsets: ["latin"]
});
const inter_300 = Inter({
  weight: "300",
  subsets: ["latin"]
});

export default async function BlogDescription({
  blog,
  authorUser
}: {
  blog: Blog;
  authorUser: User | null;
}) {
  return (
    <div className={`flex border-y-2 py-[32px] px-[16px] gap-[24px]`}>
      <div className="basis-[80px] relative">
        <AwaitableImage
          src={authorUser?.profile.profilePicture?.url!}
          alt="user picture"
          height={256}
          width={256}
          fallBackStyles="rounded-full w-full h-[80px] text-[10px] absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center"
          className={`transition duration-300 w-full h-[80px] [object-fit:cover] rounded-full`}
        />
      </div>
      <div className={`flex-1 flex flex-col gap-[12px] `}>
        <ClickableName
          className={`transition duration-150 text-gray-800 hover:text-gray-500 ${inter_600.className} text-[1.2rem]`}
        >
          {blog.author}
        </ClickableName>
        <div
          className={`leading-7 text-gray-700 [word-break:break-all] [overflow-wrap:break-word] ${inter_300.className}`}
        >
          {blog.description}
        </div>
      </div>
    </div>
  );
}
