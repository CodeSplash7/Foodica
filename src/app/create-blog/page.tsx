import BlogForm from "@/components/BlogForm/BlogForm";
import { getServerSession } from "next-auth";

export default async function CreateBlogPage({
  searchParams
}: {
  searchParams: { blog: string; for: string };
}) {
  const session = await getServerSession();
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <BlogForm
        session={session}
        hashId={searchParams.blog}
        forPurpose={searchParams.for}
      />
    </div>
  );
}
