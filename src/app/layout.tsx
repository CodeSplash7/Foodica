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
    <html lang="en">
      <Head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          as="style"
        />
      </Head>
      <body
        className={` bg-white w-screen h-fit flex flex-col items-center px-[32px]`}
      >
        <div className="w-full min-w-[200px] max-w-[1200px] h-screen">
          <NextAuthSessionProvider>
            <EdgeStoreProvider>
              <ReduxProvider>
                <div className={`flex flex-col h-fit w-full gap-[32px]`}>
                  <Navbar />
                  <Header />
                  {children}
                  <Footer />
                </div>
              </ReduxProvider>
            </EdgeStoreProvider>
          </NextAuthSessionProvider>
        </div>
      </body>
    </html>
  );
}
