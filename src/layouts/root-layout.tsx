import "@/style/styles.css";
import { EdgeStoreProvider } from "../lib/edgestore";
import NextAuthSessionProvider from "@/lib/next-auth-session";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <EdgeStoreProvider>
        <html lang="en" className="h-auto w-full *:box-border">
          <body
            className={`bg-white w-full overflow-x-hidden h-auto flex flex-col items-center px-[32px] gap-[32px]`}
          >
            <Navbar />
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </EdgeStoreProvider>
    </NextAuthSessionProvider>
  );
}
