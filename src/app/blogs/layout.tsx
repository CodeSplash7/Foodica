import Navbar from "@/components/Navbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default async function BlogsPageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-fit w-full`}>
      <Navbar />
      <Header />
      <div
        className={`flex flex-col md:flex-row 
           gap-[16px] mt-[32px] `}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
