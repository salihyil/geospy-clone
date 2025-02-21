import Footer from "@/app/(public)/_components/Footer";
import Header from "@/app/(public)/_components/Header";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoSpy | Find a Photo's Location Instantly",
  description:
    "Upload a photo and instantly discover where it was taken using our advanced AI-powered location detection technology.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 pt-[72px]">{children}</div>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
