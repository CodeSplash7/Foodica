import { getBlogs } from "@/server-utils/blogsFunctions";
import BlogList from "./Bloglist/Bloglist";
import { User } from "@/types/user-types";

export default async function AuthorBlogsSection({
  authorUser
}: {
  authorUser: User | undefined;
}) {
  if (!authorUser) return <div>Author not found!</div>;
  console.log(authorUser.blogs)
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
