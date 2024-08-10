export default function DirectionIcon({
  direction
}: {
  direction: "left" | "right";
}) {
  const [width, height] = ["21", "6"];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 49 14`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${direction === "right" ? "rotate-180" : ""}`}
    >
      <path
        className={`group-hover:fill-white duration-150 transition`}
        d="M0.288387 6.32783C-0.096129 6.69906 -0.096129 7.30093 0.288387 7.67215L6.55444 13.7216C6.93896 14.0928 7.56238 14.0928 7.9469 13.7216C8.33141 13.3503 8.33141 12.7485 7.9469 12.3773L2.37707 6.99999L7.9469 1.62274C8.33141 1.25151 8.33141 0.649643 7.9469 0.278417C7.56238 -0.0928055 6.93896 -0.0928055 6.55444 0.278417L0.288387 6.32783ZM49 6.04942H0.984616V7.95057H49V6.04942Z"
        fill="#363940"
      />
    </svg>
  );
}
