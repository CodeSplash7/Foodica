import Navbar from "@/components/Navbar";
import Header from "@/components/Header/Header";
import HighlightedBlog from "../../HighlightedBlog";
import BlogList from "../../../components/Bloglist/Bloglist";
import Sidebar from "@/components/Sidebar";

import http from "@/httpService";

export default async function Home({ params }: { params: { id: string } }) {
  const res = await http.get("blogs/api/random");
  const highlightedBlog = res.data;

  return (
    <div className={`h-fit w-full`}>
      <Navbar />
      <Header />
      <HighlightedBlog blog={highlightedBlog} />
      <div
        className={`flex flex-col md:flex-row 
           gap-[16px] mt-[32px] `}
      >
        <BlogList currentDivision={Number(params.id)} />
        <Sidebar />
      </div>
    </div>
  );
}
