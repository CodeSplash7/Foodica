import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

import FoodicaLogo from "./FoodicaLogo/FoodicaLogo";
import NavLinks from "./NavigationLinks/NavigationLinks";

export default function Header({ showSearchBar }: { showSearchBar?: boolean }) {
  if (showSearchBar === undefined) showSearchBar = true;
  return (
    <div className={`w-full`}>
      <div className="flex justify-center">
        <FoodicaLogo />
      </div>
      <div
        className={`w-full text-center text-[#c7c7c7] ${roboto_condensed.className}`}
      >
        BY ROSCA RARES
      </div>
      <div className="mt-[36px]">
        <NavLinks showSearchBar={showSearchBar} />
      </div>
    </div>
  );
}
