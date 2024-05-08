import Link from "next/link";
import { getMainLinks } from "@/utils/allSides/linksFunctions";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function LowerFooter() {
  const links = getMainLinks();
  return (
    <div
      className={`flex justify-center gap-[32px] 
                  relative mt-[32px] py-[48px] h-fit`}
    >
      <div
        className={`z-10 top-0 absolute 
                    w-screen h-full bg-slate-100`}
      ></div>
      {links.map((link) => (
        <Link
          key={link.id}
          className={`duration-150 transition hover:text-slate-500 
                      ${roboto_condensed.className} text-slate-700 
                      z-20 `}
          href={link.href}
        >
          {link.label.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
