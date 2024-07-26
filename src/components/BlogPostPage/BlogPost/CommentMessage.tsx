"use client";

import { shortenText } from "@/utils/general-utils";
import { useState } from "react";

export default function CommentMessage({
  message,
  commentIndex
}: {
  message: string;
  commentIndex: number;
}) {
  const visibleCharLimit = 200;
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div
      className={`[overflow-wrap:break-word] text-gray-700 tracking-wider leading-7`}
    >
      {!isReadMore ? shortenText(message, visibleCharLimit) : message}
      {message.length > visibleCharLimit && (
        <div
          onClick={async () => {
            if (isReadMore) {
              smoothScrollToComment(commentIndex);
              await delay(300);
            }
            setIsReadMore(!isReadMore);
          }}
          className={`w-fit transition duration-150 hover:text-gray-500 text-[0.9rem] italic text-black mt-[8px]`}
        >
          {isReadMore ? "Read less" : "Read more"}
        </div>
      )}
    </div>
  );

  function smoothScrollToComment(commentIndex: number) {
    const comment = document.querySelector(`[id="comment${commentIndex}"]`);
    if (comment) {
      comment.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
