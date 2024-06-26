"use client";
import {
  getMainLinks,
  getRecipeIndexLinks
} from "@/utils/allSides/linksFunctions";
import { useAppSelector } from "@/store/store";

import dynamic from "next/dynamic";
const MenuLink = dynamic(() => import("./MenuLink"), { ssr: true });

export default function Links() {
  const mainLinks = getMainLinks();
  const recipeIndexLinksCount = getRecipeIndexLinks()?.length;
  const isOpen = useAppSelector(
    (state) => state.pageHeader.navigationMenu.isBurgerMenuOpen
  );
  return (
    <div
      className="overflow-hidden absolute top-[24px] transition-all duration-500 w-full"
      style={{
        height: `${isOpen ? `${recipeIndexLinksCount! * 50}px` : "0px"}`
      }}
    >
      <div className="flex flex-col w-full bg-[#f5f5f5e4] rounded-lg h-fit px-[30px] py-[20px]">
        {mainLinks.map((link) => (
          <MenuLink key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}
