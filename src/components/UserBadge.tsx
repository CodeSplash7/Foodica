import options from "@/app/api/auth/[...nextauth]/options";
import { getUserByEmail } from "@/utils/serverside/userFunctions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: ["400", "600"],
  subsets: ["latin"]
});

export default async function UserBadge() {
  const session = await getServerSession(options);
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
        className="flex items-center h-full text-slate-800 text-[12px] transition duration-150 font-medium gap-[8px] rounded-md hover:bg-[#e4e4e4] px-[8px] py-[4px]"
      >
        <Image
          className={`h-[32px] w-[40px] [object-fit:cover] rounded-full`}
          width={128}
          height={128}
          alt="user image"
          src={userImageLink || guestUserImageLink}
        />
        <div className={`text-[20px] text-[#dfdfdf]`}>|</div>
        <div className={`flex flex-col justify-between`}>
          <div
            className={`${roboto_condensed.className} text-[10px] text-[#222222]`}
          >
            Welcome{session && " back"},
          </div>
          <div
            className={`${roboto_condensed.className} font-bold text-[14px]`}
          >
            {username || guestUsername}👋
          </div>
        </div>
      </div>
    </Link>
  );
}
