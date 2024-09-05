import {
  getMainLinks,
  getRecipeIndexLinks
} from "@/general-utils/linksFunctions";

import { Dispatch, SetStateAction } from "react";
import MenuLink from "./MenuLink";

export default function Links({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const mainLinks = getMainLinks();
  const recipeIndexLinksCount = getRecipeIndexLinks()?.length;
  return (
    <div
      className="overflow-hidden absolute top-[24px] transition-all duration-500 w-full"
      style={{
        height: `${isOpen ? `${recipeIndexLinksCount! * 50}px` : "0px"}`
      }}
    >
      <div className="relative flex flex-col w-full bg-[#f5f5f5e4] rounded-lg h-fit px-[30px] py-[20px]">
        {mainLinks.map((link) => (
          <MenuLink
            setIsMenuOpen={setIsOpen}
            isMenuOpen={isOpen}
            key={link.id}
            link={link}
          />
        ))}
      </div>
    </div>
  );
}
