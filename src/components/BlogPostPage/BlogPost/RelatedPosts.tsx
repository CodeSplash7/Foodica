import { getRelatedBlogs } from "@/server-utils/blogsFunctions";
import { Blog } from "@/types/blog-types";
import AwaitableImage from "@/components/AwaitableImage";
import Link from "next/link";
import ClickableTitle from "@/components/ClickableTitle";

export default async function RelatedPosts({
  blog
}: {
  blog: Blog | "loading";
}) {
  if (blog === "loading") return null;
  const relatedPosts = await getRelatedBlogs(blog.id, blog.mainTag, 3);
  
  return (
    <div className="w-full h-fit flex flex-row gap-4">
      {relatedPosts.map((post) => (
        <RelatedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function RelatedPostCard({ post }: { post: Blog }) {
  const creationDate = new Date(post.creationDate);
  const month = creationDate.toLocaleString('default', { month: 'long' });
  const day = creationDate.getDate();

  return (
    <ClickableTitle blog={post} type="text" addStyles="group flex-1">
      <div className="transition-opacity duration-300 group-hover:opacity-80">
        <AwaitableImage
          src={post.picture?.url}
          alt={post.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          skeletonClassName={{ width: '100%', height: '12rem' }}
        />
        <h3 className="mt-2 font-semibold group-hover:text-blue-500 transition-colors duration-300">
          {post.title}
        </h3>
        <span className="text-sm text-gray-600">
          {`${month} ${day}, in ${post.mainTag}`}
        </span>
      </div>
    </ClickableTitle>
  );
}
