import MenuLink from "./MenuLink";
import { getAllLinks } from "@/general-utils/linksFunctions";

export default function DroppedLinks({ linkIds }: { linkIds: number[] }) {
  const allLinks = getAllLinks();
  return (
    <div className="flex flex-col bg-white">
      {linkIds.map((linkId) => {
        const target = allLinks.find((link) => link.id === linkId)!;
        return <MenuLink key={linkId} link={target} miniLink />;
      })}
    </div>
  );
}
