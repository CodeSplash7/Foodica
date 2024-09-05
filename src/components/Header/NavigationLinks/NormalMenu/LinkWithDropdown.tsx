"use client";

import { Link as LinkType } from "@/types/link-types";
import Link from "next/link";
import DropdownCloseOpenIcon from "./DropdownCloseOpenIcon";
import DroppedLinks from "./DroppedLinks";
import { LINK_STYLES_CLASS } from "./MenuLink";

import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function LinkWithDropdown({ link }: { link: LinkType }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
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
