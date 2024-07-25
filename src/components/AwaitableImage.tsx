"use client";
import Image from "next/image";
import React, { useState } from "react";

type AwaitableImageProps = {
  fallBackStyles: string;
  className: string;
  alt: string;
  src: string | null;
  width: number;
  height: number;
};
const AwaitableImage: React.FC<AwaitableImageProps> = ({
  fallBackStyles,
  className,
  alt,
  src,
  width,
  height
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {(isLoading || src === null) && (
        <div className={fallBackStyles}>Loading ...</div>
      )}
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
