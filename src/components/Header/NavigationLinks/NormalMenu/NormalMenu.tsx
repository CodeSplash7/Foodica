import { getMainLinks } from "@/utils/allSides/linksFunctions";
import MenuLink from "./MenuLink";

export default function NormalMenu() {
  const mainLinks = getMainLinks();
  return (
    <div className="hidden md:flex w-fit h-full items-center gap-[32px] text-[18px] text-[#363940]">
      {mainLinks.map((link) => (
        <MenuLink link={link} key={link.id} />
      ))}
    </div>
  );
}
