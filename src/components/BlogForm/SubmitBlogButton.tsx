import { Button1, Button2 } from "@/utils/styled-buttons";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  weight: "600",
  subsets: ["latin"]
});

export function SubmitBlogButton({
  toUpdate,
  submitPost
}: {
  toUpdate: boolean;
  submitPost: (e: React.FormEvent) => Promise<void>;
}) {
  return (
    <Button1 onClick={submitPost}>
      {toUpdate ? "Update Blog Post" : "Create Blog Post"}
    </Button1>
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
    <Button2 onClick={deletePost}>{toUpdate ? "DELETE" : "CANCEL"}</Button2>
  );
}
