import NormalMenu from "./NormalMenu/NormalMenu";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Searchbar from "./Searchbar/Searchbar";
import Skeleton from "react-loading-skeleton";

export default function NavLinks() {
  return (
    <>
      <div className="z-0 absolute left-0 w-full h-[88px] border-y"></div>
      <div className="relative z-50 w-full h-[88px] flex justify-start md:justify-center items-center">
        <BurgerMenu />
        <NormalMenu />
        <div className="absolute right-0">
          <Searchbar />
        </div>
      </div>
    </>
  );
}
