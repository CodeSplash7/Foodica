import NormalMenu from "./NormalMenu/NormalMenu";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Searchbar from "./Searchbar/Searchbar";

export default function NavLinks({
  showSearchBar
}: {
  showSearchBar?: boolean;
}) {
  if (showSearchBar === undefined) showSearchBar = true;
  return (
    <div className="mt-[36px] relative">
      <div className="z-0 absolute inset-x-[-32px] h-[88px] border-y border-slate-400"></div>
      <div className="relative z-50 w-full h-[88px] flex justify-start md:justify-center items-center">
        <BurgerMenu />
        <NormalMenu />
        {showSearchBar && (
          <div className="absolute right-0">
            <Searchbar />
          </div>
        )}
      </div>
    </div>
  );
}
