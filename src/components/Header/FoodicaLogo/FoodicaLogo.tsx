import { useAppSelector } from "@/store/store";

import { LetterSymbol } from "@/store/pageHeaderSlice";
import Letter from "./Letter";

export default function FoodicaLogo() {
  const LETTER_SPACING = "3px";
  const letters = useAppSelector((state) => state.pageHeader.logo.letters);
  const letterSymbols: LetterSymbol[] = ["F", "O1", "O2", "D", "I", "C", "A"];
  return (
    <div className={`flex mt-[48px] mb-[16px]`} style={{ gap: LETTER_SPACING }}>
      {letterSymbols.map((letter) => {
        return <Letter key={letter} letterSymbol={letter} />;
      })}
    </div>
  );
}
