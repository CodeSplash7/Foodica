import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function LoginWidget() {
  const session = await getServerSession(options);
  const linkStyle = "hover:text-[#818592] font-bold transition duration-150";
  return (
    <div className="absolute left-0 bottom-0 translate-y-[100%] md:flex flex flex-col text-slate-800 text-[12px] font-medium gap-[8px]">
      {session ? (
        <Link className={linkStyle} href="/api/auth/signout">
          SIGN OUT
        </Link>
      ) : (
        <>
          <Link className={linkStyle} href="/api/auth/signin">
            SIGN IN
          </Link>
          <Link className={linkStyle} href="/register">
            REGISTER
          </Link>
        </>
      )}
    </div>
  );
}
