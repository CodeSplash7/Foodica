import Link from "next/link";
import { useAppSelector } from "@/store/store";

export default function LowerFooter() {
  const links = useAppSelector((state) =>
    state.pageHeader.navigationMenu.links.filter((link) => !link.isContained)
  );

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
                      [font-family:'Roboto_Condensed',sans-serif] text-slate-700 
                      z-20 `}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
