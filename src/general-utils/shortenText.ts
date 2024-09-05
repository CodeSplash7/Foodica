export const shortenText = (text: string, maxLength: number, end?: string) => {
  if (text.length <= maxLength) {
    return text;
  }

  const shortenedText = text.slice(0, maxLength) + (end || " [...]");
  return shortenedText;
};
