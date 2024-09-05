import { Link as LinkType } from "@/types/link-types";
import Link from "next/link";
import DropdownCloseOpenIcon from "./DropdownCloseOpenIcon";
import dynamic from "next/dynamic";
const DropdownLinks = dynamic(() => import("./DroppedLinks"));
import { Roboto_Condensed } from "next/font/google";
import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { LINK_STYLES_CLASS } from "./MenuLink";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

type LinkWithDropdownProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  link: LinkType;
};

const LinkWithDropdown = forwardRef<HTMLAnchorElement, LinkWithDropdownProps>(
  ({ link, isMenuOpen, setIsMenuOpen }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      if (!isMenuOpen) setIsOpen(false);
    }, [isMenuOpen]);

    return (
      <>
        <div className={`flex gap-[5px] h-fit border-b ${LINK_STYLES_CLASS}`}>
          <Link
            ref={ref}
            href={link.href}
            className={` ${roboto_condensed.className} flex-shrink-0`}
          >
            {link.label}
          </Link>
          <DropdownCloseOpenIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 w-full`}
          style={{
            height: `${isOpen ? `${link.links?.length! * 40}px` : "0px"}`
          }}
        >
          <div className="h-fit pl-[32px] w-full">
            <DropdownLinks
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
              linkIds={link.links!}
            />
          </div>
        </div>
      </>
    );
  }
);

export default LinkWithDropdown;
