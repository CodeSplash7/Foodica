import { Blog } from "@/types/blog-types";
import { Session } from "next-auth";
import { Form, FormHeader } from "../BlogForm";

export default function useFormFallback(
  session: Session | null | "loading",
  blog: Blog | undefined | "loading",
  actionType: string | "loading"
) {
  if (blog === "loading" || session === "loading" || actionType === "loading")
    return {
      res: null,
      fallback: (
        <Form>
          <FormHeader toUpdate="loading" />
        </Form>
      )
    };
  const author = session?.user?.name;
  if (!author)
    return {
      res: null,
      fallback: (
        <div>You can&apos;t create blogs unless so log in into an account!</div>
      )
    };
  return { res: author, fallback: null };
}
