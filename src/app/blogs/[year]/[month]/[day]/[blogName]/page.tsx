import BlogsPageLayout from "@/app/blogs/layout";

function BlogPost({
  params
}: {
  params: { year: string; month: string; day: string; blogName: string };
}) {
  return <div className="text-black ">fasdfasdfasdf</div>;
}

BlogPost.getLayout = function getLayout(page: React.ReactNode) {
  return page
};

export default BlogPost