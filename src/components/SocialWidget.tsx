// import { Link } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, XIcon, InstagramIcon, PinterestIcon } from "./Icons";

export default function SocialWidget() {
  return (
    <div className="flex gap-[16px]">
      <Link href="https://www.facebook.com/profile.php?id=100058719204557">
        <FacebookIcon w="24" />
      </Link>
      <Link href="">
        <XIcon w="24" />
      </Link>
      <Link href="https://www.instagram.com/roscarares007/?next=%2F">
        <InstagramIcon w="24" />
      </Link>
      <Link href="">
        <PinterestIcon w="24" />
      </Link>
    </div>
  );
}
