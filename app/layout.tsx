import type { Metadata } from "next";

import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Inter } from "next/font/google";



const inter=Inter({subsets:['latin']})

export const metadata: Metadata = {
  title: "Jayalath Enterprises",
  description: "Jayalath Enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header/>
            <main className="min-h-screen pt-16">{children}</main>
          <Footer/>
      </body>
    </html>
  );
}
