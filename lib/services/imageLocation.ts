export interface LocationResult {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  confidence: number;
  explanation: string;
  image: File;
}

export async function detectImageLocation(
  image: File,
): Promise<LocationResult> {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/detect-location", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Konum tespit edilemedi");
    }

    const locationData = await response.json();

    return {
      ...locationData,
      image,
    };
  } catch (error) {
    console.error("Konum tespiti hatası:", error);
    throw error;
  }
}
