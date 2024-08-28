"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRender } from "@/components/RegisterForm/CustomInput";

import { LoadingIcon } from "@/components/Icons";
import CustomInput from "@/components/RegisterForm/CustomInput";
import InputField from "@/components/RegisterForm/inputField";
import { BlogComment, BlogReply } from "@/utils/allSides/blogsFunctions";

import Joi from "joi";
import { addCommentToBlog } from "@/utils/serverside/blogsFunctions";

import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

const commentSchema = Joi.string().label("Comment").max(1000).messages({
  "string.max": "Character limit is 1000."
});

interface CommentInputProps {
  blogId: string;
  userId: string | undefined;
  onAddComment: (content: string) => Promise<{ ok: false | true }>;
  commentAuthorName?: string;
  closeReply?: () => void;
}

// Used for comments and replies
export default function CommentInput({
  blogId,
  userId,
  commentAuthorName,
  closeReply,
  onAddComment
}: CommentInputProps) {
  const rerender = useRender();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitIsEnabled, setSubmitIsEnabled] = useState(false);
  const commentField = useMemo(createCommentField, [userId]);

  useEffect(
    () => setSubmitIsEnabled(!isLoading && !!commentField.value),
    [isLoading, commentField.value]
  );

  const handleSubmit = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);

    const commentContent = `${
      commentAuthorName ? "@" + commentAuthorName : ""
    } ${commentField.value}`;

    await delay(1500);
    if ((await onAddComment?.(commentContent)).ok) {
      commentField.setValue("");
    }
    setIsLoading(false);
    closeReply?.();
  }, [
    blogId,
    userId,
    commentAuthorName,
    commentField,
    onAddComment,
    closeReply
  ]);

  return (
    <div className={`flex flex-col gap-[16px]`}>
      <div className="flex justify-between items-center">
        <div className={`text-[24px] uppercase ${roboto_condensed.className}`}>
          {commentAuthorName
            ? `Reply to ${commentAuthorName}`
            : "Leave a Comment"}
        </div>
        {!!closeReply && <CloseReplyButton closeReply={closeReply} />}
      </div>
      <div>
        <CustomInput
          formRerender={rerender}
          focused
          showLabel={false}
          showError={false}
          inputField={commentField}
        />
      </div>
      {!!userId && (
        <PostCommentButton
          disabled={!submitIsEnabled}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );

  function createCommentField() {
    return new InputField<string, string>({
      label: "Comment",
      schema: commentSchema,
      type: "textarea",
      max: 1000,
      disabled: !userId,
      initialValue: !userId ? "Log in to write comments!" : ""
    });
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CloseReplyButton: React.FC<{ closeReply: () => void }> = ({
  closeReply
}) => {
  return (
    <button
      onClick={(e) => (e.preventDefault(), closeReply())}
      className={`transition duration-150 hover:bg-gray-700 uppercase bg-gray-800 w-fit self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white`}
    >
      Cancel
    </button>
  );
};

const PostCommentButton: React.FC<{
  handleSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
}> = ({ handleSubmit, isLoading, disabled }) => {
  return (
    <div className="w-full flex justify-between items-end">
      <button
        className={`transition duration-150 hover:bg-gray-700 uppercase bg-gray-800 w-fit self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white`}
        onClick={(e) => (e.preventDefault(), handleSubmit())}
        disabled={disabled}
      >
        Post Comment
      </button>
      {isLoading && (
        <div className="relative">
          <div className="flex gap-[16px] h-fit">
            Posting comment...
            <LoadingIcon w={24} />
          </div>
        </div>
      )}
    </div>
  );
};
