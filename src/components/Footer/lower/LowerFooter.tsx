import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { getMainLinks } from "@/general-utils/linksFunctions";
const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function LowerFooter() {
  const links = getMainLinks();
  return (
    <div className="w-full pt-[32px] h-fit flex items-center">
      <div
        className={`relative w-full py-[32px] h-fit flex justify-center items-center gap-x-[32px] gap-y-[16px] 
                   flex-wrap`}
      >
        <div className="z-0 absolute h-full inset-x-[-32px] bg-slate-200" />
        {links.map((link) => (
          <Link
            key={link.id}
            className={`relative z-10 duration-150 transition hover:text-slate-500 
                        ${roboto_condensed.className} text-slate-700`}
            href={link.href}
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
