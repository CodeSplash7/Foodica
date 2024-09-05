import UserBadge from "./UserBadge";
import LoginWidget from "./LoginWidget";
import SocialWidget from "./SocialWidget";
import React from "react";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <div className="w-full relative">
      <div className="z-0 bg-[#fafafa] border-b-[1px] absolute h-[56px] inset-x-[-32px] top-0 bottom-0 " />
      <div className="z-20 w-full relative h-[56px] flex justify-between items-center">
        <LoginWidget session={session} />
        <UserBadge session={session} />
        <SocialWidget />
      </div>
    </div>
  );
}
