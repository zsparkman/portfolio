import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Clarity } from "@/components/Clarity";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased">{children}</body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {CLARITY_ID && <Clarity projectId={CLARITY_ID} />}
    </html>
  );
}
