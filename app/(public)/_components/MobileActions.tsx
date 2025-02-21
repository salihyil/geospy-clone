"use client";

import { ThemeToggle } from "@/app/(public)/_components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useHeaderStore } from "@/store/useHeaderStore";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

export const MobileActions = () => {
  const { setSearchOpen } = useHeaderStore();

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <ThemeToggle />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSearchOpen(true)}
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-4" role="navigation">
            <Link
              href="#"
              className="text-sm font-medium transition-all duration-300 hover:text-foreground"
            >
              Company
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-all duration-300 hover:text-foreground"
            >
              Industries
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-all duration-300 hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-all duration-300 hover:text-foreground"
            >
              API
            </Link>
            <Link
              href="/superbolt"
              className="text-sm font-medium transition-all duration-300 hover:text-foreground"
            >
              Superbolt
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                New
              </span>
            </Link>
            <Link
              href="/geospy"
              className="mt-4 inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-lg bg-black px-8 font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Try GeoSpy
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
