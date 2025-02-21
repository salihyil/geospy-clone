import { Loader2 } from "lucide-react";
import { ReactNode, Suspense } from "react";

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseBoundary({
  children,
  fallback,
}: SuspenseBoundaryProps) {
  const defaultFallback = (
    <div className="flex h-[200px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );

  return <Suspense fallback={fallback ?? defaultFallback}>{children}</Suspense>;
}
