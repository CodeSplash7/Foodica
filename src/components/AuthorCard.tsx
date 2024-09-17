import AwaitableImage from "@/components/AwaitableImage";
import Link from "next/link";
import ClickableName from "@/components/ClickableName";
import { authorNamePageLink } from "@/general-utils/app-routes";
import RecentPostsAccordion from "@/components/RecentPostsAccordion";
import { User } from "@/types/user-types";
import { Blog } from "@/types/blog-types";

export default async function AuthorCard({
  user,
  blogs
}: {
  user: User;
  blogs: Blog[];
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-fit">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href={authorNamePageLink(user.profile.username)}>
            <AwaitableImage
              src={user.profile.profilePicture?.thumbnailUrl}
              alt={`${user.profile.username}'s profile picture`}
              width={48}
              height={48}
              className="rounded-full mr-3 w-12 h-12 object-cover"
              skeletonClassName={{
                width: 48,
                height: 48,
                borderRadius: "9999px"
              }}
            />
          </Link>
          <div className="flex flex-col">
            <ClickableName addStyles="text-lg font-semibold">
              {user.profile.username}
            </ClickableName>
            <span className="w-fit bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {user.blogs.length} blogs
            </span>
          </div>
        </div>
        {blogs.length > 0 ? (
          <RecentPostsAccordion
            blogs={blogs}
            username={user.profile.username}
          />
        ) : (
          <div className="w-full text-left py-2 px-4 bg-gray-100 rounded-md mt-4">
            This author hasn&apos;t posted any blogs yet.
          </div>
        )}
      </div>
    </div>
  );
}
