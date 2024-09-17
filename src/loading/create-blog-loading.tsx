"use server";
import BlogForm from "@/components/BlogForm/BlogForm";

export default async function CreateBlogLoading() {
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <BlogForm session={"loading"} blog={"loading"} actionType={"loading"} />
    </div>
  );
}
