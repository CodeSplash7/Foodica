import { Link as LinkType } from "@/utils/allSides/linksFunctions";
import Link from "next/link";
import LinkWithDropdown from "./LinkWithDropdown";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: ["400", "600"],
  subsets: ["latin"]
});

export const LINK_STYLES_CLASS = "hover:text-[#818592] transition duration-150";

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
        href={`/blogs?t=${link.href}`}
        className={`${LINK_STYLES_CLASS} ${roboto_condensed.className} text-[12px] px-[15px] py-[10px] border-x border-t last:border-b font-bold tracking-wider`}
      >
        {link.label.toUpperCase()}
      </Link>
    );
}
