"use client";
import CustomInput from "@/components/RegisterForm/CustomInput";
import InputField from "@/components/RegisterForm/inputField";
import { Blog } from "@/utils/allSides/blogsFunctions";
import Joi from "joi";
import { useState } from "react";

const commentSchema = Joi.string().label("Comment").max(1000).messages({
  "string.max": "Character limit is 1000."
});

export default function CommentInputField({ blog }: { blog: Blog }) {
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
      <div>Leave a Reply </div>
      <div>Your email address will not be published.</div>
      <div>
        <CustomInput showError={false} inputField={commentField} />
      </div>
      <div onClick={() => console.log("submit")}>Post Comment</div>
    </div>
  );
}
