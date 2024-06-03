import "./styles.css";
import ReduxProvider from "@/store/redux-provider";
import { EdgeStoreProvider } from "../lib/edgestore";
import NextAuthSessionProvider from "@/lib/next-auth-session";

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
          <NextAuthSessionProvider>
            <EdgeStoreProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </EdgeStoreProvider>
          </NextAuthSessionProvider>
        </div>
      </body>
    </html>
  );
}
