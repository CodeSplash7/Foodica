export const formatCreationDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
};

export function transformDateString(dateString: string) {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}
