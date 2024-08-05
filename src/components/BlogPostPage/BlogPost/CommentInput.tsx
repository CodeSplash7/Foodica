"use client";
import { LoadingIcon } from "@/components/Icons";
import CustomInput, { useRender } from "@/components/RegisterForm/CustomInput";
import InputField from "@/components/RegisterForm/inputField";
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

// Used for comments and replies
export default function CommentInput({
  blogId,
  userId,
  commentAuthorName,
  parentCommentId,
  closeReply
}: {
  blogId: string;
  userId: string | undefined;
  parentCommentId?: string;
  commentAuthorName?: string;
  closeReply?: () => void;
}) {
  const rerender = useRender();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [commentField] = useState(
    new InputField<string, string>({
      label: "Comment",
      schema: commentSchema,
      type: "textarea",
      max: 1000,
      disabled: !userId,
      initialValue: !userId ? "Log in to write comments!" : ""
    })
  );

  return (
    <div className={`flex flex-col gap-[16px]`}>
      <div className="flex justify-between items-center">
        <div className={`text-[24px] uppercase ${roboto_condensed.className}`}>
          {commentAuthorName
            ? `Reply to ${commentAuthorName}`
            : "Leave a Comment"}
        </div>
        {closeReply && <CloseReply closeReply={closeReply} />}
      </div>
      <div>
        <CustomInput
          showLabel={false}
          showError={false}
          inputField={commentField}
        />
      </div>
      {!!userId && <PostComment handleSubmit={handleSubmit} />}
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
      blogId,
      userId!,
      `${commentAuthorName ? "@" + commentAuthorName : ""} ${
        commentField.value
      }`,
      parentCommentId
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
    closeReply?.();
    rerender();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CloseReply: React.FC<{ closeReply: () => void }> = ({ closeReply }) => {
  return (
    <div
      onClick={closeReply}
      className={`transition duration-150 hover:bg-gray-700 uppercase bg-gray-800 w-fit self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white`}
    >
      Cancel
    </div>
  );
};

const PostComment: React.FC<{ handleSubmit: () => void }> = ({
  handleSubmit
}) => {
  return (
    <div
      className={`transition duration-150 hover:bg-gray-700 uppercase bg-gray-800 w-fit self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white`}
      onClick={handleSubmit}
    >
      Post Comment
    </div>
  );
};
