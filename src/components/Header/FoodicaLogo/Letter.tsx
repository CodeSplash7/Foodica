import { useState, useEffect } from "react";

import { useAppSelector } from "@/store/store";
import { useAppDispatch } from "@/store/store";

import { useNormalLetter } from "@/store/pageHeaderSlice";
import { useHoverLetter } from "@/store/pageHeaderSlice";

import { LetterSymbol } from "@/store/pageHeaderSlice";

export default function Letter({
  letterSymbol
}: {
  letterSymbol: LetterSymbol;
}) {
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  let LETTER_SIZE = 0.7;

  if (viewportWidth && viewportWidth < 1200) {
    LETTER_SIZE = 0.6;
  }
  if (viewportWidth && viewportWidth < 800) {
    LETTER_SIZE = 0.5;
  }
  if (viewportWidth && viewportWidth < 400) {
    LETTER_SIZE = 0.4;
  }

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const letters = useAppSelector((state) => state.pageHeader.logo.letters);
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
        style={{
          width: `${width * LETTER_SIZE}px`,
          height: `${height * LETTER_SIZE}px`
        }}
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
}

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
