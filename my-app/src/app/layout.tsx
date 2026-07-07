import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Incognito | Random chat with People ",
  description: "Chat anonymously with strangers around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
       
      <body >
        {children}</body>
    </html>
  );
}
