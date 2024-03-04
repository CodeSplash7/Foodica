"use client";

import { useAppSelector } from "@/store/store";
import { useAppDispatch } from "@/store/store";

import { useNormalLetter } from "@/store/pageHeaderSlice";
import { useHoverLetter } from "@/store/pageHeaderSlice";

import { LetterSymbol } from "@/store/pageHeaderSlice";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <FoodicaLogo />
      </div>
      <div className="flex justify-center text-[#c7c7c7] [font-family:'Roboto_Condensed',sans-serif]">
        BY ROSCA RARES
      </div>
    </div>
  );
}
// #363940 can be deleted when not not used
function FoodicaLogo() {
  const LETTER_SPACING = "3px";
  const letters = useAppSelector((state) => state.pageHeader.letters);
  const letterSymbols: LetterSymbol[] = ["F", "O1", "O2", "D", "I", "C", "A"];
  return (
    <div className={`flex mt-[48px]`} style={{ gap: LETTER_SPACING }}>
      {letterSymbols.map((letter) => {
        return <Letter key={letter} letterSymbol={letter} />;
      })}
    </div>
  );
}

const Letter = ({ letterSymbol }: { letterSymbol: LetterSymbol }) => {
  const LETTER_SIZE = 0.7;

  const letters = useAppSelector((state) => state.pageHeader.letters);
  const dispatch = useAppDispatch();

  const targetedLetter = letters[letterSymbol];
  const { pathData, width, height, fill, activtesLetter } = targetedLetter;
  return (
    <div
      className="group flex items-end"
      onMouseOver={() => {
        dispatch(useHoverLetter(activtesLetter));
      }}
      onMouseOut={() => {
        dispatch(useNormalLetter(activtesLetter));
      }}
    >
      <svg
        width={width * LETTER_SIZE}
        height={height * LETTER_SIZE}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.isArray(pathData) ? (
          pathData.map((pd) => (
            <LetterPathData key={pd} pathData={pd} fill={fill} />
          ))
        ) : (
          <LetterPathData pathData={pathData} fill={fill} />
        )}
      </svg>
    </div>
  );
};

type LetterPathDataProps = {
  pathData: string;
  fill: string;
};

const LetterPathData = ({ pathData, fill }: LetterPathDataProps) => (
  <path
    d={pathData}
    style={{ fill: fill }}
    className={`transition duration-500`}
  />
);
