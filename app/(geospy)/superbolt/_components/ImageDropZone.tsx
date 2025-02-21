import { Card } from "@/components/ui/card";

// components/superbolt/image-drop-zone.tsx
interface ImageDropZoneProps {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

export function ImageDropZone({ onDrop, onClick }: ImageDropZoneProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.classList.add("ring-2", "ring-primary");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.classList.remove("ring-2", "ring-primary");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Card
        className="pointer-events-auto mx-4 w-[500px] cursor-pointer bg-background/50 p-8 text-center backdrop-blur-sm transition-all duration-200 hover:bg-background/60 dark:bg-black/50 dark:hover:bg-black/60"
        onDrop={onDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={onClick}
      >
        <p className="text-xl font-medium text-foreground dark:text-white">
          Tap or drag and drop outdoor images in{" "}
          <span className="font-semibold">World</span>
        </p>
        <p className="mt-2 text-sm text-foreground/60 dark:text-white/60">
          Supported formats: JPEG, PNG, WebP, HEIC (max 10MB)
        </p>
      </Card>
    </div>
  );
}
