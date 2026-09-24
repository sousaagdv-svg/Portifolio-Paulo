import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAULO SILVA — PORTFOLIO 2025 | Video Maker & Editor",
  description: "Professional portfolio of Paulo Silva, Video Editor & Content Creator specializing in visual storytelling, cinematic editing, and digital content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050608] text-[#F2F2F2] selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
