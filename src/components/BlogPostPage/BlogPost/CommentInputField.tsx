"use client";
import { LoadingIcon } from "@/components/Icons";
import CustomInput, { useRender } from "@/components/RegisterForm/CustomInput";
import InputField from "@/components/RegisterForm/inputField";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { addCommentToBlog } from "@/utils/serverside/blogsFunctions";
import Joi from "joi";
import { useState } from "react";

const commentSchema = Joi.string().label("Comment").max(1000).messages({
  "string.max": "Character limit is 1000."
});

export default function CommentInput({
  blog,
  authorId
}: {
  blog: Blog;
  authorId: string;
}) {
  const rerender = useRender();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [commentField] = useState(
    new InputField<string, string>({
      label: "Comment",
      schema: commentSchema,
      type: "textarea",
      max: 1000
    })
  );
  return (
    <div>
      <div>Leave a Comment</div>
      <div>Your email address will not be published.</div>
      <div>
        <CustomInput
          showLabel={false}
          showError={false}
          inputField={commentField}
        />
      </div>
      <div onClick={handleSubmit}>Post Comment</div>
      <div className="relative">
        <div className="absolute flex gap-[16px] ">
          {isLoading && (
            <>
              Posting comment...
              <LoadingIcon w={24} />
            </>
          )}
        </div>
      </div>
    </div>
  );

  async function handleSubmit() {
    addCommentToBlog(
      { userId: authorId, message: commentField.value },
      blog.id
    );
    commentField.setValue("");
    rerender();
    await handleSubmittingAnimation();
  }

  async function handleSubmittingAnimation() {
    setIsLoading(true);
    rerender();
    await delay(1500);
    setIsLoading(false);
    rerender();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
