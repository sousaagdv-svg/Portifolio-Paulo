import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAULO SILVA — PORTFÓLIO 2025 | Videomaker & Editor",
  description: "Portfólio profissional de Paulo Silva, videomaker e editor de conteúdo especializado em narrativa visual, edição cinematográfica e conteúdo digital.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
