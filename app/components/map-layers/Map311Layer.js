"use client";

import { useEffect, useMemo } from "react";
import { scaleQuantile } from "d3-scale";
import { GeoJSON } from "react-leaflet";

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

export default function Map311Layer({ data, complaints: allComplaints, onScaleCreated }) {

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
    //console.log(complaints);

    return complaints;
  }, [allComplaints]);

  const scale = useMemo(() => {
    const counts = Array.from(complaintsByGeoID.values()).filter((c) => c > 0);
    if (counts.length === 0) {
      return null;
    }
    // Using slice(1) to keep the first color for 0 counts.
    return scaleQuantile().domain(counts).range(COUNT_PALETTE.slice(1));
  }, [complaintsByGeoID]);

  const colorScale = useMemo(() => {
    if (!scale) {
      return () => COUNT_PALETTE[0];
    }
    return (count) => {
      if (count === 0) return COUNT_PALETTE[0];
      return scale(count);
    };
  }, [scale]);
  
  useEffect(() => {
    if (onScaleCreated) {
      onScaleCreated(scale);
    }
  }, [scale, onScaleCreated]);


  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={(feature) => {
        const tractId = feature.properties?.GEOID;
        const count = complaintsByGeoID.get(tractId) || 0;
        const color = colorScale(count);

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
