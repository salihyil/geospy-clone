import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "GeoSpy | Advanced Geolocation Platform",
  description:
    "Enterprise-grade geolocation tracking and analytics platform for modern applications.",
};

export default function GeospyRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
