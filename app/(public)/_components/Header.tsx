"use client";

import { HeaderActions } from "@/app/(public)/_components/HeaderActions";
import { HeaderContent } from "@/app/(public)/_components/HeaderContent";
import { MobileActions } from "@/app/(public)/_components/MobileActions";
import { SearchDialog } from "@/app/(public)/_components/SearchDialog";
import { cn } from "@/lib/utils";
import { useHeaderStore } from "@/store/useHeaderStore";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const {
    mounted,
    scrolled,
    searchOpen,
    setMounted,
    setScrolled,
    setSearchOpen,
  } = useHeaderStore();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  const checkScroll = useCallback(() => {
    if (pathname !== "/") return;

    const contactSection = document.querySelector("#contact-section");
    if (!contactSection) return;

    const contactSectionTop = contactSection.getBoundingClientRect().top;
    setScrolled(contactSectionTop <= 0);
  }, [pathname, setScrolled]);

  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(false);
      return;
    }

    const handleScroll = () => {
      window.requestAnimationFrame(checkScroll);
    };

    checkScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setScrolled(false);
    };
  }, [pathname, checkScroll, setScrolled]);

  if (!mounted) return null;

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 px-5 pt-5 transition-all duration-300"
      role="banner"
    >
      <div className="flex h-16 items-center justify-center">
        <div
          className={cn(
            "mx-auto flex w-full transform-gpu items-center justify-between rounded-xl border bg-white px-5 py-4 shadow-md transition-all duration-500 ease-in-out dark:bg-background",
            scrolled
              ? "max-w-[800px] rounded-full px-3 py-2"
              : "max-w-[1200px]",
          )}
        >
          <HeaderContent scrolled={scrolled} />
          <HeaderActions scrolled={scrolled} />
          <MobileActions />
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
