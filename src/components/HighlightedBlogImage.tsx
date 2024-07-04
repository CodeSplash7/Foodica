import Image from "next/image";

export const HighlightedBlogImage = ({ src }: { src: string }) => {
  return (
    <div className="z-0 absolute w-full md:w-3/5 h-full inset-0">
      <Image
        alt="blog image"
        src={src} 
        layout="fill" 
        objectFit="cover" 
        className="bg-cover bg-center" 
      />
    </div>
  );
};
