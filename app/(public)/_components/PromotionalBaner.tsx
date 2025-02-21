import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PromotionalBaner = () => {
  return (
    <section className="container flex flex-col items-center justify-center p-20">
      <div className="flex items-center gap-5 rounded-full border bg-background p-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            New
          </span>
          <span className="font-interTight text-sm text-[#52525B]">
            Checkout SuperBolt our new AI model for meter level accuracy
          </span>
          <Button variant="ghost" size="sm" className="flex-shrink-0" asChild>
            <Link href="/try">
              Try Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
