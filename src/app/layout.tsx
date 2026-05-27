import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lumière Dental Studio — Boutique Dental Care",
    template: "%s · Lumière Dental Studio",
  },
  description:
    "A quiet, considered studio for cosmetic, restorative, and preventive dentistry. By appointment only.",
  metadataBase: new URL("https://lumiere-dental.vercel.app"),
  openGraph: {
    title: "Lumière Dental Studio",
    description: "Boutique dentistry. By appointment only.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
