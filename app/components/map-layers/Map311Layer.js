"use client";

import { useState, useEffect } from "react";

const COLOR_PALETTE = [
  "#2ecc40", // 0: Green
  "#76d917", // 1: Lime green
  "#a7e400", // 2: Yellow-green
  "#d4ed00", // 3: Soft yellow-green
  "#ffe600", // 4: Yellow
  "#ffcc00", // 5: Golden yellow
  "#ffb000", // 6: Light orange
  "#ff8a00", // 7: Orange
  "#ff5c00", // 8: Strong orange
  "#ff2b00", // 9: Red-orange
  "#e00000", // 10: Red
  "#a30000ff", // 11: Dark red
];

export default function Map311Layer({ data }) {
  const [GeoJSON, setGeoJSON] = useState(null);
  const [colorCache] = useState(new Map());

  useEffect(() => {
    async function load() {
      const rl = await import("react-leaflet");
      setGeoJSON(() => rl.GeoJSON);
    }
    load();
  }, []);

  if (!data || !GeoJSON) return null;

  function getPaletteColor(id) {
    if (!colorCache.has(id)) {
      const seed = Array.from(String(id)).reduce(
        (a, c) => a + c.charCodeAt(0),
        0
      );

      const color = COLOR_PALETTE[seed % COLOR_PALETTE.length];
      colorCache.set(id, color);
    }
    return colorCache.get(id);
  }

  return (
    <GeoJSON
      data={data}
      style={(feature) => {
        const tractId =
          feature.properties?.GEOID ||
          feature.properties?.name ||
          Math.random().toString();

        return {
          color: "#444",
          weight: 0.35,
          fillColor: getPaletteColor(tractId),
          fillOpacity: 0.55,
        };
      }}
      onEachFeature={(feature, layer) => {
        const name =
          feature.properties?.name ||
          feature.properties?.NAMELSAD ||
          "Census Tract";

        layer.bindPopup(name);
      }}
    />
  );
}
