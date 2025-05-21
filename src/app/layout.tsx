import type { Metadata } from "next";
import { Geist, Geist_Mono, Lobster } from "next/font/google";
import "./globals.css";
import BlankEndSpace from "@/Parts/Footer/BlankEndSpace";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Michael und Corinna Heiraten",
  description: "Offiziele Website rund um die Hochzeit von Michael und Corinna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scrollbar-thin">
      <body
        className={`${lobster.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full xl:w-320 mx-auto xl:my-2 shadow-[gray_0px_0px_10px_5px] dark:shadow-[black_0px_0px_10px_5px]">
          {children}
        </div>
        <BlankEndSpace/>
      </body>
    </html>
  );
}
