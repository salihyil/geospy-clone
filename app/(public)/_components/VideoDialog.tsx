"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Play } from "lucide-react";
import { useState } from "react";

export const VideoDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-[thin] transition-transform duration-500 hover:scale-110 dark:border-white/30 dark:bg-gray-900/30 sm:h-20 sm:w-20"
        >
          <Play className="h-6 w-6 fill-black dark:fill-white dark:text-white sm:h-8 sm:w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[300px] p-0 sm:h-[550px] sm:max-w-[850px]">
        <VisuallyHidden>
          <DialogTitle>GeoSpy Demo Video</DialogTitle>
        </VisuallyHidden>
        <div className="aspect-video h-full w-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/mSIRzvG3U7g"
            title="GeoSpy Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
