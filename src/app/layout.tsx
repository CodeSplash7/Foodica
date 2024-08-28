import "./styles.css";
import ReduxProvider from "@/store/redux-provider";
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
        <ReduxProvider>
          <html lang="en" className="h-auto w-screen *:box-border overflow-x-hidden">
            <Head>
              <link
                rel="preload"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
                as="style"
              />
            </Head>
            <body
              className={`bg-white w-full h-auto flex flex-col items-center px-[32px] gap-[32px]`}
            >
              <Navbar />
              <Header />
              {children}
              <Footer />
            </body>
          </html>
        </ReduxProvider>
      </EdgeStoreProvider>
    </NextAuthSessionProvider>
  );
}
