import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

export default function SubmitAccountButton({
  toUpdate
}: {
  toUpdate: boolean;
}) {
  return (
    <button
      className={`mt-[16px] self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white bg-gray-800`}
    >
      {toUpdate ? "Update Account Information" : "Create Account"}
    </button>
  );
}
