import { Session } from "next-auth";
import { Blog } from "@/types/blog-types";
import { deleteBucketImage } from "@/server-utils/userFunctions";
import { createBlog } from "@/server-utils/blogsFunctions";
import { delay } from "@/general-utils/delay";
import { Picture } from "@/types/user-types";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { InputFields } from "./useInputFields";
import { useStringifyForm } from "./useStringifyForm";
import useBlogState from "./useBlogState";
import InputField from "@/general-utils/inputField";
import { BlogError } from "../blogError";

export default function useSubmitBlog(
  allFields: InputField<any, any>[],
  inputFields: InputFields,
  toUpdate: boolean,
  session: Session | null,
  author: string,
  blog?: Blog
) {
  const getRecipePicture = useRecipePicture(inputFields.blogPictureField);

  const { blogId, blogDate, postError, checkPostError } = useBlogState(
    allFields,
    toUpdate,
    session,
    blog
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlogSent, setIsBlogSent] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  return {
    isLoading,
    serverError,
    postError,
    submitBlog: async () => {
      try {
        const stringifyForm = useStringifyForm(author, blogDate, inputFields);
        allFields.forEach((f) => f.validate());
        if (checkPostError())
          throw new BlogError("Solve the input problems first!");
        if (isBlogSent) throw new BlogError("Blog is already being submitted");
        setIsBlogSent(true);
        setIsLoading(true);

        const recipePicture = await getRecipePicture();
        if (!recipePicture) {
          throw new BlogError("Failed to get recipe picture");
        }
        const stringJsonData = stringifyForm(recipePicture);
        const newBlog = await createBlog(stringJsonData, {
          update: toUpdate,
          id: blogId,
          authorEmail: session?.user?.email
        });

        if ("error" in newBlog) {
          throw new BlogError(newBlog.error);
        }

        await delay(1000);
        return newBlog;
      } catch (error) {
        if (error instanceof BlogError) {
          setServerError(error.message);
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsBlogSent(false);
        setIsLoading(false);
      }
    }
  };
}

export function useRecipePicture(blogPictureField: InputField<File, Picture>) {
  const { edgestore } = useEdgeStore();

  const getRecipePicture = async () => {
    try {
      if (!blogPictureField.modifiedValue) {
        return blogPictureField.initialValue;
      }
      const result = await uploadBlogImage();
      if (!result) {
        throw new Error("Failed to upload blog image");
      }
      return result;
    } catch (error) {
      blogPictureField.setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      return null;
    }
  };

  async function uploadBlogImage() {
    try {
      if (blogPictureField.value && blogPictureField.initialValue) {
        await deleteBucketImage(blogPictureField.initialValue.url);
      }
      if (blogPictureField.value) {
        return await edgestore.publicImages.upload({
          file: blogPictureField.value
        });
      }
      return null;
    } catch (error) {
      console.error("Error uploading blog image:", error);
      throw new Error("Failed to upload blog image");
    }
  }

  return getRecipePicture;
}
