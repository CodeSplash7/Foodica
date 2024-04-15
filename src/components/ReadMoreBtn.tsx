import Link from "next/link";

export default function ReadMoreBtn({ blogTitle }: { blogTitle: string }) {
  return (
    <Link
      href={"/blogs?"}
      style={{ letterSpacing: "2px" }}
      className="[font-family:'Roboto_Condensed',sans-serif] text-[#363940] hover:text-white md:text-white text-[14px] font-bold bg-white md:bg-[#363940] hover:bg-[#363940] md:hover:bg-[#818592] transition duraiton-150 px-[32px] py-[12px] rounded-sm"
    >
      READ MORE
    </Link>
  );
}
