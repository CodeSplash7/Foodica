"use client";

import { shortenText } from "@/utils/general-utils";
import React, { useState } from "react";

export default function CommentMessage({
  message,
  commentIndex,
  isTopComment,
  parentCommentIndex
}: {
  message: string;
  commentIndex: number;
  parentCommentIndex?: number;
  isTopComment: boolean;
}) {
  const visibleCharLimit = 200;
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div className={`w-full break-all  text-gray-700 tracking-wider leading-7`}>
      {!isReadMore
        ? replaceNewlinesWithBr(shortenText(message, visibleCharLimit))
        : replaceNewlinesWithBr(message)}
      {message.length > visibleCharLimit && (
        <div
          onClick={async () => {
            if (isReadMore) {
              smoothScrollToComment();
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

  function smoothScrollToComment() {
    let selector = isTopComment
      ? `comment${commentIndex}`
      : `comment${parentCommentIndex}reply${commentIndex}`;
    const comment = document.querySelector(`[id="${selector}"]`);
    if (comment) {
      comment.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function replaceNewlinesWithBr(str: string) {
  return str.split("\n").map((item, index) => (
    <React.Fragment key={index}>
      {item}
      {index < str.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
}
