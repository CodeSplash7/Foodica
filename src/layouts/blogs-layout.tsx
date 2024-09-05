import BackToTop from "@/components/BackToTop";

export default async function BlogsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex flex-col md:flex-row 
           gap-[16px] mt-[32px] max-w-[1200px]`}
    >
      {children}
      <BackToTop />
    </div>
  );
}
