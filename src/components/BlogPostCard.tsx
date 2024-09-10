import { Blog } from "@/types/blog-types";
import AwaitableImage from "./AwaitableImage";
import ClickableTag from "./ClickableTag";
import ClickableTitle from "./ClickableTitle";

export default function BlogPostCard({ blog }: { blog: Blog }) {
  return (
    <div className="relative group overflow-hidden">
      <AwaitableImage
        src={blog.picture?.url}
        alt={blog.title}
        width={600}
        height={600}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        skeletonClassName={{
          width: "100%",
          height: "100%"
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex flex-col items-center justify-center">
        <ClickableTag
          useNavigation
          blog={blog}
          addStyles="text-white text-xs px-2 py-1 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <ClickableTitle
          blog={blog}
          type="text"
          addStyles="text-white text-center text-sm px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <span className="text-white text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Comments: {blog.comments.length + 1}
        </span>
      </div>
    </div>
  );
}
