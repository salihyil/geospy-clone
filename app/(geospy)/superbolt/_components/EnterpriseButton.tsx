// app/(geospy)/superbolt/_components/EnterpriseButton.tsx
import { Button } from "@/components/ui/button";

export function EnterpriseButton() {
  return (
    <div className="pointer-events-auto absolute right-4 top-4">
      <Button
        variant="outline"
        className="border-foreground/20 bg-background/10 text-foreground hover:bg-background/20 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      >
        Enterprise? <span className="ml-2">Partner with us</span>
      </Button>
    </div>
  );
}
