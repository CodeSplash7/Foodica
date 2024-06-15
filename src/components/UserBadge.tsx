import options from "@/app/api/auth/[...nextauth]/options";
import { getUserByEmail } from "@/utils/serverside/userFunctions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function UserBadge() {
  const session = await getServerSession(options);
  const user = await getUserByEmail(session?.user?.email);
  // user image
  const guestUserImageLink = "/images/userImages/guest-user.png";
  const userImageLink = user?.profile.profilePicture?.url;
  // user name
  const guestUsername = "guest user";
  const username = user?.profile.username;
  // user option link
  const guestUserOptionLink = "/register?for=register";
  const userOptionLink = "/register?for=update";
  return (
    <Link href={session ? userOptionLink : guestUserOptionLink}>
      <div className="flex items-center h-full text-slate-800 text-[12px] font-medium gap-[8px]">
        <Image
          className={`h-[32px] w-[32px] [object-fit:cover] rounded-full`}
          width={128}
          height={128}
          alt="user image"
          src={userImageLink || guestUserImageLink}
        />
        <div>{username || guestUsername}</div>
      </div>
    </Link>
  );
}
