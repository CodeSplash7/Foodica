import AwaitableImage from "@/components/AwaitableImage";
import ClickableName from "@/components/ClickableName";
import { User } from "@/utils/allSides/usersFunctions";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: "600"
});

export default function CommentHeader({
  commentAuthor,
  commentTimestamp,
  isTopComment
}: {
  commentAuthor: User;
  commentTimestamp: string;
  isTopComment: boolean;
}) {
  return (
    <div
      className={`w-full flex ${
        isTopComment ? "gap-[32px]" : "gap-[16px]"
      } items-start`}
    >
      <div
        className={`relative ${
          isTopComment ? "basis-[80px] h-[80px]" : "basis-[56px] h-[56px]"
        }`}
      >
        <AwaitableImage
          src={commentAuthor.profile.profilePicture?.thumbnailUrl!}
          alt="user picture"
          height={256}
          width={256}
          fallBackStyles="rounded-full w-full h-full text-[10px] absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center"
          className={`transition duration-300 w-full h-full [object-fit:cover] rounded-full`}
        />
      </div>
      <div className={`flex flex-col gap-[4px] pt-[4px]`}>
        <ClickableName
          className={`transition duration-150 ${
            isTopComment ? " text-[1.1rem]" : "text-[.8rem]"
          } ${inter.className} text-gray-800 hover:text-gray-500`}
        >
          {commentAuthor.profile.username}
        </ClickableName>
        <div
          className={`italic text-gray-400 ${
            isTopComment ? "text-[.85rem]" : "text-[.75rem]"
          }`}
        >
          {transformDateString(commentTimestamp)}
        </div>
      </div>
    </div>
  );
}

function transformDateString(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}
