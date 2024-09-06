import { Blog } from "@/types/blog-types";
import AwaitableImage from "@/components/AwaitableImage";

export default function RecipeImage({ blog }: { blog: Blog | "loading" }) {
  const sizeStyles = "w-full h-[64vw] md:h-[42vw] max-h-[544px]";
  return (
    <AwaitableImage
      skeletonClassName={{
        width: "100%",
        height: "64vw",
        maxHeight: "544px",
        "@media (min-width: 768px)": {
          height: "42vw"
        }
      }}
      className={`[object-fit:cover] ${sizeStyles}`}
      alt="blog image"
      src={blog === "loading" ? null : blog.picture?.url}
      width={2000}
      height={2000}
    />
  );
}
