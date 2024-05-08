"use client";

import { closeBurgerMenu, openBurgerMenu } from "@/store/pageHeaderSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function Icon() {
  const isOpen = useAppSelector(
    (state) => state.pageHeader.navigationMenu.isBurgerMenuOpen
  );
  const dispatch = useAppDispatch();

  function handleOpenDropDown() {
    return isOpen ? dispatch(closeBurgerMenu()) : dispatch(openBurgerMenu());
  }

  return (
    <div className="flex w-fit">
      <button
        className={`h-6 w-6 relative focus:outline-none ${
          isOpen ? "open" : ""
        }`}
        onClick={handleOpenDropDown}
      >
        <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
        <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
        <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
      </button>
      <div className={`text-[18px] ${roboto_condensed.className}`}>MENU</div>
    </div>
  );
}
