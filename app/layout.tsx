import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter_Tight, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "GeoSpy Clone",
  description: "A GeoSpy clone application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="GeoSpy | Find a Photo's Location Instantly"
        />
        <meta
          property="og:description"
          content="Easily find a photo's location with GeoSpy, the AI-powered tool for precise photo 
          geolocation. Perfect for investigations, OSINT, and discovering where photos were taken."
        />
        <meta
          property="og:image"
          content="https://framerusercontent.com/images/20yadHUGf0XE6gnSVjmmtzhZ7vk.png"
        />
        <meta
          name="twitter:title"
          content="GeoSpy | Find a Photo's Location Instantly"
        />
        <meta
          name="twitter:description"
          content="Easily find a photo's location with GeoSpy, the AI-powered tool for precise photo 
          geolocation. Perfect for investigations, OSINT, and discovering where photos were taken."
        />
        <meta
          name="twitter:image"
          content="https://framerusercontent.com/images/20yadHUGf0XE6gnSVjmmtzhZ7vk.png"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${interTight.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
