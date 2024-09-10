import { getAllLinks } from "@/general-utils/linksFunctions";

export default function DropdownCloseOpenIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 6 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        isOpen ? "rotate-180" : "rotate-0"
      } transition duration-200 flex items-start`}
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
  );
}
