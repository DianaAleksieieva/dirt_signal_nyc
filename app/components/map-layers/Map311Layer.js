"use client";

import { useState, useEffect } from "react";

export default function Map311Layer({ data }) {
  const [GeoJSON, setGeoJSON] = useState(null);

  useEffect(() => {
    async function load() {
      const rl = await import("react-leaflet");  
      setGeoJSON(() => rl.GeoJSON);
    }
    load();
  }, []);

  if (!data || !GeoJSON) return null;

  return (
    <GeoJSON
      data={data}
      style={() => ({
        color: "#198657ff",
        weight: 0.35,
        fillColor: "#b8e6d4",
        fillOpacity: 0.35,
      })}
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
