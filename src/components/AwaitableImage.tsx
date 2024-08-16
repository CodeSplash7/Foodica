"use client";
import { Skeleton, SxProps } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

type AwaitableImageProps = {
  className: string;
  alt: string;
  src: string | null;
  width: number;
  height: number;
  loadingSkeletonLayout: SxProps;
};
const AwaitableImage: React.FC<AwaitableImageProps> = ({
  className,
  alt,
  src,
  width,
  height,
  loadingSkeletonLayout
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className={`relative w-full`}>
        {(isLoading || src === null) && (
          <Skeleton
            variant="rounded"
            sx={{
              ...loadingSkeletonLayout,
              position: "absolute",
              top: "0px",
              left: "0px"
            }}
          />
        )}
      </div>
      {!!src && (
        <Image
          onLoad={handleImageLoad}
          className={`${className} ${isLoading ? "opacity-0" : "opacity-100"}`}
          alt={alt}
          src={src}
          width={width}
          height={height}
        />
      )}
    </>
  );
};

export default AwaitableImage;
