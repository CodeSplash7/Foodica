import { Dispatch, SetStateAction } from "react";
import MenuLink from "./MenuLink";
import { getAllLinks } from "@/general-utils/linksFunctions";

export default function DroppedLinks({
  setIsMenuOpen,
  linkIds,
  isMenuOpen
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  linkIds: number[];
}) {
  const allLinks = getAllLinks();
  return (
    <div className="flex flex-col w-full">
      {linkIds.map((linkId) => {
        const target = allLinks.find((link) => link.id === linkId)!;
        return (
          <MenuLink
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            key={linkId}
            link={target}
            miniLink
          />
        );
      })}
    </div>
  );
}
