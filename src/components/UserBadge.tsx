import { getUserByEmail } from "@/utils/serverside/userFunctions";
import { type Session } from "next-auth";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import AwaitableImage from "./AwaitableImage";

const roboto_condensed_600 = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});
const roboto_condensed_400 = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default async function UserBadge({
  session
}: {
  session: Session | null;
}) {
  const user = await getUserByEmail(session?.user?.email);
  // user image
  const guestUserImageLink = "/images/userImages/guest-user.png";
  const userImageLink = user?.profile.profilePicture?.url;
  // user name
  const guestUsername = "Guest";
  const username = user?.profile.username;
  // user option link
  const guestUserOptionLink = "/register?for=register";
  const userOptionLink = "/register?for=update";
  return (
    <Link href={session ? userOptionLink : guestUserOptionLink}>
      <div
        title={"See profile"}
        className="w-fit flex items-center h-full text-slate-800 text-[12px] transition duration-150 font-medium gap-[8px] rounded-md hover:bg-[#e4e4e4] px-[8px] py-[4px]"
      >
        <div className="relative h-[32px] w-[40px] ">
          <AwaitableImage
            loadingSkeletonLayout={{width: "100%", height: "100%", borderRadius: "100%"}}
            className={`transition duration-300 h-full w-full [object-fit:cover] rounded-full`}
            width={128}
            height={128}
            alt="user image"
            src={userImageLink || guestUserImageLink}
          />
        </div>
        <div className={`text-[20px] text-[#dfdfdf]`}>|</div>
        <div className={`flex flex-col justify-between`}>
          <div
            className={`${roboto_condensed_400.className} text-[10px] text-[#222222]`}
          >
            Welcome {session && " back"},
          </div>
          <div
            className={`${roboto_condensed_600.className} font-bold text-[14px]`}
          >
            {username || guestUsername}👋
          </div>
        </div>
      </div>
    </Link>
  );
}
