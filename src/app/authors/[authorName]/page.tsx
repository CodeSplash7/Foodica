import BlogList from "@/components/Bloglist/Bloglist";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import { User } from "@/utils/allSides/usersFunctions";
import { getBlogs } from "@/utils/serverside/blogsFunctions";
import { getUserByUrlName } from "@/utils/serverside/userFunctions";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";

export default async function AuthorPage({
  params
}: {
  params: { authorName: string };
}) {
  const authorUser = await getUserByUrlName(params.authorName);
  const session = await getServerSession();
  let loggedUser = false;
  if (authorUser?.account.email === session?.user?.email) {
    loggedUser = true;
  }

  return (
    <div className={`flex flex-col gap-[32px]`}>
      <Suspense>
        <MessageAboveBlogs
          searchParams={{ author: params.authorName }}
          msg={
            loggedUser
              ? "Your blogs"
              : `author: ${authorUser?.profile.username || "Author not found!"}`
          }
        />
      </Suspense>
      <AuthorBlogsSection authorUser={authorUser} />
    </div>
  );
}

async function AuthorBlogsSection({
  authorUser
}: {
  authorUser: User | undefined;
}) {
  if (!authorUser) return <div>Author not found!</div>;
  if (authorUser.blogs.length === 0)
    return <div>This author hasn't posted any blogs yet!</div>;
  return (
    <BlogList
      blogs={await getBlogs()}
      searchParams={{}}
      ids={authorUser.blogs}
    />
  );
}
