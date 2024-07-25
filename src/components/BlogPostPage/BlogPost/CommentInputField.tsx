"use client";
import { LoadingIcon } from "@/components/Icons";
import CustomInput, { useRender } from "@/components/RegisterForm/CustomInput";
import InputField from "@/components/RegisterForm/inputField";
import { Blog } from "@/utils/allSides/blogsFunctions";
import { addCommentToBlog } from "@/utils/serverside/blogsFunctions";
import Joi from "joi";
import { useState } from "react";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

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
    <div className={`flex flex-col gap-[16px]`}>
      <div className={`text-[24px] uppercase ${roboto_condensed.className}`}>
        Leave a Comment
      </div>
      <div>
        <CustomInput
          showLabel={false}
          showError={false}
          inputField={commentField}
        />
      </div>
      <div
        className={`transition duration-150 hover:bg-gray-700 uppercase bg-gray-800 w-fit self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white
      `}
        onClick={handleSubmit}
      >
        Post Comment
      </div>
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
