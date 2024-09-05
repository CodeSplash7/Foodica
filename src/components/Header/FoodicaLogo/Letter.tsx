import { LETTER_COLOR } from "./FoodicaLogo";
import { type LogoLetter } from "@/types/logo-types";

const HOVER_OFFSET = 4;
const LETTER_SIZE = 0.7;
const HOVER_COLOR = "white";

export default function Letter({
  letter,
  letters,
  setLetters
}: {
  letter: LogoLetter;
  letters: LogoLetter[];
  setLetters: (newLetters: LogoLetter[]) => void;
}) {
  let offsetLetterId = letter.id - HOVER_OFFSET;
  if (offsetLetterId < 0) {
    offsetLetterId += letters.length;
  }
  const offsetLetter = letters.find((l) => l.id === offsetLetterId);
  if (!offsetLetter) return;

  const { width, height, pathData, fill } = letter;
  return (
    <div
      className="group flex items-end h-[36px]"
      onMouseOver={() => {
        const newLetters = letters.map((l) =>
          l.id === offsetLetter.id ? { ...offsetLetter, fill: HOVER_COLOR } : l
        );
        setLetters(newLetters);
      }}
      onMouseOut={() => {
        const newLetters = letters.map((l) =>
          l.id === offsetLetter.id ? { ...offsetLetter, fill: LETTER_COLOR } : l
        );
        setLetters(newLetters);
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
