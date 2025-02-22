import { LocationResult } from "@/types/location";

// components/superbolt/location-details.tsx
interface LocationDetailsProps {
  location: LocationResult;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Location Details
      </h2>
      <DetailItem label="City" value={location.city} />
      <DetailItem label="State" value={location.state} />
      <DetailItem label="Country" value={location.country} />
      <DetailItem label="Latitude" value={location.latitude?.toFixed(6)} />
      <DetailItem label="Longitude" value={location.longitude?.toFixed(6)} />
      <DetailItem label="Confidence" value={`${location.confidence}%`} />
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value?: string | number;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-lg text-gray-600 dark:text-gray-400">{label}:</span>
      <p className="text-lg text-gray-800 dark:text-white">{value}</p>
    </div>
  );
}
