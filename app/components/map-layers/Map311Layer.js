"use client";

import { useState, useEffect, useMemo } from "react";

// The new color scale for complaint counts
const COUNT_PALETTE = [
  "#f7fcf5",
  "#e5f5e0",
  "#c7e9c0",
  "#a1d99b",
  "#74c476",
  "#41ab5d",
  "#238b45",
  "#006d2c",
  "#00441b",
];

// A simple function to get a color from the palette based on the count
function getColorFromCount(count) {
  if (count > 5000) return COUNT_PALETTE[8];
  if (count > 2000) return COUNT_PALETTE[7];
  if (count > 1000) return COUNT_PALETTE[6];
  if (count > 500) return COUNT_PALETTE[5];
  if (count > 200) return COUNT_PALETTE[4];
  if (count > 100) return COUNT_PALETTE[3];
  if (count > 50) return COUNT_PALETTE[2];
  if (count > 10) return COUNT_PALETTE[1];
  return COUNT_PALETTE[0];
}

export default function Map311Layer({ data, complaints: allComplaints }) {
  const [GeoJSON, setGeoJSON] = useState(null);

  useEffect(() => {
    async function load() {
      const rl = await import("react-leaflet");
      setGeoJSON(() => rl.GeoJSON);
    }
    load();
  }, []);

  // Memoize the calculation of complaint counts
  const complaintsByGeoID = useMemo(() => {
    if (!allComplaints) return new Map();

    const complaints = new Map();
    const allTypeData = allComplaints["Basket Complaint"] || {};

    for (const yearMonth of Object.values(allTypeData)) {
      for (const [geoid, count] of Object.entries(yearMonth)) {
        complaints.set(geoid, (complaints.get(geoid) || 0) + count);
      }
    }
    console.log(complaints);

    return complaints;
  }, [allComplaints]);

  if (!data || !GeoJSON) return null;

  return (
    <GeoJSON
      data={data}
      style={(feature) => {
        const tractId = feature.properties?.GEOID;
        const count = complaintsByGeoID.get(tractId) || 0;
        const color = getColorFromCount(count);

        return {
          color: "#444",
          weight: 0.35,
          fillColor: color,
          fillOpacity: 0.7,
        };
      }}
      onEachFeature={(feature, layer) => {
        const tractId = feature.properties?.GEOID;
        const name =
          feature.properties?.name ||
          feature.properties?.NAMELSAD ||
          `Census Tract ${tractId}`;
        const count = complaintsByGeoID.get(tractId) || 0;

        layer.bindPopup(`${name}<br>Complaints: ${count}`);
      }}
    />
  );
}
