// types/location.ts
export interface LocationResult {
  latitude: number;
  longitude: number;
  confidence: number;
  city?: string;
  state?: string;
  country?: string;
}

export interface ImageValidationResult {
  isValid: boolean;
  error?: {
    title: string;
    description: string;
  };
}
