"use client";

import { GeoJSON } from "react-leaflet";

export default function MapTrashLayer({ data }) {
  if (!data) return null;

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
