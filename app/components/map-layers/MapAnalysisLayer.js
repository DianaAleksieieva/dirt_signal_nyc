"use client";

import { useEffect, useMemo, useRef } from "react";
import { GeoJSON } from "react-leaflet";

const COLOR_MAPPING = {
  "Infrastructure Deficit": "#e41a1c",
  "Missed Collection": "#377eb8",
  "Sweeping Missed": "#4daf4a",
  "Service Failure": "#ffff00",
  "Condition/Volume": "#984ea3",
  "Other": "#999999",
};

export default function MapAnalysisLayer({
  data, // GeoJSON (NTA boundaries)
  complaints, // JSON from Python
  population, // Population JSON
  startYear,
  startMonth,
  endYear,
  endMonth,
}) {

  const ntaStats = useMemo(() => {
    if (!complaints || !population) return new Map();

    const stats = new Map(); // Key: NTA_Code, Value: { dominantType, intensity }

    const startRange =
      startYear && startMonth
        ? `${startYear}-${String(startMonth).padStart(2, "0")}`
        : null;
    const endRange =
      endYear && endMonth
        ? `${endYear}-${String(endMonth).padStart(2, "0")}`
        : null;

    //  { NTA_Code: { Category: TotalCount } }
    const tempAgg = {};

    for (const [yearMonth, ntaData] of Object.entries(complaints)) {
      const isAfterStart = !startRange || yearMonth >= startRange;
      const isBeforeEnd = !endRange || yearMonth <= endRange;

      if (isAfterStart && isBeforeEnd) {
        for (const [ntaCode, categories] of Object.entries(ntaData)) {
          if (!tempAgg[ntaCode]) tempAgg[ntaCode] = {};
          
          for (const [cat, count] of Object.entries(categories)) {
            tempAgg[ntaCode][cat] = (tempAgg[ntaCode][cat] || 0) + count;
          }
        }
      }
    }

    for (const [ntaCode, cats] of Object.entries(tempAgg)) {
      let maxCount = -1;
      let dominantType = "Other";
      let totalComplaints = 0;

      for (const [cat, count] of Object.entries(cats)) {
        totalComplaints += count;
        if (count > maxCount) {
          maxCount = count;
          dominantType = cat;
        }
      }

      const pop = population[ntaCode] || population[ntaCode.substring(0,4)] || 1;
      const intensity = (totalComplaints / pop) * 1000;

      stats.set(ntaCode, { dominantType, intensity });
    }

    return stats;
  }, [complaints, population, startYear, startMonth, endYear, endMonth]);

  const geoJsonRef = useRef(null);

  useEffect(() => {
    if (!geoJsonRef.current) return;

    geoJsonRef.current.eachLayer((layer) => {
      const ntaCode = layer.feature.properties?.NTA2020 || layer.feature.properties?.ntacode; 
      const name = layer.feature.properties?.NTAName || layer.feature.properties?.ntaname || ntaCode;
      
      const stat = ntaStats.get(ntaCode);

      if (stat) {
        layer.bindPopup(
          `<b>${name}</b><br/>
           Dominant: ${stat.dominantType}<br/>
           Intensity: ${stat.intensity.toFixed(2)} / 1k pop`
        );
      } else {
        layer.bindPopup(`${name}<br/>No Data`);
      }
    });
  }, [ntaStats, data]);

  if (!data) return null;

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={data}
      style={(feature) => {
        const ntaCode = feature.properties?.NTA2020 || feature.properties?.ntacode;
        const stat = ntaStats.get(ntaCode);

        let color = "#999999";
        let fillOpacity = 0;

        if (stat) {
          color = COLOR_MAPPING[stat.dominantType] || "#999999";
          
          const intensityCap = 7.0; 
          const intensityVal = stat.intensity;
          fillOpacity = 0.3 + 0.7 * (Math.min(intensityVal, intensityCap) / intensityCap);
        }

        return {
          color: "#444",
          weight: 0.5,  
          fillColor: color,
          fillOpacity: fillOpacity,
        };
      }}
    />
  );
}