import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

import FoodicaLogo from "./FoodicaLogo/FoodicaLogo";
import NavLinks from "./NavigationLinks/NavigationLinks";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <FoodicaLogo />
      </div>
      <div
        className={`flex justify-center text-[#c7c7c7] ${roboto_condensed.className} [font-family:'Roboto_Condensed',sans-serif]`}
      >
        BY ROSCA RARES
      </div>
      <div className="mt-[36px]">
        <NavLinks />
      </div>
    </div>
  );
}
