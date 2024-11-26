import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Notinews",
  description: "Notinews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"></meta>
      <body
        className={`${outfit.className} antialiased min-h-screen flex flex-col space-between min-w-screen bg-primary text-primary overflow-x-hidden`}>
        <Header />
        <section className="flex-grow">{children}</section>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
