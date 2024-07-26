import AwaitableImage from "@/components/AwaitableImage";
import { BlogComment, type Blog } from "@/utils/allSides/blogsFunctions";
import { getUserById } from "@/utils/serverside/userFunctions";
import { Inter } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
import CommentMessage from "./CommentMessage";
import ClickableName from "@/components/ClickableName";
const inter = Inter({
  subsets: ["latin"],
  weight: "600"
});

const inter_bolder = Inter({
  subsets: ["latin"],
  weight: "700"
});

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700"
});

export default async function BlogComments({ blog }: { blog: Blog }) {
  const comments = blog.comments;
  return (
    <div className={`w-full`}>
      <div
        className={`${roboto_condensed.className} text-gray-800 uppercase w-full text-center text-[24px]`}
      >
        {comments.length} comments
      </div>
      <CommentsSeparationLine />
      <div>
        {comments.map((c, i) => (
          <Comment comment={c} commentIndex={i} />
        ))}
      </div>
    </div>
  );
}

async function Comment({
  comment,
  commentIndex
}: {
  commentIndex: number;
  comment: BlogComment;
}) {
  const commenter = await getUserById(comment.userId);
  if (commenter)
    return (
      <div
        id={`comment${commentIndex + 1}`}
        className={`flex flex-col gap-[16px]`}
      >
        <div className={`w-full flex gap-[32px] items-start`}>
          <div className="w-[80px] basis-[80px] relative">
            <AwaitableImage
              src={commenter.profile.profilePicture?.thumbnailUrl!}
              alt="user picture"
              height={256}
              width={256}
              fallBackStyles="rounded-full w-full h-[80px] text-[10px] absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center"
              className={`transition duration-300 w-full h-[80px] [object-fit:cover] rounded-full`}
            />
          </div>
          <div className={`flex flex-col gap-[4px] pt-[4px]`}>
            <ClickableName
              className={`transition duration-150 text-[1.1rem] ${inter.className} text-gray-800 hover:text-gray-500`}
            >
              {commenter.profile.username}
            </ClickableName>
            <div className={`italic text-[.85rem] text-gray-400`}>
              {transformDateString(comment.date)}
            </div>
          </div>
        </div>
        <CommentMessage
          commentIndex={commentIndex + 1}
          message={comment.message}
        />
        <div
          className={`w-fit transition duration-150 hover:text-gray-500 text-gray-700 ${inter_bolder.className}`}
        >
          REPLY
        </div>
        <CommentsSeparationLine />
      </div>
    );
}

function CommentsSeparationLine() {
  return <div className="w-full border-t my-[32px]"></div>;
}

function transformDateString(dateString: string) {
  const date = new Date(dateString);

  // Define arrays for month names and AM/PM
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

  // Get the individual components of the date
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM or PM
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format the date string
  return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}
