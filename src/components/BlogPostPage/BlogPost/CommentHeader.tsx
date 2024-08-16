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
          addStyles={`${isTopComment ? " text-[1.1rem]" : "text-[.8rem]"} ${
            inter.className
          } `}
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
