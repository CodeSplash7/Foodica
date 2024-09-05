import BlogForm from "@/components/BlogForm/BlogForm";
import { findBlogFromHash } from "@/server-utils/blogIdHashing";
import { getServerSession } from "next-auth";

export default async function CreateBlogPage({
  searchParams
}: {
  searchParams: { blog: string; actionType: string };
}) {
  const session = await getServerSession();
  const blog = await findBlogFromHash(searchParams.blog);
  return (
    <div
      className={`w-full h-fit flex flex-col items-center gap-[32px] max-w-[1200px]`}
    >
      <BlogForm
        session={session}
        blog={blog}
        actionType={searchParams.actionType}
      />
    </div>
  );
}
