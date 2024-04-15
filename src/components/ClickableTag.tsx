import Link from "next/link";

export default function ClickableTag({
  tagName,
  className
}: {
  tagName: string;
  className?: string;
}) {
  return (
    <Link href={`/blogs?t=${tagName.toLowerCase()}`} className={className}>
      {tagName}
    </Link>
  );
}
