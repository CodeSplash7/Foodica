import { Blog } from "@/utils/allSides/blogsFunctions";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogPost({ blog }: { blog: Blog }) {
  return (
    <div className="flex-[2]">
      <BlogThumbnail blog={blog} />
    </div>
  );
}

function BlogThumbnail({ blog }: { blog: Blog }) {
  const activeBlog = blog;
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
}
