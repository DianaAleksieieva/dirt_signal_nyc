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
  data, 
  complaints, 
  population, 
  startYear,
  startMonth,
  endYear,
  endMonth,
}) {

  // useMemo returns an object: { stats: Map, dynamicCap: number }
  const { stats, dynamicCap } = useMemo(() => {
    if (!complaints || !population) return { stats: new Map(), dynamicCap: 1 };

    const statsMap = new Map();
    const tempAgg = {};
    const allIntensities = []; 

    const startRange =
      startYear && startMonth
        ? `${startYear}-${String(startMonth).padStart(2, "0")}`
        : null;
    const endRange =
      endYear && endMonth
        ? `${endYear}-${String(endMonth).padStart(2, "0")}`
        : null;

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

    // Calculate per-NTA stats
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

      // Population lookup (using CDID fallback logic)
      const cdid = ntaCode.substring(0, 4);
      const pop = population[cdid] || 1; 
      
      const intensity = (maxCount / pop) * 1000;

      if (intensity > 0 && pop != 1) {
        allIntensities.push(intensity);
      }

      statsMap.set(ntaCode, { dominantType, intensity, pop, cdid, maxCount, totalComplaints});
    }

    // Calculate Dynamic Cap (95th percentile)
    let calculatedCap = 1;
    if (allIntensities.length > 0) {
      allIntensities.sort((a, b) => a - b);
      const p95Index = Math.floor(allIntensities.length * 0.95);
      calculatedCap = allIntensities[p95Index];
    }
    
    // Safety check for very low data scenarios
    if (calculatedCap < 0.1) calculatedCap = 1;

    return { stats: statsMap, dynamicCap: calculatedCap };

  }, [complaints, population, startYear, startMonth, endYear, endMonth]);

  const geoJsonRef = useRef(null);

  useEffect(() => {
    if (!geoJsonRef.current) return;
    
    geoJsonRef.current.eachLayer((layer) => {
      const ntaCode = layer.feature.properties?.NTA2020 || layer.feature.properties?.ntacode; 
      const name = layer.feature.properties?.NTAName || layer.feature.properties?.ntaname || ntaCode;
      
      const stat = stats.get(ntaCode);

      if (stat) {
        layer.bindPopup(
          `<b>${name}</b><br/>
          Community District: ${stat.cdid}<br/>
          Total Complaints: ${stat.totalComplaints}<br/>
          Dominant: ${stat.dominantType}<br/>
          Complaints Count: ${stat.maxCount}<br/>
          Intensity: ${stat.intensity.toFixed(2)} / 1k pop<br/>`
        );
      } else {
        layer.bindPopup(`${name}<br/>No Data`);
      }
    });
  }, [stats, data]);

  if (!data) return null;

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={data}
      style={(feature) => {
        const ntaCode = feature.properties?.NTA2020 || feature.properties?.ntacode;
        
        const stat = stats.get(ntaCode);

        let color = "#999999";
        let fillOpacity = 0;

        if (stat) {
          color = COLOR_MAPPING[stat.dominantType] || "#999999";
          
          const intensityVal = stat.intensity;
          
          let ratio = intensityVal / dynamicCap;
          if (ratio > 1) ratio = 1; 
          
          fillOpacity = 0.3 + 0.7 * ratio;
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