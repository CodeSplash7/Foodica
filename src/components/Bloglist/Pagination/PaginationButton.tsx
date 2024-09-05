import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { blogsLinkByPage } from "@/general-utils/app-routes";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function PaginationButton({
  btn,
  isActive
}: {
  btn: number | null;
  isActive: boolean;
}) {
  return (
    <Link
      href={!!btn ? blogsLinkByPage(btn) : "/"}
      className={`bg-white h-fit
                    border ${
                      isActive ? "border-[#c7c9cf]" : "border-transparent"
                    } hover:border-[#888888] rounded-[3px] 
                    text-[#525252] hover:text-black ${
                      roboto_condensed.className
                    } text-[14px] sm:text-[18px] ${
        btn ? "tracking-[2px]" : "tracking-[-1px]"
      } 
                    py-[6px] sm:py-[6px] px-[10px] sm:px-[12px] flex items-center justify-center
                    transition duration-200
                    ${!btn && "pointer-events-none"}`}
    >
      {btn ? btn : "..."}
    </Link>
  );
}
