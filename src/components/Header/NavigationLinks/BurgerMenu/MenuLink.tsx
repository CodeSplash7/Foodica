// components/MenuLink.js
import { Link as LinkType } from "@/utils/allSides/linksFunctions";
import Link from "next/link";
import LinkWithDropdown from "./LinkWithDropdown";
import { Roboto_Condensed } from "next/font/google";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function MenuLink({
  setIsMenuOpen,
  isMenuOpen,
  link,
  miniLink
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  link: LinkType;
  miniLink?: boolean;
}) {
  const isDropdownLink = !!link.links;
  const isNormalLink = !link.links && !miniLink;
  const isMinilink = !link.links && miniLink;

  const onClick = (e: Event) => {
    setIsMenuOpen?.(false);
  };

  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const linkElement = linkRef.current;
    if (linkElement) {
      linkElement.addEventListener("click", onClick);
    }
    return () => {
      if (linkElement) {
        linkElement.removeEventListener("click", onClick);
      }
    };
  }, [linkRef]);

  if (isDropdownLink)
    return (
      <LinkWithDropdown
        ref={linkRef}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        link={link}
      />
    );
  if (isNormalLink)
    return (
      <Link
        ref={linkRef}
        href={link.href}
        className={`hover:text-[#818592] transition duration-150 ${roboto_condensed.className} border-b last:border-none border-[#e2e2e2] w-full pt-[16px]`}
      >
        {link.label}
      </Link>
    );
  if (isMinilink)
    return (
      <Link
        ref={linkRef}
        href={link.href}
        className={`hover:text-[#818592] transition duration-150 ${roboto_condensed.className} border-b border-[#e2e2e2] w-full pt-[16px]`}
      >
        {link.label}
      </Link>
    );
}
