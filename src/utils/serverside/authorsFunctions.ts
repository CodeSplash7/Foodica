import { getUserById } from "@/utils/serverside/userFunctions";
import { BlogComment } from "@/utils/allSides/blogsFunctions";
import { User } from "@/utils/allSides/usersFunctions";

interface AuthorCache {
  [userId: string]: User;
}

const authorCache: AuthorCache = {};

export async function fetchAuthor(userId: string): Promise<User | null> {
  if (authorCache[userId]) {
    return authorCache[userId];
  }
  const author = await getUserById(userId);
  if (!author) return null;
  authorCache[userId] = author;
  return author;
}

export async function fetchAllAuthors(
  comments: BlogComment[]
): Promise<Map<string, User | null>> {
  const uniqueUserIds = Array.from(new Set(comments.map((c) => c.userId)));
  const authors = await Promise.all(uniqueUserIds.map(fetchAuthor));
  return new Map(uniqueUserIds.map((id, index) => [id, authors[index]]));
}
