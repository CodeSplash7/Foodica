import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeDropDownMenu, openDropDownMenu } from "@/store/pageHeaderSlice";
import { type Link as LinkType } from "@/store/pageHeaderSlice";

const FONT_CLASS = "[font-family:'Roboto_Condensed',sans-serif]";
const LINK_STYLES_CLASS = "hover:text-[#818592] transition duration-150";

// Menu of links
export default function NormalLinksMenu() {
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  const mainLinks = links.filter((link) => !link.isContained);
  return (
    <div className="flex w-fit h-full items-center gap-[32px] text-[18px] text-[#363940]">
      {mainLinks.map((link) => (
        <MenuLink link={link} key={link.id}/>
      ))}
    </div>
  );
}

// Link from menu
function MenuLink({ link, miniLink }: { link: LinkType; miniLink?: boolean }) {
  if (link.links) return <NormalMenuDropdownLink link={link} />;
  if (!link.links && !miniLink)
    return (
      <Link href={link.href} className={`${LINK_STYLES_CLASS} ${FONT_CLASS} `}>
        {link.label}
      </Link>
    );
  if (!link.links && miniLink)
    return (
      <Link
        href={link.href}
        className={`${LINK_STYLES_CLASS} ${FONT_CLASS} text-[12px] px-[15px] py-[10px] border-x border-t last:border-b font-bold`}
      >
        {link.label}
      </Link>
    );
}

// The dropdown link
function NormalMenuDropdownLink({ link }: { link: LinkType }) {
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  const thisDropdown = links.find((l) => l.id === link.id);
  const isOpen = thisDropdown?.isOpen!;
  const dispatch = useAppDispatch();

  function handleOpenDropDown() {
    return isOpen
      ? dispatch(closeDropDownMenu(thisDropdown?.id))
      : dispatch(openDropDownMenu(thisDropdown?.id));
  }

  return (
    <div
      className=""
      onMouseOver={handleOpenDropDown}
      onMouseOut={handleOpenDropDown}
    >
      <div className="flex gap-[5px] items-center">
        <Link
          href={link.href}
          className={`${LINK_STYLES_CLASS} ${FONT_CLASS} `}
        >
          {link.label}
        </Link>
        <CloseOpenIcon linkId={link.id} />
      </div>
      <div
        className={`overflow-hidden absolute transition-all duration-500 w-[216px]`}
        style={{
          height: `${isOpen ? `${thisDropdown.links?.length! * 42}px` : "0px"}`
        }}
      >
        <div className="h-fit">
          <DropdownLinks linkIds={link.links!} />
        </div>
      </div>
    </div>
  );
}

// The icon next to the dropdown link
function CloseOpenIcon({ linkId }: { linkId: number }) {
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  const thisDropdown = links.find((link) => link.id === linkId);

  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 6 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        thisDropdown?.isOpen ? "rotate-180" : "rotate-0"
      } transition duration-200 flex items-start`}
    >
      <g clipPath="url(#clip0_210_2)">
        <path
          d="M0.75 0.75L2.85 2.25L5.25 0.75"
          stroke="black"
          strokeWidth=".8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// The links that drop down
function DropdownLinks({ linkIds }: { linkIds: number[] }) {
  const allLinks = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  return (
    <div className="flex flex-col bg-white">
      {linkIds.map((linkId) => {
        const target = allLinks.find((link) => link.id === linkId)!;
        return <MenuLink key={linkId} link={target} miniLink />;
      })}
    </div>
  );
}
