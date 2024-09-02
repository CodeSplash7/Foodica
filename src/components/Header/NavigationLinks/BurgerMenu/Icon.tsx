import { Roboto_Condensed } from "next/font/google";
import { Dispatch, SetStateAction } from "react";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"]
});

export default function Icon({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  function handleOpenDropDown() {
    return isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  return (
    <div className="flex w-fit">
      <button
        className={`h-6 w-6 relative focus:outline-none ${
          isOpen ? "open" : ""
        }`}
        onClick={handleOpenDropDown}
      >
        <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
        <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
        <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
      </button>
      <div className={`text-[18px] ${roboto_condensed.className}`}>MENU</div>
    </div>
  );
}
