export default async function AuthorBlogsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex flex-col md:flex-row 
           gap-[16px] mt-[32px] max-w-[1200px] `}
    >
      {children}
    </div>
  );
}
