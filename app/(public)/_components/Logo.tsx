"use client";

import Link from "next/link";

interface LogoProps {
  scrolled: boolean;
}

export const Logo = ({ scrolled }: LogoProps) => (
  <Link href="/" className="flex items-center gap-2">
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20" />
    </svg>
    <span
      className={`transform-gpu overflow-hidden text-2xl font-semibold transition-all duration-300 ${
        scrolled
          ? "max-w-0 scale-0 opacity-0"
          : "max-w-[200px] scale-100 opacity-100"
      }`}
    >
      GeoSpy
    </span>
  </Link>
);
