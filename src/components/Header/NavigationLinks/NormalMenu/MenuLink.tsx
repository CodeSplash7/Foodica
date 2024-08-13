import { Link as LinkType } from "@/utils/allSides/linksFunctions";
import Link from "next/link";
import LinkWithDropdown from "./LinkWithDropdown";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: ["400", "600"],
  subsets: ["latin"]
});

export const LINK_STYLES_CLASS =
  "relative inline-block before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:bg-[#fd6595] before:origin-bottom-right before:scale-x-0 before:transition-transform before:duration-500 hover:before:origin-bottom-left hover:before:scale-x-100";

export default function MenuLink({
  link,
  miniLink
}: {
  link: LinkType;
  miniLink?: boolean;
}) {
  if (link.links) return <LinkWithDropdown link={link} />;
  if (!link.links && !miniLink)
    return (
      <Link
        href={link.href}
        className={`${LINK_STYLES_CLASS} ${roboto_condensed.className} `}
      >
        {link.label.toUpperCase()}
      </Link>
    );
  if (!link.links && miniLink)
    return (
      <Link
        href={link.href}
        className={`${LINK_STYLES_CLASS} ${roboto_condensed.className} text-[12px] px-[15px] py-[10px] border-x border-t last:border-b font-bold tracking-wider`}
      >
        {link.label.toUpperCase()}
      </Link>
    );
}
