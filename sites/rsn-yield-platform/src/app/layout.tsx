import type { Metadata } from "next";
import Link from "next/link";
import { Source_Sans_3, Source_Serif_4, Montserrat } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RSN Yield Platform",
  description:
    "Inventory, rate, and yield management for a regional sports network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F4F6F9] text-slate-900">
        <div
          aria-hidden
          className="fixed inset-x-0 top-0 z-50 h-[3px] bg-[#0F172A]"
        />
        <TopNav />
        <main className="mx-auto max-w-[1536px] px-6 py-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-[1536px] flex-col items-start gap-2 border-t border-[#E5E7EB] px-6 py-4 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
      <span>Sample data shown — for demonstration purposes only.</span>
      <Link
        href="https://zachsparkman.com"
        target="_blank"
        rel="noopener"
        className="font-semibold text-[#1F3A5F] hover:underline"
      >
        Built by Zach Sparkman
      </Link>
    </footer>
  );
}
