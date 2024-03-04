import "./styles.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap"
        />
      </head>
      <body className="bg-white w-screen h-fit flex flex-col items-center px-[32px]">
        <div className="w-full min-w-[200px] max-w-[1200px] h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
