import BlogForm from "@/components/BlogForm/BlogForm";
import { findBlogFromHash } from "@/utils/serverside/blogIdHashing";
import { getServerSession } from "next-auth";

export default async function CreateBlogPage({
  searchParams
}: {
  searchParams: { blog: string; for: string };
}) {
  const session = await getServerSession();
  const blog = await findBlogFromHash(searchParams.blog);
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <BlogForm session={session} blog={blog} forPurpose={searchParams.for} />
    </div>
  );
}
