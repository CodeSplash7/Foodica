import { Blog, BlogComment } from "@/utils/allSides/blogsFunctions";
import CommentInput from "./CommentInput";
import BlogComments from "./BlogComments";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/utils/serverside/userFunctions";

export default async function CommentSection({
  blog
}: {
  blog: Blog | "loading";
}) {
  let userId: string | undefined;
  if (blog === "loading") {
    let session = await getServerSession();
    let user = session?.user;
    userId = (await getUserByEmail(user?.email))?.id;
  }
  return (
    <div className={`w-full flex flex-col gap-[32px]`}>
      <CommentInput
        blogId={blog === "loading" ? "loading" : blog.id}
        userId={userId || "loading"}
      />
      <BlogComments
        blogId={blog === "loading" ? "loading" : blog.id}
        comments={blog === "loading" ? "loading" : blog.comments}
      />
    </div>
  );
}
