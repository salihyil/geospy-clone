// app/(geospy)/superbolt/_components/LocationPanel.tsx
import { Button } from "@/components/ui/button";
import { LocationResult } from "@/lib/services/imageLocation";
import Image from "next/image";
import { LocationDetails } from "./LocationDetails";

interface LocationPanelProps {
  selectedImage: string;
  location: LocationResult | null;
  onNewSearch: () => void;
}

export function LocationPanel({
  selectedImage,
  location,
  onNewSearch,
}: LocationPanelProps) {
  return (
    <div className="flex h-full">
      <div className="pointer-events-auto w-[400px] bg-background/80 p-4 backdrop-blur-md dark:bg-background/20">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewSearch}
              className="text-sm text-foreground hover:bg-background/10 hover:text-foreground/80 dark:text-white dark:hover:bg-white/10"
            >
              ← New search
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-sm text-foreground hover:bg-background/10 hover:text-foreground/80 dark:text-white dark:hover:bg-white/10"
            >
              Export to PDF
            </Button>
          </div>

          <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={selectedImage}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>

          {location && <LocationDetails location={location} />}
        </div>
      </div>
    </div>
  );
}
