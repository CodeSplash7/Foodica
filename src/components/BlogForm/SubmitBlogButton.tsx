import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

export function SubmitBlogButton({ toUpdate }: { toUpdate: boolean }) {
  return (
    <button
      className={`mt-[16px] self-start ${roboto_condensed.className} rounded-sm px-[22px] py-[12px] text-white bg-gray-800`}
    >
      {toUpdate ? "Update Blog Post" : "Create Blog Post"}
    </button>
  );
}
export function DeleteBlogButton({
  toUpdate,
  deletePost
}: {
  toUpdate: boolean;
  deletePost: () => void;
}) {
  return (
    <div
      onClick={deletePost}
      className={`mt-[16px] self-start ${
        roboto_condensed.className
      } rounded-sm px-[22px] py-[12px] text-white
        ${toUpdate ? "bg-red-800" : "bg-gray-500"}
      `}
    >
      {toUpdate ? "Delete Blog Post" : "Cancel Creation"}
    </div>
  );
}
