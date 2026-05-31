import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { EnquiryWidget } from "@/components/site/enquiry-widget";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
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
    default: "Om Sai Dental Implant Center — Expert Implant Care in Dharan",
    template: "%s · Om Sai Dental Implant Center",
  },
  description:
    "Visit Om Sai Dental Implant Center for expert implant and periodontal care in Dharan, led by Consultant Periodontist Dr. Ajit Yadav. Call or WhatsApp to book.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Om Sai Dental Implant Center – Expert Implant Care in Dharan",
    description:
      "Get personalized dental implant and periodontal treatment from a trusted consultant periodontist. Easy phone or WhatsApp booking.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Sai Dental Implant Center – Expert Implant Care in Dharan",
    description:
      "Get personalized dental implant and periodontal treatment from a trusted consultant periodontist. Easy phone or WhatsApp booking.",
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
        <PostHogProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <EnquiryWidget />
          <Toaster position="bottom-right" />
        </PostHogProvider>
      </body>
    </html>
  );
}
