import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/provider";
import GradientBackground from "@/components/background";
import Footer from "@/components/footer";

const font = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
});

export const metadata: Metadata = {
  title: "Bangers",
  description: "Create viral tweets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className}`}
      >
        <Providers>
        <Navbar/>
        {children}
        <Footer/>
        <GradientBackground/>
        </Providers>
      </body>
    </html>
  );
}
