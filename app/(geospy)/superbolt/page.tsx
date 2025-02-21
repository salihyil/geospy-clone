// app/(geospy)/superbolt/page.tsx
"use client";

import { EnterpriseButton } from "@/app/(geospy)/superbolt/_components/EnterpriseButton";
import { ImageDropZone } from "@/app/(geospy)/superbolt/_components/ImageDropZone";
import { LoadingOverlay } from "@/app/(geospy)/superbolt/_components/LoadingOverlay";
import { WelcomeModal } from "@/app/(geospy)/superbolt/_components/WelcomeModal";
import { ACCEPTED_IMAGE_TYPES } from "@/constant/image";
import { useImageLocation } from "@/hooks/use-image-location";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { LocationPanel } from "./_components/LocationPanel";

const MapComponent = dynamic(
  () => import("@/app/(geospy)/superbolt/_components/MapComponent"),
  {
    ssr: false,
  },
);

export default function SuperboltPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const mapRef = useRef<{ resetMap: () => void }>(null!);

  const { isLoading, location, selectedImage, handleImageFile, resetState } =
    useImageLocation();

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setShowWelcome(false);
      setShowResults(false);
      await handleImageFile(e.target.files[0]);
      setShowResults(true);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    setShowResults(false);
    await handleImageFile(file);
    setShowResults(true);
  };

  const handleNewSearch = () => {
    resetState();
    setShowResults(false);
    setShowWelcome(true);
    mapRef.current?.resetMap();

    const fileInput = document.getElementById(
      "imageUpload",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapComponent mapControl={mapRef} location={location} />
      </div>

      <div className="pointer-events-none relative z-10 h-full w-full">
        {selectedImage && showResults && !showWelcome && (
          <LocationPanel
            selectedImage={selectedImage}
            location={location}
            onNewSearch={handleNewSearch}
          />
        )}

        {showWelcome && (
          <WelcomeModal
            onUpload={() => document.getElementById("imageUpload")?.click()}
            onContinue={() => setShowWelcome(false)}
          />
        )}

        {!showWelcome && !isLoading && !showResults && (
          <ImageDropZone
            onDrop={handleDrop}
            onClick={() => document.getElementById("imageUpload")?.click()}
          />
        )}

        {isLoading && <LoadingOverlay />}

        <EnterpriseButton />

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
}
