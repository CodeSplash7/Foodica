import AwaitableImage from "@/components/AwaitableImage";
import ClickableTitle from "@/components/ClickableTitle";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { formatCreationDate } from "@/utils/general-utils";
import { getRelatedBlogs } from "@/utils/serverside/blogsFunctions";
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
      <div className={`flex flex-col gap-[16px]`}>
        <div
          className={`${roboto_condensed.className} text-[18px] font-bold uppercase`}
        >
          Related
        </div>
        <div className={`flex gap-[16px] w-full flex-wrap`}>
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
      blog={post}
      className={`flex-1 group flex flex-col justify-start gap-[8px] basis-[128px] opacity-90 hover:opacity-100`}
    >
      <div className="relative w-full h-[168px] [object-fit:cover]">
        {post === "loading" && (
          <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
        )}
        {post !== "loading" && (
          <AwaitableImage
            fallBackStyles=""
            width={400}
            height={400}
            className={`w-full h-full [object-fit:cover]`}
            alt="blog image"
            src={post.picture?.url || ""}
          />
        )}
      </div>
      <>
        {post === "loading" && (
          <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
        )}
        {post !== "loading" && (
          <div
            className={`text-blue-600 group-hover:underline hover:text-cyan-600 text-[.9rem]`}
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
          <div className={`text-gray-500 text-[.9rem] justify-self-end`}>
            {formatCreationDate(post.creationDate)}
            <div>In "{post.mainTag}"</div>
          </div>
        )}
      </>
    </ClickableTitle>
  );
};
