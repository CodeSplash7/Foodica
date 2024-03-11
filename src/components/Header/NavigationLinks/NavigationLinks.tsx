import { useEffect, useState } from "react";

import NormalLinksMenu from "./NormalMenu/NormalMenu";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Searchbar from "./Searchbar/Searchbar";

export default function NavLinks() {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  let showBurgerMenu = false;

  showBurgerMenu = viewportWidth < 900;

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="z-0 absolute left-0 w-full h-[88px] border-y"></div>
      <div
        style={{
          justifyContent:
            viewportWidth > 900 || viewportWidth < 600 ? "center" : "start"
        }}
        className="relative z-50 w-full h-[88px] flex justify-center items-center"
      >
        {showBurgerMenu ? <BurgerMenu /> : <NormalLinksMenu />}
        <div className="absolute right-0">
          <Searchbar />
        </div>
      </div>
    </>
  );
}
