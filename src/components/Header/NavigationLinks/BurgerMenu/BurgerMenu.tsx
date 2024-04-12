import "./burgerMenuStyles.css";

import Link from "next/link";
import { type Link as LinkType } from "@/store/pageHeaderSlice";

import {
  openBurgerMenu,
  closeBurgerMenu,
  openDropDownMenu,
  closeDropDownMenu
} from "@/store/pageHeaderSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

// the button that opens the menu (includes the menu too)
export default function BurgerMenu() {
  // hooks
  const dispatch = useAppDispatch();

  // selectors
  const isOpen = useAppSelector(
    (state) => state.pageHeader.navigationMenu.isBurgerMenuOpen
  );
  const recipeIndexLinksCount = useAppSelector(
    (state) =>
      state.pageHeader.navigationMenu.links.find((l) => l.id === 3)?.links!
        .length
  );
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  
  const mainLinks = links.filter((link) => !link.isContained);

  function handleOpen(open: boolean) {
    if (open) {
      dispatch(openBurgerMenu());
      return;
    }
    if (!open) {
      dispatch(closeBurgerMenu());
      return;
    }
  }

  return (
    <div className="burger-menu-container flex flex-col relative w-full">
      <div onClick={() => handleOpen(!isOpen)} className="flex w-fit">
        <BurgerMenuIcon />
        <div className="text-[18px] [font-family:'Roboto_Condensed',sans-serif]">
          MENU
        </div>
      </div>
      <div
        className="overflow-hidden absolute top-[24px] transition-all duration-500 w-full"
        style={{
          height: `${isOpen ? `${recipeIndexLinksCount! * 50}px` : "0px"}`
        }}
      >
        <div className="flex flex-col w-full bg-[#f5f5f5] rounded-lg h-fit px-[30px] py-[20px]">
          {mainLinks.map((link) => (
            <MenuLink key={link.id} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

// a link from a burger navigation menu
function MenuLink({ link, miniLink }: { link: LinkType; miniLink?: boolean }) {
  const isDropdownLink = !!link.links;
  const isNormalLink = !link.links && !miniLink;
  const isMinilink = !link.links && miniLink;

  const dispatch = useAppDispatch();

  if (isDropdownLink) return <BurgerMenuDropdownLink link={link} />;
  if (isNormalLink)
    return (
      <Link
        href={link.href}
        className={`hover:text-[#818592] transition duration-150 [font-family:'Roboto_Condensed',sans-serif] border-b last:border-none border-[#e2e2e2] w-full pt-[16px]`}
      >
        {link.label}
      </Link>
    );
  if (isMinilink)
    return (
      <Link
        href={link.href}
        onClick={() => dispatch(closeBurgerMenu())}
        className={`hover:text-[#818592] transition duration-150 [font-family:'Roboto_Condensed',sans-serif] border-b last:border-none border-[#e2e2e2] w-full pt-[16px]`}
      >
        {link.label}
      </Link>
    );
}

// a dropdown link from the burger menu
function BurgerMenuDropdownLink({ link }: { link: LinkType }) {
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  const thisDropdown = links.find((l) => l.id === link.id);
  const isOpen = thisDropdown?.isOpen!;

  return (
    <div className="">
      <div className="flex gap-[5px] h-fit border-b">
        <Link
          href={link.href}
          className={`hover:text-[#818592] transition [font-family:'Roboto_Condensed',sans-serif] flex-shrink-0 w-fit pt-[16px]`}
        >
          {link.label}
        </Link>
        <CloseOpenIcon linkId={link.id} />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 w-full`}
        style={{
          height: `${isOpen ? `${thisDropdown.links?.length! * 42}px` : "0px"}`
        }}
      >
        <div className="h-fit pl-[32px] w-full">
          <DropdownLinks linkIds={link.links!} />
        </div>
      </div>
    </div>
  );
}

// the animated burger icon
const BurgerMenuIcon = () => {
  const isOpen = useAppSelector(
    (state) => state.pageHeader.navigationMenu.isBurgerMenuOpen
  );
  const dispatch = useAppDispatch();

  function handleOpenDropDown() {
    return isOpen ? dispatch(closeBurgerMenu()) : dispatch(openBurgerMenu());
  }

  return (
    <button
      className={`h-6 w-6 relative focus:outline-none ${isOpen ? "open" : ""}`}
      onClick={handleOpenDropDown}
    >
      <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
      <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
      <span className="block w-5 h-0.5 absolute bg-current transform transition origin-center"></span>
    </button>
  );
};

// the icon along the dropdown link
function CloseOpenIcon({ linkId }: { linkId: number }) {
  const links = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );

  const dispatch = useAppDispatch();
  const thisDropdown = links.find((l) => l.id === linkId);
  const isOpen = thisDropdown?.isOpen!;

  function handleOpenDropDown() {
    return isOpen
      ? dispatch(closeDropDownMenu(thisDropdown?.id))
      : dispatch(openDropDownMenu(thisDropdown?.id));
  }

  return (
    <div
      className="w-full flex items-center justify-end"
      onClick={handleOpenDropDown}
    >
      <div className="h-1/2 border-l-2 mr-[16px]"></div>
      <svg
        width="12"
        height="6"
        viewBox="0 0 6 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          thisDropdown?.isOpen ? "rotate-180" : "rotate-0"
        } transition duration-200 flex justify-start mr-[32px]`}
      >
        <g clipPath="url(#clip0_210_2)">
          <path
            d="M0.75 0.75L2.85 2.25L5.25 0.75"
            stroke="black"
            strokeWidth=".8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

// the links that drop down
function DropdownLinks({ linkIds }: { linkIds: number[] }) {
  const allLinks = useAppSelector(
    (state) => state.pageHeader.navigationMenu.links
  );
  return (
    <div className="flex flex-col w-full">
      {linkIds.map((linkId) => {
        const target = allLinks.find((link) => link.id === linkId)!;
        return <MenuLink key={linkId} link={target} miniLink />;
      })}
    </div>
  );
}
