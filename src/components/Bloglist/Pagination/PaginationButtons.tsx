import PaginationButton from "./PaginationButton";

export default function PaginationButtons({
  currentBlogPage,
  pagesCount
}: {
  currentBlogPage: number;
  pagesCount: number;
}) {
  let buttonPages = getButtonPages(currentBlogPage, pagesCount);
  buttonPages = filterNulls(buttonPages);
  buttonPages = removeDublicates(buttonPages);

  return (
    <div className="flex gap-[6px] items-center absolute sm:relative left-[50%] sm:left-0 translate-x-[-50%] sm:translate-x-0">
      {buttonPages.map((btn) => {
        return (
          <PaginationButton
            key={btn}
            btn={btn}
            isActive={currentBlogPage === btn}
          />
        );
      })}
    </div>
  );
}

function getButtonPages(currentBlogPage: number, pagesCount: number) {
  let result: (number | null)[] = [];
  result.push(1);
  for (let i = 1; i <= pagesCount; i++) {
    if (i === currentBlogPage) {
      result.push(i);
    } else if ([i - 1, i + 1].includes(currentBlogPage)) {
      result.push(i);
    } else result.push(null);
  }
  result.push(pagesCount);
  return result;
}

function filterNulls(array: (number | null)[]) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    let valueToPush = array[i];

    const nullInsideSequence = array[i] === null && array[i + 1] === null;
    const nullOutsideSequence = array[i] === null && array[i - 1] !== null;
    const lastNullInSequnce = array[i] === null && array[i + 1] !== null;

    if (nullInsideSequence || nullOutsideSequence) continue;

    if (lastNullInSequnce) {
      valueToPush = null;
    }
    result.push(valueToPush);
  }

  return result;
}

function removeDublicates(array: any[]) {
  return [...new Set(array)];
}
