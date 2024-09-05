export default function filterNulls(array: (number | null)[]) {
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
