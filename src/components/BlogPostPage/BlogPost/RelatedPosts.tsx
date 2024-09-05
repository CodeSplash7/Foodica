import AwaitableImage from "@/components/AwaitableImage";
import ClickableTitle from "@/components/ClickableTitle";
import { Blog } from "@/types/blog-types";
import { formatCreationDate } from "@/general-utils/formatCreationDate";
import { getRelatedBlogs } from "@/server-utils/blogsFunctions";
import { Skeleton } from "@mui/material";
import { Roboto_Condensed } from "next/font/google";
const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export default async function RelatedPosts({
  blog
}: {
  blog: Blog | "loading";
}) {
  let relatedPostsExist = true;
  const relatedPosts =
    blog === "loading"
      ? "loading"
      : await getRelatedBlogs(blog.id, blog.mainTag, 3);
  if (Array.isArray(relatedPosts) && relatedPosts.length === 0)
    relatedPostsExist = false;
  if (relatedPostsExist)
    return (
      <div className={`flex flex-col gap-[16px] w-full`}>
        <div
          className={`${roboto_condensed.className} text-[18px] font-bold uppercase`}
        >
          Related
        </div>
        <div className={`flex gap-[16px] w-full h-[260px]`}>
          {relatedPosts === "loading"
            ? Array(3)
                .fill(0)
                .map(() => <RelatedPostCard post={"loading"} />)
            : relatedPosts.map((post) => (
                <RelatedPostCard key={post.id} post={post} />
              ))}
        </div>
      </div>
    );
}

const RelatedPostCard: React.FC<{ post: Blog | "loading" }> = ({ post }) => {
  return (
    <ClickableTitle
      type="other"
      blog={post}
      addStyles={`w-full h-full group flex flex-col justify-start gap-[8px] opacity-90 hover:opacity-100`}
    >
      <>
        <AwaitableImage
          loadingSkeletonLayout={{
            width: "100%",
            height: "75%",
            background: "black"
          }}
          width={400}
          height={400}
          className={`h-3/4 [object-fit:cover]`}
          alt="blog image"
          src={post.picture?.url || ""}
        />
      </>
      <div className="flex flex-col h-1/4 w-full">
        <>
          {post === "loading" && (
            <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
          )}
          {post !== "loading" && (
            <div
              className={`h-full text-blue-600 group-hover:underline hover:text-cyan-600 text-[.9rem]`}
            >
              {post.title}
            </div>
          )}
        </>
        <>
          {post === "loading" && (
            <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
          )}
          {post !== "loading" && (
            <div
              className={`h-full text-gray-500 text-[.9rem] justify-self-end`}
            >
              {formatCreationDate(post.creationDate)}
              <div>In "{post.mainTag}"</div>
            </div>
          )}
        </>
      </div>
    </ClickableTitle>
  );
};
