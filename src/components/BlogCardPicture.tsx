import { Picture } from "@/general-utils/usersFunctions";
import AwaitableImage from "./AwaitableImage";

export default function BlogCardPicture({
  picture,
  isSmall
}: {
  picture: Picture;
  isSmall: boolean;
}) {
  return (
    <AwaitableImage
      className={`transition duration-300 object-cover w-full ${
        isSmall
          ? "h-[32vw] sm:h-[32vw] md:h-[32vw]"
          : "h-[540px] sm:h-[64vw] md:h-[42vw]"
      }`}
      alt={"blog image"}
      src={picture?.url || ""}
      width={500}
      height={500}
      loadingSkeletonLayout={{
        width: "100%",
        height: isSmall ? "32vw" : "540px",
        "@media (min-width: 640px)": {
          height: isSmall ? "32vw" : "64vw"
        },
        "@media (min-width: 768px)": {
          height: isSmall ? "32vw" : "42vw"
        }
      }}
    ></AwaitableImage>
  );
}
