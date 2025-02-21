// app/(geospy)/superbolt/_components/LoadingOverlay.tsx
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LoadingOverlay() {
  return (
    <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-background/50 dark:bg-black/50">
      <Card className="flex flex-col items-center gap-4 p-6">
        <Loader2 className="h-6 w-6 animate-spin text-foreground dark:text-white" />
        <p className="text-lg text-foreground dark:text-white">
          Analyzing image location...
        </p>
      </Card>
    </div>
  );
}
