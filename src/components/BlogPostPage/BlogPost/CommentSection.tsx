import { Blog } from "@/utils/allSides/blogsFunctions";
import CommentInput from "./CommentInput";
import BlogComments from "./BlogComments";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/utils/serverside/userFunctions";

export default async function CommentSection({ blog }: { blog: Blog }) {
  const session = await getServerSession();
  const user = session?.user;
  const commenterId = (await getUserByEmail(user?.email))?.id;
  return (
    <div className={`flex flex-col gap-[32px]`}>
      <CommentInput blog={blog} commenterId={commenterId} />
      <BlogComments blog={blog} />
    </div>
  );
}
