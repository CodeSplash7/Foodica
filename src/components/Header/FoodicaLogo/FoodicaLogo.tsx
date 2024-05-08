"use client";
import Letter from "./Letter";
import { useAppSelector } from "@/store/store";

const letterSpacing = "3px";

export default function FoodicaLogo() {
  const letters = useAppSelector((state) => state.pageHeader.logo.letters);
  return (
    <div className={`flex mt-[48px] mb-[16px]`} style={{ gap: letterSpacing }}>
      {letters.map((letter) => {
        return <Letter key={letter.id} letterIdentityState={letter} />;
      })}
    </div>
  );
}
