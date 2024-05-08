export const HighlightedBlogImage = async ({ src }: { src: string }) => {
  //? ------< return statement >----------------
  return (
    <div
      style={{
        backgroundImage: `url('../../images/${src}')`,
        objectFit: "contain"
      }}
      className="z-0 absolute w-full md:w-3/5 h-full inset-0 bg-cover bg-center"
    ></div>
  );
  //? ------</ return statement >----------------
};
