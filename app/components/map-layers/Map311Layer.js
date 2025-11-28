"use client";

import { useEffect, useMemo, useRef } from "react";
import { scaleQuantile } from "d3-scale";
import { GeoJSON } from "react-leaflet";

// color scale for complaint counts
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

export default function Map311Layer({
  data,
  complaints: allComplaints,
  complaintType,
  onScaleCreated,
  startYear,
  startMonth,
  endYear,
  endMonth,
}) {
  // Memoize the calculation of complaint counts
  const complaintsByGeoID = useMemo(() => {
    if (!allComplaints || !complaintType) return new Map();

    const complaints = new Map();
    const typeData = allComplaints[complaintType] || {};

    const startRange =
      startYear && startMonth
        ? `${startYear}-${String(startMonth).padStart(2, "0")}`
        : null;
    const endRange =
      endYear && endMonth
        ? `${endYear}-${String(endMonth).padStart(2, "0")}`
        : null;

    for (const [yearMonth, geoData] of Object.entries(typeData)) {
      const isAfterStart = !startRange || yearMonth >= startRange;
      const isBeforeEnd = !endRange || yearMonth <= endRange;

      if (isAfterStart && isBeforeEnd) {
        for (const [geoid, count] of Object.entries(geoData)) {
          complaints.set(geoid, (complaints.get(geoid) || 0) + count);
        }
      }
    }

    return complaints;
  }, [
    allComplaints,
    complaintType,
    startYear,
    startMonth,
    endYear,
    endMonth,
  ]);

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

  const geoJsonRef = useRef(null);

  useEffect(() => {
    if (!geoJsonRef.current) {
      return;
    }
    geoJsonRef.current.eachLayer((layer) => {
      const tractId = layer.feature.properties?.GEOID;
      const name =
        layer.feature.properties?.name ||
        layer.feature.properties?.NAMELSAD ||
        `Census Tract ${tractId}`;
      const count = complaintsByGeoID.get(tractId) || 0;
      layer.bindPopup(`${name}<br>Complaints: ${count}`);
    });
  }, [complaintsByGeoID, data]);


  if (!data) return null;

  return (
    <GeoJSON
      ref={geoJsonRef}
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
    />
  );
}