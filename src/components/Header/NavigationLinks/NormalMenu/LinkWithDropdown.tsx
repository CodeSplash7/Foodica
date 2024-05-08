"use client";

import { Link as LinkType } from "@/utils/allSides/linksFunctions";
import Link from "next/link";
import DropdownCloseOpenIcon from "./DropdownCloseOpenIcon";
import DroppedLinks from "./DroppedLinks";
import { LINK_STYLES_CLASS } from "./MenuLink";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeDropDownMenu, openDropDownMenu } from "@/store/pageHeaderSlice";

import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function LinkWithDropdown({ link }: { link: LinkType }) {
  const thisDropdown = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  ).find((l) => l.id === link.id);
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
          className={`${LINK_STYLES_CLASS} ${roboto_condensed.className} `}
        >
          {link.label.toUpperCase()}
        </Link>
        <DropdownCloseOpenIcon linkId={link.id} />
      </div>
      <div
        className={`overflow-hidden absolute transition-all duration-500 w-[216px]`}
        style={{
          height: `${isOpen ? `${link.links?.length! * 42}px` : "0px"}`
        }}
      >
        <div className="h-fit">
          <DroppedLinks linkIds={link.links!} />
        </div>
      </div>
    </div>
  );
}
