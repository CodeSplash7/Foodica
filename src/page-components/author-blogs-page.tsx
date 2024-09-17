import AuthorBlogsSection from "@/components/AuthorBlogsSection";
import MessageAboveBlogs from "@/components/MessageAboveBlogs";
import { getUserByUrlName } from "@/server-utils/userFunctions";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";

export default async function AuthorBlogsPage({
  params
}: {
  params: { authorName: string };
}) {
  const session = await getServerSession();
  const author = await getUserByUrlName(params.authorName);

  let loggedUser = false;
  if (author?.account.email === session?.user?.email) {
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
              : `author: ${author?.profile.username || "Author not found!"}`
          }
        />
      </Suspense>
      <AuthorBlogsSection authorUser={author} />
    </div>
  );
}
