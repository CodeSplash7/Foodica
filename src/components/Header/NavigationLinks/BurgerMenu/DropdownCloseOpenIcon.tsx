"use client";

import { closeDropDownMenu, openDropDownMenu } from "@/store/pageHeaderSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export default function DropdownCloseOpenIcon({ linkId }: { linkId: number }) {
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  const dispatch = useAppDispatch();
  const thisDropdown = links.find((l) => l.id === linkId);
  const isOpen = thisDropdown?.isOpen!;

  function handleOpenDropDown() {
    return isOpen
      ? dispatch(closeDropDownMenu(thisDropdown?.id))
      : dispatch(openDropDownMenu(thisDropdown?.id));
  }

  return (
    <div
      className="w-full flex items-center justify-end"
      onClick={handleOpenDropDown}
    >
      <div className="h-1/2 border-l-2 mr-[16px]"></div>
      <svg
        width="12"
        height="6"
        viewBox="0 0 6 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          thisDropdown?.isOpen ? "rotate-180" : "rotate-0"
        } transition duration-200 flex justify-start mr-[32px]`}
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
    </div>
  );
}
