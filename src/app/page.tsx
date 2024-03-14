import Navbar from "@/components/Navbar";
import Header from "@/components/Header/Header";
import HighlightedBlog from "./HighlightedBlog";

import http from "@/httpService";

export default async function Home() {
  const res = await http.get("recipe-index/api/random");
  const highlightedBlog = res.data;
  return (
    <div className="h-fit w-full">
      <Navbar />
      <Header />
      <HighlightedBlog blog={highlightedBlog} />
    </div>
  );
}
