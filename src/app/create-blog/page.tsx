import BlogForm from "@/components/BlogForm/BlogForm";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";

export default async function CreateBlogPage({
  searchParams
}: {
  searchParams: any;
}) {
  const session = await getServerSession();
  return (
    <div className={`w-full h-fit flex flex-col items-center gap-[32px]`}>
      <Navbar />
      <Header showSearchBar={false} />
      <BlogForm
        session={session}
        hashId={searchParams.blog}
        forPurpose={searchParams.for}
      />
    </div>
  );
}
