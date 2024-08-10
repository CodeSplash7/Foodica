import { Roboto_Condensed } from "next/font/google";
import { LoadingDots } from "./Icons";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "500"
});

export default function LoadingAnimation({ text }: { text: string }) {
  return (
    <div className="flex text-[20px] text-black gap-[4px] items-end">
      <span className={roboto_condensed.className}>{text}</span>
      <span className={`text-[6px] text-black pb-[4px]`}>
        <LoadingDots ballsColor="black" />
      </span>
    </div>
  );
}
