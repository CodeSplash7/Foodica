import { blogLinkByBlog } from "@/general-utils/app-routes";
import { delay } from "@/general-utils/delay";
import { Blog } from "@/types/blog-types";
import { useRouter } from "next/navigation";

export default function useNavigateToBlog() {
  const router = useRouter();

  return async (newBlog: Blog) => {
    const href = blogLinkByBlog(newBlog);
    await delay(1000);
    router.push(href);
  };
}
