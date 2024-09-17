import { getUsers } from "@/server-utils/userFunctions";
import { User } from "@/types/user-types";
import { getBlogsByIds } from "@/server-utils/blogsFunctions";
import { Blog } from "@/types/blog-types";
import { Roboto_Condensed } from "next/font/google";
import AuthorCard from "@/components/AuthorCard";

const roboto_condensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"]
});

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function AuthorsPage() {
  const users: User[] = await getUsers();
  const userBlogs: { [key: string]: Blog[] } = {};

  for (const user of users) {
    if (user.blogs && user.blogs.length > 0) {
      userBlogs[user.id] = await getBlogsByIds(user.blogs.slice(0, 4));
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className={`text-4xl font-bold mb-8 text-center ${roboto_condensed.className}`}
      >
        Our Authors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-max">
        {users.map((user) => (
          <AuthorCard
            key={user.id}
            user={user}
            blogs={userBlogs[user.id] || []}
          />
        ))}
      </div>
    </div>
  );
}
