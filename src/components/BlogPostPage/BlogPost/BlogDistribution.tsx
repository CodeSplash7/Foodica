import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  XIcon,
  YoutubeIcon
} from "@/components/Icons";

export default function BlogDistribution() {
  return (
    <div className={`flex flex-col gap-[16px]`}>
      <div
        className={`font-bold text-[12px] pt-[16px] border-t w-fit border-gray-200`}
      >
        Share this:
      </div>
      <div className={`flex flex-wrap gap-[8px] h-fit`}>
        <FacebookIcon w="32" />
        <XIcon w="32" />
        <PinterestIcon w="32" />
        <InstagramIcon w="32" />
        <YoutubeIcon w="32" />
      </div>
    </div>
  );
}
