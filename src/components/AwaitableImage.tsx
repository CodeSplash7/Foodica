"use client";
import { Skeleton, SxProps } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

interface AwaitableImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  skeletonClassName?: SxProps;
}

const AwaitableImage: React.FC<AwaitableImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  skeletonClassName
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return <Skeleton variant="rectangular" sx={skeletonClassName} />;
  }

  return (
    <div className={className}>
      {isLoading && (
        <Skeleton variant="rectangular" sx={skeletonClassName} />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "invisible w-0 h-0" : ""}`}
        onLoad={() =>( setIsLoading(false))}
      />
    </div>
  );
};

export default AwaitableImage;
