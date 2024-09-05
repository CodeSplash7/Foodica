export default async function PostsDateDisplay({
  year,
  month,
  day
}: {
  year: string;
  month?: string;
  day?: string;
}) {
  return (
    <div
      className={`[letter-spacing:1.2px] [font-family:'Roboto_Condensed',sans-serif] text-[18px] font-bold`}
    >
      POSTS OF{" "}
      <span className="underline">
        {`${year} `}
        {month && `${new Date(month).toLocaleString("en", { month: "long" })} `}
        {day && `${day} `}
      </span>
    </div>
  );
}
