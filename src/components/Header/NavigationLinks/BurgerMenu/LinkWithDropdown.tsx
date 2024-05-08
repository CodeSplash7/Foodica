"use client";

import { Link as LinkType } from "@/utils/allSides/linksFunctions";
import Link from "next/link";
import DropdownCloseOpenIcon from "./DropdownCloseOpenIcon";
import { useAppSelector } from "@/store/store";
import dynamic from "next/dynamic";
const DropdownLinks = dynamic(() => import("./DroppedLinks"));
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

  return (
    <div className="">
      <div className="flex gap-[5px] h-fit border-b">
        <Link
          href={link.href}
          className={`hover:text-[#818592] transition ${roboto_condensed.className} flex-shrink-0 w-fit pt-[16px]`}
        >
          {link.label}
        </Link>
        <DropdownCloseOpenIcon linkId={link.id} />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 w-full`}
        style={{
          height: `${isOpen ? `${link.links?.length! * 40}px` : "0px"}`
        }}
      >
        <div className="h-fit pl-[32px] w-full">
          <DropdownLinks linkIds={link.links!} />
        </div>
      </div>
    </div>
  );
}
