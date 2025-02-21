"use client";

import { ThemeToggle } from "@/app/(public)/_components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHeaderStore } from "@/store/useHeaderStore";
import { Search } from "lucide-react";
import Link from "next/link";

interface HeaderActionsProps {
  scrolled: boolean;
}

export const HeaderActions = ({ scrolled }: HeaderActionsProps) => {
  const { setSearchOpen } = useHeaderStore();

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <ThemeToggle />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSearchOpen(true)}
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </Button>
      <Link
        href="/geospy"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap bg-black font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90",
          scrolled
            ? "h-9 rounded-full px-4 text-sm"
            : "h-11 rounded-lg px-8 text-base",
          "transition-all duration-300",
        )}
      >
        Try GeoSpy
      </Link>
    </div>
  );
};
