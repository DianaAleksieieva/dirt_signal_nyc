"use client";

import { useState } from "react";
import MapController from "../components/map-layers/MapController";
import DescriptionPanel from "../components/DescriptionPanel";

export default function MapPage() {
  const [layer, setLayer] = useState("311");

  const [complaintType, setComplaintType] = useState("All");

  // Date range state
  const [startYear, setStartYear] = useState(2010);
  const [startMonth, setStartMonth] = useState(1);
  const [endYear, setEndYear] = useState(2025);
  const [endMonth, setEndMonth] = useState(12);

  const typeMappings = {
    All: "All",
    Collection: "Collection",
    Sweeping: "Sweeping",
    Basket: "Basket",
  };

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
    <div className="min-h-screen bg-eco-beige text-eco-text pt-0 px-6 pb-6">
      <div className="h-full flex flex-col lg:flex-row gap-6">
        {/* MAP SECTION */}
        <div className="lg:w-4/5 w-full flex flex-col h-[70vh] lg:h-[80vh]">
          {/* MAIN BUTTON BAR */}
          <div className="mb-4 flex flex-wrap gap-3">
            <button
              onClick={() => setLayer("311")}
              className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
                ${
                  layer === "311"
                    ? "bg-eco-green-dark text-white"
                    : "bg-eco-green-soft text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
                }`}
            >
              311 Complaints
            </button>

            <button
              onClick={() => setLayer("trash")}
              className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
                ${
                  layer === "trash"
                    ? "bg-eco-green-dark text-white"
                    : "bg-eco-green-soft text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
                }`}
            >
              Trash data
            </button>

            <button
              onClick={() => setLayer("bins")}
              className={`px-2.5 py-1.5 rounded text-sm shadow-sm transition
                ${
                  layer === "bins"
                    ? "bg-eco-green-dark text-white"
                    : "bg-eco-green-soft text-eco-green-dark hover:bg-eco-green-dark hover:text-white"
                }`}
            >
              🗑️ DSNY Bins
            </button>
          </div>

          {/* SECOND-LEVEL FILTERS FOR 311 */}
          {layer === "311" && (
            <div className="mb-4 flex flex-wrap items-center gap-6">
              {/* TIME PERIOD FILTER */}
              <div className="flex items-center gap-4 bg-eco-green-soft p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <label htmlFor="start-month" className="text-sm font-medium text-eco-text-dark">Start:</label>
                  <select 
                    id="start-month" 
                    value={startMonth}
                    onChange={(e) => setStartMonth(parseInt(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white">
                    {months.map(m => <option key={`start-month-${m.value}`} value={m.value}>{m.name}</option>)}
                  </select>
                  <select 
                    id="start-year" 
                    value={startYear}
                    onChange={(e) => setStartYear(parseInt(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white">
                    {years.map(y => <option key={`start-year-${y}`} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className="text-gray-400">-</div>

                <div className="flex items-center gap-2">
                  <label htmlFor="end-month" className="text-sm font-medium text-eco-text-dark">End:</label>
                  <select 
                    id="end-month" 
                    value={endMonth}
                    onChange={(e) => setEndMonth(parseInt(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white">
                    {months.map(m => <option key={`end-month-${m.value}`} value={m.value}>{m.name}</option>)}
                  </select>
                  <select 
                    id="end-year" 
                    value={endYear}
                    onChange={(e) => setEndYear(parseInt(e.target.value))}
                    className="px-2 py-1 rounded-md text-xs shadow-sm border-none bg-white">
                    {years.map(y => <option key={`end-year-${y}`} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* TYPE FILTER */}
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
            </div>
          )}

          {/* MAP */}
          <div className="rounded-xl flex-1 min-h-[300px]">
            <MapController
              layer={layer}
              complaintType={complaintType}
              startYear={startYear}
              startMonth={startMonth}
              endYear={endYear}
              endMonth={endMonth}
            />
          </div>
        </div>

        {/* SIDEBAR DESCRIPTION */}
        <DescriptionPanel layer={layer} />
      </div>
    </div>
  );
}
