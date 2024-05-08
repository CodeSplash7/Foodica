import { redirect } from "next/navigation";

export default function Homepage() {
  redirect("/blogs?p=1");
}
