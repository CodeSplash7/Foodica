import Image from "next/image";

export const HighlightedBlogImage = ({ src }: { src: string }) => {
  return (
    <div className="z-0 absolute w-full md:w-3/5 h-full inset-0">
      <Image
        alt="blog image"
        src={`/images/blogImages/${src}`} // Make sure the image path is relative to the "public" directory
        layout="fill" // This ensures the image covers the entire container
        objectFit="cover" // Set the desired object-fit behavior
        className="bg-cover bg-center" // Apply any additional styles you need
      />
    </div>
  );
};
