import { Blog } from "@/utils/allSides/blogsFunctions";
import Image from "next/image";

export default function RecipeImage({ blog }: { blog: Blog }) {
  return (
    <>
      <Image
        className={`left-0 [object-fit:cover] w-full
          h-[64vw] md:h-[42vw] max-h-[544px]`}
        alt="blog image"
        src={"/images/" + blog.image.src}
        width={blog.image.width}
        height={blog.image.height}
      />
    </>
  );
}
