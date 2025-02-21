"use client";

import { DesktopNav } from "@/app/(public)/_components/DesktopNav";
import { Logo } from "@/app/(public)/_components/Logo";

interface HeaderContentProps {
  scrolled: boolean;
}

export const HeaderContent = ({ scrolled }: HeaderContentProps) => (
  <div className="flex items-center gap-8">
    <Logo scrolled={scrolled} />
    <DesktopNav />
  </div>
); 