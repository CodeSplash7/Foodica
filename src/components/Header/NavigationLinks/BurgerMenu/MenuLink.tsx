import { Link as LinkType } from "@/utils/allSides/linksFunctions";
import Link from "next/link";
import LinkWithDropdown from "./LinkWithDropdown";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function MenuLink({
  link,
  miniLink
}: {
  link: LinkType;
  miniLink?: boolean;
}) {
  const isDropdownLink = !!link.links;
  const isNormalLink = !link.links && !miniLink;
  const isMinilink = !link.links && miniLink;

  if (isDropdownLink) return <LinkWithDropdown link={link} />;
  if (isNormalLink)
    return (
      <Link
        href={link.href}
        className={`hover:text-[#818592] transition duration-150 ${roboto_condensed.className} border-b last:border-none border-[#e2e2e2] w-full pt-[16px]`}
      >
        {link.label}
      </Link>
    );
  if (isMinilink)
    return (
      <Link
        href={`/blogs?t=${link.href}`}
        className={`hover:text-[#818592] transition duration-150 ${roboto_condensed.className} border-b border-[#e2e2e2] w-full pt-[16px]`}
      >
        {link.label}
      </Link>
    );
}
