"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map311Layer = dynamic(() => import("./Map311Layer"), { ssr: false });
const MapTrashLayer = dynamic(() => import("./MapTrashLayer"), { ssr: false });
// const MapBinsLayer = dynamic(() => import("./MapBinsLayer"), { ssr: false }); // optional
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export default function MapController({ layer, period, complaintType }) {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    async function load() {
      let url = "";

      // ---------------------------
      // 1) 311 LOGIC (with 2 filters)
      // ---------------------------
      if (layer === "311") {
        /**
         * You now have:
         * period = "month" | "year"
         * complaintType = "type1" | "type2" | "type3" | "type4"
         *
         * You can name files like:
         *   /311/type1_month.geojson
         *   /311/type3_year.geojson
         *   etc.
         */
        // url = `/311/${complaintType}_${perioad}.geojson`;
        url = `data/311/NYC_census_tract.geojson`;
      }

      // ---------------------------
      // 2) TRASH DATASET
      // ---------------------------
      else if (layer === "trash") {
        // url = "/trash/trash_dataset.geojson"; 
        url = `data/311/NYC_census_tract.geojson`;
      }

      // ---------------------------
      // 3) DSNY BINS
      // ---------------------------
      else if (layer === "bins") {
        // url = "/bins/bins_dataset.geojson";
        url = `data/311/NYC_census_tract.geojson`;
      }

      // Fallback (avoid fetch errors)
      if (!url) return;

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
  }, [layer, period, complaintType]);  // IMPORTANT: all filters trigger reload

  return (
    <MapClient>
      {layer === "311" && <Map311Layer data={geojson} />}
      {layer === "trash" && <MapTrashLayer data={geojson} />}
      {/* {layer === "bins" && <MapBinsLayer data={geojson} />} */}
    </MapClient>
  );
}
