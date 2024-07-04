import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";
import { getBlogs } from "@/utils/serverside/blogsFunctions";

export default async function MainBlogsSection() {
  const blogs = await getBlogs();
  return (
    <div
      className={`flex flex-col md:flex-row 
            gap-x-[16px] gap-y-[32px] mt-[32px] `}
    >
      <BlogList blogs={blogs} />
      <Sidebar />
    </div>
  );
}
