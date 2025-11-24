"use client";

import { useState } from "react";
import MapController from "../components/map-layers/MapController";
import DescriptionPanel from "../components/DescriptionPanel";

export default function MapPage() {
  const [layer, setLayer] = useState("311");

  // NEW: Second-level filters for 311
  const [period, setPeriod] = useState("month"); // "month" | "year"
  const [complaintType, setComplaintType] = useState("type1"); // type1..type4

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
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {/* PERIOD FILTER */}
              <div className="flex gap-2">
                {["month", "year"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded-md text-xs font-medium shadow-sm transition
            ${
              period === p
                ? "bg-eco-green-dark text-white"
                : "bg-[#A8D5BA] text-eco-text-dark hover:bg-eco-green-dark hover:text-white"
            }`}
                  >
                    {p === "month" ? "Month" : "Year"}
                  </button>
                ))}
              </div>

              {/* JUST SPACE — NOTHING VISIBLE */}
              <div className="mx-6"></div>

              {/* TYPE FILTER */}
              <div className="flex gap-2">
                {["type1", "type2", "type3", "type4"].map((t) => (
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
                    {t.replace("type", "Type ")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MAP */}
          <div className="rounded-xl flex-1 min-h-[300px]">
            <MapController
              layer={layer}
              period={period}
              complaintType={complaintType}
            />
          </div>
        </div>

        {/* SIDEBAR DESCRIPTION */}
        <DescriptionPanel layer={layer} />
      </div>
    </div>
  );
}
