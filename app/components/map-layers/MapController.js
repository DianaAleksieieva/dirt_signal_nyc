"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map311Layer = dynamic(() => import("./Map311Layer"), { ssr: false });
const MapTrashLayer = dynamic(() => import("./MapTrashLayer"), { ssr: false });
const MapBinsLayer = dynamic(() => import("./MapBinsLayer"), { ssr: false });
const MapAnalysisLayer = dynamic(() => import("./MapAnalysisLayer"), { ssr: false });
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });
const Legend = dynamic(() => import("./Legend"), { ssr: false });

export default function MapController({
  layer,
  complaintType,
  showBins,
  startYear,
  startMonth,
  endYear,
  endMonth,
}) {
  const [geojson, setGeojson] = useState(null);
  const [complaintData, setComplaintData] = useState(null);
  const [dominantData, setDominantData] = useState(null); 
  const [populationData, setPopulationData] = useState(null); 
  const [scale, setScale] = useState(null);

  const handleScaleCreated = (newScale) => {
    setScale(() => newScale);
  };

  useEffect(() => {
    async function load() {
      // Load complaint data
      try {
        const res = await fetch(
          `/data/311/optimized_complaint_census_tract.json`
        );
        const json = await res.json();
        setComplaintData(json);
      } catch (e) {
        console.error("❌ Error loading complaint data:", e);
        setComplaintData(null);
      }

      try {
        const [resComp, resPop] = await Promise.all([
          fetch("/data/analysis/optimized_nta_complaints.json"),
          fetch("/data/analysis/nta_population.json")
        ]);
        setDominantData(await resComp.json());
        setPopulationData(await resPop.json());
      } catch (e) {
        console.error("❌ Error loading dominant layer data:", e);
      }

      let url = "/data/311/NYC_census_tract.geojson";

      try {
        const res = await fetch(url);
        const json = await res.json();
        setGeojson(json);
      } catch (e) {
        console.error("❌ Error loading dataset:", url, e);
        setGeojson(null);
      }
    }

    load();
  }, [layer, complaintType]);

  useEffect(() => {
    if (layer !== "311") {
      setScale(null);
    }
  }, [layer]);

  return (
    <MapClient>
      {layer === "311" && (
        <Map311Layer
          data={geojson}
          complaints={complaintData}
          complaintType={complaintType}
          onScaleCreated={handleScaleCreated}
          startYear={startYear}
          startMonth={startMonth}
          endYear={endYear}
          endMonth={endMonth}
        />
      )}

      {layer === 'analysis' && (
        <MapAnalysisLayer
          data={geojson} 
          complaints={dominantData}
          population={populationData}
          startYear={startYear}
          startMonth={startMonth}
          endYear={endYear}
          endMonth={endMonth}
        />
      )}

      {layer === "trash" && <MapTrashLayer data={geojson} />}
      {showBins && <MapBinsLayer data={geojson} />} {/* overlay */}
      <Legend scale={scale} />
    </MapClient>
  );
}
