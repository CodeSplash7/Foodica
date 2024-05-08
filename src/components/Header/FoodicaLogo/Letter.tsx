import { useAppDispatch } from "@/store/store";
import {
  LogoLetterIdentity,
  hoverLetterWithIndex,
  unhoverLetterWithIndex
} from "@/store/pageHeaderSlice";
import { getAllLetters, getLetter } from "@/utils/serverside/logoFunctions";

const letterHoverOffset = 4;

let LETTER_SIZE = 0.7;

export default function Letter({
  letterIdentityState
}: {
  letterIdentityState: LogoLetterIdentity;
}) {
  const letter = getLetter(letterIdentityState.id);
  const allLetters = getAllLetters();
  const dispatch = useAppDispatch();

  let targetedLetterIndex = letterIdentityState.id - letterHoverOffset;
  if (targetedLetterIndex < 0) {
    targetedLetterIndex += allLetters.length;
  }
  const targetedLetter = allLetters.find((l) => l.id === targetedLetterIndex);
  if (!targetedLetter) return;

  const { fill } = letterIdentityState;
  const { width, height, pathData } = letter!;
  return (
    <div
      className="group flex items-end h-[36px]"
      onMouseOver={() => {
        dispatch(hoverLetterWithIndex(targetedLetter.id));
      }}
      onMouseOut={() => {
        dispatch(unhoverLetterWithIndex(targetedLetter.id));
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
