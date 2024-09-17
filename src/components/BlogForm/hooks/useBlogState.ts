import InputField from "@/general-utils/inputField";
import { Blog } from "@/types/blog-types";
import { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";

export default function useBlogState(
  allFields: InputField<any, any>[],
  toUpdate: boolean,
  session: Session | null | "loading",
  blog?: Blog | "loading"
) {
  const [blogId, setBlogId] = useState<string>();
  const [blogDate, setBlogDate] = useState<string>(Date.now().toString());
  const [postError, setPostError] = useState("");

  useEffect(() => {
    if (blog === "loading") return;
    if (!!blog && toUpdate) {
      setBlogId(blog.id);
      setBlogDate(blog.creationDate);
    }
  }, [session, blog, toUpdate]);

  useEffect(() => {
    checkPostError();
  });

  function checkPostError() {
    if (!isPostError()) {
      setPostError("");
      return false;
    } else {
      setPostError("Solve the input problems first!");
      return true;
    }
  }

  const isPostError = useCallback(() => {
    return !!allFields.find((f) => f.errorMessage);
  }, [allFields]);

  return { blogId, blogDate, postError, checkPostError };
}
