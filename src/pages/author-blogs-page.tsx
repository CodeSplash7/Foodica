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

  let loggedUser = false;
  if (
    (await getUserByUrlName(params.authorName))?.account.email ===
    session?.user?.email
  ) {
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
              : `author: ${
                  (await getUserByUrlName(params.authorName))?.profile
                    .username || "Author not found!"
                }`
          }
        />
      </Suspense>
      <AuthorBlogsSection
        authorUser={await getUserByUrlName(params.authorName)}
      />
    </div>
  );
}
