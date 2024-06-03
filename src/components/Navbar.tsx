"use server";

import Link from "next/link";
import { FacebookIcon, InstagramIcon, XIcon, PinterestIcon } from "./Icons";

import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <div className="w-full">
      <div className="z-0 bg-[#fafafa] border-b-[1px] absolute left-0 top-0 w-screen h-[56px] flex"></div>

      <div className="z-10 w-full relative h-[56px] flex justify-between items-center">
        <div className="absolute left-0 bottom-0 translate-y-[100%] md:flex flex flex-col text-slate-800 text-[12px] font-medium gap-[8px]">
          {session ? (
            <Link
              className="hover:text-[#818592] font-bold transition duration-150"
              href="/api/auth/signout"
            >
              SIGN OUT
            </Link>
          ) : (
            <>
              <Link
                className="hover:text-[#818592] font-bold transition duration-150"
                href="/api/auth/signin"
              >
                SIGN IN
              </Link>
              <Link
                className="hover:text-[#818592] font-bold transition duration-150"
                href="/register"
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
        <Link href="/register?for=update">
          <div className="flex items-center h-full text-slate-800 text-[12px] font-medium gap-[8px]">
            <Image
              className={`h-[32px] w-[32px] [object-fit:cover] rounded-full`}
              width={128}
              height={128}
              alt="user image"
              src={session?.user?.image || "/images/userImages/guest-user.png"}
            />
            <div>{session ? session.user?.name : "guest user"}</div>
          </div>
        </Link>

        <div className="flex gap-[16px]">
          <Link href="https://www.facebook.com/profile.php?id=100058719204557">
            <FacebookIcon w="24" />
          </Link>
          <Link href="">
            <XIcon w="24" />
          </Link>
          <Link href="https://www.instagram.com/roscarares007/?next=%2F">
            <InstagramIcon w="24" />
          </Link>
          <Link href="">
            <PinterestIcon w="24" />
          </Link>
        </div>
      </div>
    </div>
  );
}
