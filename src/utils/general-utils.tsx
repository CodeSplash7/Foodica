export const formatCreationDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
};

export const shortenText = (text: string, maxLength: number) => {
  const words = text.split(" ");

  if (words.length <= maxLength) {
    return text;
  }

  const shortenedText = words.slice(0, maxLength).join(" ") + " [...]";
  return shortenedText;
};
