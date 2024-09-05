"use client";

import { delay } from "@/general-utils/delay";
import { shortenText } from "@/general-utils/shortenText";
import React, { useState } from "react";

export default function CommentMessage({
  message,
  htmlCommentId
}: {
  message: string;
  htmlCommentId: string;
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
    const comment = document.querySelector(`[id="${htmlCommentId}"]`);
    if (comment) {
      comment.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function replaceNewlinesWithBr(str: string) {
  return str.split("\n").map((item, index) => (
    <React.Fragment key={index}>
      {item}
      {index < str.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
}
