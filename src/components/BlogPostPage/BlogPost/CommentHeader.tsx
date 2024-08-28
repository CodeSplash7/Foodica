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
  isReply
}: {
  commentAuthor: User;
  commentTimestamp: string;
  isReply?: boolean;
}) {
  return (
    <div
      className={`w-full flex ${
        isReply ? "gap-[16px]" : "gap-[32px]"
      } items-start`}
    >
      <div
        className={`relative ${
          isReply ? "basis-[56px] h-[56px]" : "basis-[80px] h-[80px]"
        }`}
      >
        <AwaitableImage
          src={
            commentAuthor.profile.profilePicture?.thumbnailUrl! ??
            "/images/userImages/guest-user.png"
          }
          alt="user picture"
          height={256}
          width={256}
          loadingSkeletonLayout={{
            width: "100%",
            height: "100%",
            borderRadius: "100%"
          }}
          className={`transition duration-300 w-full h-full [object-fit:cover] rounded-full`}
        />
      </div>
      <div className={`flex flex-col gap-[4px] pt-[4px]`}>
        <ClickableName
          addStyles={`${isReply ? "text-[.8rem]" : "text-[1.1rem]"} ${
            inter.className
          } `}
        >
          {commentAuthor.profile.username}
        </ClickableName>
        <div
          className={`italic text-gray-400 ${
            isReply ? "text-[.75rem]" : "text-[.85rem]"
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
