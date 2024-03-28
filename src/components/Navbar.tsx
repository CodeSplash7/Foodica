import Link from "next/link";
import { FacebookIcon, InstagramIcon, XIcon, PinterestIcon } from "./Icons";

export default function Navbar() {
  return (
    <div>
      <div className="z-0 bg-[#fafafa] border-b-[1px] absolute left-0 top-0 w-screen h-[56px] flex"></div>
      <div className="z-10 w-full relative h-[56px] flex md:justify-between justify-center items-center">
        <div className="md:flex hidden text-slate-800 text-[12px] font-medium gap-[30px]">
          <Link
            className="hover:text-[#818592] transition duration-150"
            href="#"
          >
            ABOUT
          </Link>
          <Link
            className="hover:text-[#818592] transition duration-150"
            href="#"
          >
            CONTACT
          </Link>
        </div>
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
      </div>
    </div>
  );
}
