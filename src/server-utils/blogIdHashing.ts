"use server";

import crypto from "crypto";
import { getBlogs } from "./blogsFunctions";
import { Blog } from "../../general-utils/blogsFunctions";

const secret = process.env.ID_HASH_SECRET_KEY || "english_or_spanish";

export async function hashId(id: string) {
  const hash = crypto.createHmac("sha256", secret).update(id).digest("hex");
  return hash;
}

export async function verifyHash(id: string, hash: string) {
  const expectedHash = await hashId(id);
  return expectedHash === hash;
}

export async function findBlogFromHash(hash: string) {
  const allBlogs = await getBlogs();
  const blogFound: Blog | undefined = await findAsync(
    allBlogs,
    async (b: Blog) => verifyHash(b.id, hash)
  );
  return blogFound;
}

const findAsync = async <T>(
  arr: T[],
  asyncCallback: (item: T) => Promise<boolean>
): Promise<T | undefined> => {
  for (let item of arr) {
    if (await asyncCallback(item)) {
      return item;
    }
  }
  return undefined;
};
