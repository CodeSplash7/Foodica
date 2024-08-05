import Skeleton from "@mui/material/Skeleton";

import { Blog } from "@/utils/allSides/blogsFunctions";
import Image from "next/image";

export default function RecipeImage({ blog }: { blog: Blog | "loading" }) {
  const sizeStyles = "w-full h-[64vw] md:h-[42vw] max-h-[544px]";
  if (blog === "loading") {
    return <RecipeImageSkeleton />;
  }
  return (
    <Image
      className={`[object-fit:cover] ${sizeStyles}`}
      alt="blog image"
      src={blog.picture?.url || ""}
      width={2000}
      height={2000}
    />
  );
}

const RecipeImageSkeleton = () => (
  <Skeleton
    variant="rectangular"
    sx={{
      width: "100%",
      height: "64vw",
      maxHeight: "544px",
      "@media (min-width: 768px)": {
        height: "42vw"
      }
    }}
  />
);
