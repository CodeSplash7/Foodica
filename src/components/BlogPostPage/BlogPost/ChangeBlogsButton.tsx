"use client";

export default function ChangeBlogButton({
  action,
  handleBlogsNavigation
}: {
  action: "+" | "-";
  handleBlogsNavigation: (action: "-" | "+") => void;
}) {
  async function handleClick() {
    handleBlogsNavigation(action);
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <svg
        width="16"
        height="16"
        viewBox="0 0 6 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={action === "+" ? "rotate-[270deg]" : "rotate-90"}
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
