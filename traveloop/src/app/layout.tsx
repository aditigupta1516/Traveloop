// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: {
    default: "Traveloop — AI-Powered Travel Planning",
    template: "%s | Traveloop",
  },
  description:
    "Plan your perfect trip with Traveloop — AI-powered itinerary builder, collaborative trip planning, smart budgeting, and stunning destination discovery.",
  keywords: ["travel planning", "itinerary builder", "AI travel", "trip organizer", "budget travel"],
  authors: [{ name: "Traveloop" }],
  creator: "Traveloop",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Traveloop — AI-Powered Travel Planning",
    description: "Plan your perfect trip with Traveloop",
    siteName: "Traveloop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveloop — AI-Powered Travel Planning",
    description: "Plan your perfect trip with Traveloop",
    creator: "@traveloop",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#3a6bff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen bg-surface-950 text-surface-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
