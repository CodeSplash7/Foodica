"use client";
import "./styles.css";
import ReduxProvider from "@/store/redux-provider";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-white w-screen h-fit flex flex-col items-center px-[32px]">
        <div className="w-full min-w-[200px] max-w-[1200px] h-screen">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
