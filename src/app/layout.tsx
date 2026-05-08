import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Clarity } from "@/components/Clarity";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zachary E. Sparkman",
  description:
    "Monetization strategist and product builder — RSNs, CTV, and live sports ad yield.",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} antialiased`}
    >
      <body className="bg-[#F4F6F9] text-slate-800">
        <div
          aria-hidden
          className="fixed inset-x-0 top-0 z-50 h-[3px] bg-[#0F172A] print:hidden"
        />
        {children}
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {CLARITY_ID && <Clarity projectId={CLARITY_ID} />}
    </html>
  );
}
