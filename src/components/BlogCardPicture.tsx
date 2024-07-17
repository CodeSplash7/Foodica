import { Picture } from "@/utils/allSides/usersFunctions";
import AwaitableImage from "./AwaitableImage";

export default function BlogCardPicture({
  picture,
  isSmall
}: {
  picture: Picture;
  isSmall: boolean;
}) {
  return (
    <div className="w-full relative">
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
        fallBackStyles={`absolute text-gray-500 top-0 left-0 bg-gray-300 w-full flex justify-center items-center ${
          isSmall
            ? "h-[32vw] sm:h-[32vw] md:h-[32vw]"
            : "h-[540px] sm:h-[64vw] md:h-[42vw]"
        }`}
      ></AwaitableImage>
    </div>
  );
}
