"use client";

import { useState, useEffect } from "react";
import MapController from "../components/map-layers/MapController";
import DescriptionPanel from "../components/DescriptionPanel";

export default function MapPage() {
  const [layer, setLayer] = useState("311");

  const [showBins, setShowBins] = useState(false);

  const [complaintType, setComplaintType] = useState("All");

  const [startYear, setStartYear] = useState(2010);
  const [startMonth, setStartMonth] = useState(1);
  const [endYear, setEndYear] = useState(2025);
  const [endMonth, setEndMonth] = useState(12);
  const [complaintData, setComplaintData] = useState(null);
  const [tractMeta, setTractMeta] = useState(null);

  useEffect(() => {
    async function loadComplaintData() {
      try {
        const res = await fetch(
          "/data/311/optimized_complaint_census_tract.json"
        );
        const json = await res.json();
        setComplaintData(json);
      } catch (e) {
        console.error("❌ Error loading complaint data:", e);
      }
    }
    loadComplaintData();
  }, []);

  const typeMappings = {
    All: "All",
    Collection: "Collection",
    Sweeping: "Sweeping",
    Basket: "Basket",
  };
  useEffect(() => {
    async function loadTracts() {
      try {
        const res = await fetch("/data/311/NYC_census_tract.geojson");
        const json = await res.json();

        const metaMap = {};
        json.features.forEach((f) => {
          const geo = f.properties?.GEOID;
          if (geo) {
            metaMap[geo] = {
              boro: f.properties?.BoroName,
              nta: f.properties?.NTAName,
              cdta: f.properties?.CDTANAME,
              label: f.properties?.CTLabel,
            };
          }
        });

        setTractMeta(metaMap);
      } catch (e) {
        console.error("❌ Error loading tracts:", e);
      }
    }
    loadTracts();
  }, []);

  const years = Array.from({ length: 2025 - 2010 + 1 }, (_, i) => 2025 - i);
  const months = [
    { value: 1, name: "Jan" },
    { value: 2, name: "Feb" },
    { value: 3, name: "Mar" },
    { value: 4, name: "Apr" },
    { value: 5, name: "May" },
    { value: 6, name: "Jun" },
    { value: 7, name: "Jul" },
    { value: 8, name: "Aug" },
    { value: 9, name: "Sep" },
    { value: 10, name: "Oct" },
    { value: 11, name: "Nov" },
    { value: 12, name: "Dec" },
  ];

  return (
    <div className=" mt-3 h-[calc(100vh-6rem)] overflow-hidden bg-eco-beige text-eco-text px-6 pb-6 pt-0">
      <div className="h-full flex flex-col lg:flex-row gap-6">
        {/* MAP SECTION */}
        <div className="lg:w-4/5 w-full flex flex-col h-[70vh] lg:h-[80vh]">
          {/* MAIN BUTTON BAR */}
          <div className=" mb-4 flex items-center flex-wrap gap-4">
            {/* GROUP 1: TRASH DATA */}
            <div className="flex gap-2 bg-eco-green-soft/40 px-3 py-2 rounded-lg shadow-sm">
              <button
                onClick={() => setLayer("trash")}
                className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
      ${
        layer === "trash"
          ? "bg-eco-green-dark text-white"
          : "bg-white text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
      }`}
              >
                Trash data
              </button>
            </div>

            {/* GROUP 2: 311 + BINS + Major Issues */}
            <div className="flex gap-2 bg-eco-green-soft/40 px-3 py-2 rounded-lg shadow-sm">
              <button
                onClick={() => setLayer("311")}
                className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
      ${
        layer === "311"
          ? "bg-eco-green-dark text-white"
          : "bg-white text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
      }`}
              >
                311 Complaints
              </button>

              <button
                onClick={() => setLayer("issues")}
                className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
        ${
          layer === "issues"
            ? "bg-eco-green-dark text-white"
            : "bg-white text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
        }`}
              >
                Major Issues
              </button>

              <button
                onClick={() => setShowBins(!showBins)}
                className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
        ${
          showBins
            ? "bg-eco-green-dark text-white"
            : "bg-white text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
        }`}
              >
                🗑️ DSNY Bins
              </button>
            </div>
          </div>

          {/* SECOND-LEVEL FILTERS FOR 311 */}
          {["311", "issues"].includes(layer) && (
            <div className="mb-4 flex flex-wrap items-center gap-6">
              {/* TIME PERIOD FILTER */}
              <div className="flex items-center gap-4 bg-eco-green-soft p-2 rounded-lg">
                {/* START */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-eco-text-dark">
                    Start:
                  </label>

                  <select
                    value={startMonth}
                    onChange={(e) => setStartMonth(Number(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white"
                  >
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={startYear}
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-gray-400">–</span>

                {/* END */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-eco-text-dark">
                    End:
                  </label>

                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(Number(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white"
                  >
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TYPE FILTER (311 ONLY) */}
              {layer === "311" && (
                <div className="flex gap-2">
                  {Object.keys(typeMappings).map((t) => (
                    <button
                      key={t}
                      onClick={() => setComplaintType(t)}
                      className={`px-3 py-1 rounded-md text-xs font-medium shadow-sm transition
              ${
                complaintType === t
                  ? "bg-[#198657] text-white"
                  : "bg-[#E5F4EC] text-eco-green-dark hover:bg-[#198657] hover:text-white"
              }`}
                    >
                      {typeMappings[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MAP */}
          <div className="rounded-xl flex-1 min-h-[300px]">
            <MapController
              layer={layer}
              showBins={showBins}
              complaintType={complaintType}
              startYear={startYear}
              startMonth={startMonth}
              endYear={endYear}
              endMonth={endMonth}
            />
          </div>
        </div>

        {/* SIDEBAR DESCRIPTION */}
        <DescriptionPanel
          layer={layer}
          complaints={complaintData}
          complaintType={complaintType}
          startYear={startYear}
          startMonth={startMonth}
          endYear={endYear}
          endMonth={endMonth}
          tractMeta={tractMeta}
        />
      </div>
    </div>
  );
}
