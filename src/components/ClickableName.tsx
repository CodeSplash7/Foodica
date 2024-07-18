import { usernameToUrl } from "@/utils/allSides/usersFunctions";
import Link from "next/link";

export default function ClickableName({
  className,
  children
}: {
  children: string;
  className?: string;
}) {
  return (
    <Link href={`/authors/${usernameToUrl(children)}`} className={className}>
      {children}
    </Link>
  );
}
