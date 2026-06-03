import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImAgents AI — Intelligent Agent Solutions",
  description: "ImAgents AI adalah startup yang mengembangkan aplikasi dan program berbasis AI Agent. Dari produk siap pakai hingga prototype — kami siap membantu Anda berinovasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}>
      <body className="h-full flex flex-col bg-[#070403] text-foreground font-sans grid-bg scrollbar-thin">
        {children}
      </body>
    </html>
  );
}
