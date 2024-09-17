import { Link as LinkType } from "@/types/link-types";
import Link from "next/link";
import LinkWithDropdown from "./LinkWithDropdown";
import { Roboto_Condensed } from "next/font/google";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export const LINK_STYLES_CLASS =
  "border-b border-[#e2e2e2] w-full pt-[16px] relative inline-block before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:bg-[#fd6595] before:origin-bottom-right before:scale-x-0 before:transition-transform before:duration-500 hover:before:origin-bottom-left hover:before:scale-x-100";

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

  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onClick = () => {
      setIsMenuOpen?.(false);
    };
    
    const linkElement = linkRef.current;
    if (linkElement) {
      linkElement.addEventListener("click", onClick);
    }
    return () => {
      if (linkElement) {
        linkElement.removeEventListener("click", onClick);
      }
    };
  }, [linkRef, setIsMenuOpen]);

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
        className={`${roboto_condensed.className} ${LINK_STYLES_CLASS} last:border-none`}
      >
        {link.label}
      </Link>
    );
  if (isMinilink)
    return (
      <Link
        ref={linkRef}
        href={link.href}
        className={`${roboto_condensed.className} ${LINK_STYLES_CLASS}`}
      >
        {link.label}
      </Link>
    );
}
