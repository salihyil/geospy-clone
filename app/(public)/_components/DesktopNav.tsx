"use client";

import Dropdown from "@/app/(public)/_components/Dropdown";
import { industriesItems } from "@/constant/industries";
import { productsItems } from "@/constant/products";
import Link from "next/link";

export const DesktopNav = () => (
  <nav className="hidden items-center gap-6 lg:flex" role="navigation">
    <Link
      href="#"
      className="text-sm font-medium transition-all duration-300 hover:text-foreground"
    >
      Company
    </Link>
    <Dropdown
      variant="default"
      maxWidth="sm"
      trigger={
        <button className="flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:text-foreground">
          Industries
        </button>
      }
      items={industriesItems}
    />
    <Dropdown
      variant="grouped"
      maxWidth="xl"
      groupBy={(item) => item.group || "default"}
      trigger={
        <button className="flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:text-foreground">
          Products
        </button>
      }
      items={productsItems}
    />
    <Link
      href="#"
      className="text-sm font-medium transition-all duration-300 hover:text-foreground"
    >
      API
    </Link>
    <div className="flex items-center gap-1">
      <Link
        href="/superbolt"
        className="text-sm font-medium transition-all duration-300 hover:text-foreground"
      >
        Superbolt
      </Link>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
        New
      </span>
    </div>
  </nav>
); 