import { useAppSelector } from "@/store/store";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogPost() {
  return (
    <div className="flex-[2]">
      <BlogThumbnail />
    </div>
  );
}

function BlogThumbnail() {
  const activeBlog = useAppSelector((state) => state.blogs.blogActive);
  if (activeBlog)
    return (
      <Image
        className={`[object-fit:cover] w-full
        h-[540px] sm:h-[64vw] md:h-[42vw]
        rounded-sm`}
        alt="blog image"
        src={"/" + activeBlog.image.src}
        width={activeBlog.image.width}
        height={activeBlog.image.height}
      />
    );
  return (
    <Skeleton
      className={`w-full
                  h-[540px] sm:h-[64vw] md:h-[42vw]`}
    />
  );
}
