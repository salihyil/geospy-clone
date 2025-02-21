"use client";

import { LocationResult } from "@/lib/services/imageLocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

// Dark style map URL
const DARK_MAP_STYLE =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

interface MapComponentProps {
  location: LocationResult | null;
  mapControl?: React.RefObject<{ resetMap: () => void }>;
}

export default function MapComponent({
  location,
  mapControl,
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const resetMap = () => {
    if (!mapRef.current) return;

    // Remove existing marker if any
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Reset view to San Francisco
    mapRef.current.setView([37.7749, -122.4194], 13, {
      animate: true,
      duration: 1,
    });
  };

  // Expose resetMap function through mapControl
  if (mapControl && typeof mapControl === "object") {
    mapControl.current = { resetMap };
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize the map
    const map = L.map(mapContainerRef.current, {
      center: [37.7749, -122.4194], // San Francisco coordinates
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    // Add dark style tiles
    L.tileLayer(DARK_MAP_STYLE, {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    mapRef.current = map;

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle location updates
  useEffect(() => {
    if (!mapRef.current || !location) return;

    // Remove existing marker if any
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Create a custom icon for better visibility
    const icon = L.divIcon({
      className: "custom-marker",
      html: `<div class="marker-pin"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

    // Add new marker
    const marker = L.marker([location.latitude, location.longitude], { icon })
      .addTo(mapRef.current)
      .bindPopup(
        `<div class="text-center">
          <div class="font-bold">Location Found!</div>
          <div>Confidence: ${location.confidence}%</div>
        </div>`,
        { closeButton: false },
      )
      .openPopup();

    markerRef.current = marker;

    // Pan to location with animation
    mapRef.current.flyTo([location.latitude, location.longitude], 16, {
      duration: 1.5,
    });
  }, [location]);

  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full"
      style={{ backgroundColor: "#242424" }}
    />
  );
}
