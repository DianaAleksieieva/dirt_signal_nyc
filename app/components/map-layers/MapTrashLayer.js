"use client";

import { useState, useEffect } from "react";

const COLOR_PALETTE = [
  "#2ecc40",   // 0: Green
  "#76d917",   // 1: Lime green
  "#a7e400",   // 2: Yellow-green
  "#d4ed00",   // 3: Soft yellow-green
  "#ffe600",   // 4: Yellow
  "#ffcc00",   // 5: Golden yellow
  "#ffb000",   // 6: Light orange
  "#ff8a00",   // 7: Orange
  "#ff5c00",   // 8: Strong orange
  "#ff2b00",   // 9: Red-orange
  "#e00000",   // 10: Red
  "#a30000ff", // 11: Dark red
];

export default function MapTrashLayer({ data }) {
  const [GeoJSON, setGeoJSON] = useState(null);
  const [districtColors] = useState(new Map()); // color cache

  useEffect(() => {
    async function load() {
      const rl = await import("react-leaflet");
      setGeoJSON(() => rl.GeoJSON);
    }
    load();
  }, []);

  if (!data || !GeoJSON) return null;

  // Pick a color from the palette using a stable hash
  function getPaletteColor(key) {
    if (!districtColors.has(key)) {
      // Convert string into numeric seed
      const seed = Array.from(String(key)).reduce(
        (acc, ch) => acc + ch.charCodeAt(0),
        0
      );

      const color = COLOR_PALETTE[seed % COLOR_PALETTE.length];
      districtColors.set(key, color);
    }
    return districtColors.get(key);
  }

  return (
    <GeoJSON
      data={data}
      style={(feature) => {
        const district =
          feature.properties?.CDTA2020 ||
          feature.properties?.GEOID ||
          feature.properties?.name ||
          "unknown";

        return {
          color: "#555",
          weight: 0.4,
          fillColor: getPaletteColor(district), // 🎨 vivid density palette
          fillOpacity: 0.55,
        };
      }}
      onEachFeature={(feature, layer) => {
        const district =
          feature.properties?.CDTA2020 ||
          feature.properties?.NAMELSAD ||
          feature.properties?.name ||
          "District";

        layer.bindPopup(`District: ${district}`);
      }}
    />
  );
}
