import { SuspenseBoundary } from "@/components/ui/suspense-boundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoSpy | Advanced Geolocation Platform",
  description:
    "Enterprise-grade geolocation tracking and analytics platform for modern applications.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuspenseBoundary>{children}</SuspenseBoundary>;
}
