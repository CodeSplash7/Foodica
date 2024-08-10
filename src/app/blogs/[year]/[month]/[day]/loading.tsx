import BlogList from "@/components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";

export default async function BlogPageLoading() {
  return (
    <div className={`flex flex-col gap-[32px] w-full`}>
      <div
        className={`flex flex-col md:flex-row 
                      gap-x-[16px] gap-y-[32px] mt-[32px] w-full`}
      >
        <BlogList blogs={"loading"} searchParams={{}} />
        <Sidebar />
      </div>
    </div>
  );
}
