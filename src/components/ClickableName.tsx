import Link from "next/link";

export default function ClickableName({
  className,
  children
}: {
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={`/authors/${children.toLowerCase().split(" ").join("")}`}
      className={className}
    >
      {children}
    </Link>
  );
}
