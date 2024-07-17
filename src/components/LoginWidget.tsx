import { Session } from "next-auth";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed_600 = Roboto_Condensed({
  weight: "900",
  subsets: ["latin"]
});

export default async function LoginWidget({
  session
}: {
  session: Session | null;
}) {
  const linkStyle = `hover:text-[#818592] font-bold transition duration-150 ${roboto_condensed_600.className}`;
  return (
    <div
      className={`absolute left-0 bottom-0 translate-y-[100%] md:flex flex flex-col text-slate-800 text-[12px] font-medium gap-[4px]`}
    >
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
