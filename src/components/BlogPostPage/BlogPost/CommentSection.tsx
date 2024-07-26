import { Blog, BlogComment } from "@/utils/allSides/blogsFunctions";
import CommentInput from "./CommentInput";
import BlogComments from "./BlogComments";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/utils/serverside/userFunctions";

export default async function CommentSection({
  blogId,
  blogComments
}: {
  blogId: string;
  blogComments: BlogComment[];
}) {
  const session = await getServerSession();
  const user = session?.user;
  const userId = (await getUserByEmail(user?.email))?.id;
  return (
    <div className={`flex flex-col gap-[32px]`}>
      <CommentInput blogId={blogId} userId={userId} />
      <BlogComments blogId={blogId} comments={blogComments} />
    </div>
  );
}
