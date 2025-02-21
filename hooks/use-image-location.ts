// hooks/use-image-location.ts
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constant/image";
import { toast } from "@/hooks/use-toast";
import {
  detectImageLocation,
  LocationResult,
} from "@/lib/services/imageLocation";
import { ImageValidationResult } from "@/types/location";
import { useState } from "react";

// Add a type for accepted mime types
export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number];

interface UseImageLocationResult {
  isLoading: boolean;
  location: LocationResult | null;
  selectedImage: string | null;
  handleImageFile: (file: File) => Promise<void>;
  resetState: () => void;
}

export function useImageLocation(): UseImageLocationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const validateImageFile = (file: File): ImageValidationResult => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type as AcceptedImageType)) {
      return {
        isValid: false,
        error: {
          title: "Invalid file type",
          description:
            "Please upload a valid image file (JPEG, PNG, WebP, HEIC)",
        },
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: {
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
        },
      };
    }

    return { isValid: true };
  };

  const handleImageFile = async (file: File): Promise<void> => {
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: validation.error!.title,
        description: validation.error!.description,
      });
      return;
    }

    setIsLoading(true);
    setSelectedImage(URL.createObjectURL(file));

    try {
      const result = await detectImageLocation(file);
      setLocation(result);
    } catch (error) {
      console.error("Error detecting location:", error);
      toast({
        variant: "destructive",
        title: "Error analyzing image",
        description:
          "Failed to detect location from the image. Please try another image.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setLocation(null);
    setSelectedImage(null);
    setIsLoading(false);
  };

  return {
    isLoading,
    location,
    selectedImage,
    handleImageFile,
    resetState,
  };
}
