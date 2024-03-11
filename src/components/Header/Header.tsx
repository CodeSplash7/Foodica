"use client";

import FoodicaLogo from "./FoodicaLogo/FoodicaLogo";
import NavLinks from "./NavigationLinks/NavigationLinks";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <FoodicaLogo />
      </div>
      <div className="flex justify-center text-[#c7c7c7] [font-family:'Roboto_Condensed',sans-serif]">
        BY ROSCA RARES
      </div>
      <div className="mt-[36px]">
        <NavLinks />
      </div>
    </div>
  );
}
