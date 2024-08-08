import BlogForm from "@/components/BlogForm/BlogForm";

export default function LoadingBlogForm() {
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <BlogForm session={"loading"} blog={"loading"} forPurpose={"loading"} />
    </div>
  );
}
