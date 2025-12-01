"use client";

import { useMemo } from "react";

export default function DescriptionPanel({
  layer,
  complaints,
  complaintType,
  startYear,
  startMonth,
  endYear,
  endMonth,
  tractMeta,
}) {
  const startRange = `${startYear}-${String(startMonth).padStart(2, "0")}`;
  const endRange = `${endYear}-${String(endMonth).padStart(2, "0")}`;

  // TOTAL PER COMPLAINT TYPE
  const totalsByType = useMemo(() => {
    if (!complaints) return {};

    const result = {};

    for (const [type, typeData] of Object.entries(complaints)) {
      let total = 0;

      for (const [yearMonth, geoData] of Object.entries(typeData)) {
        if (yearMonth >= startRange && yearMonth <= endRange) {
          for (const count of Object.values(geoData)) {
            total += count;
          }
        }
      }

      result[type] = total;
    }

    return result;
  }, [complaints, startRange, endRange]);

  const activeTotal = totalsByType[complaintType] ?? 0;


  // MOST COMMON COMPLAINT TYPE
  const topType = useMemo(() => {
    if (!totalsByType) return null;

    const entries = Object.entries(totalsByType)
      .filter(([type]) => type !== "All") // remove "All"
      .sort((a, b) => b[1] - a[1]);

    return entries[0] || null;
  }, [totalsByType]);


  // TOP CENSUS TRACT FOR SELECTED TYPE
  const topTract = useMemo(() => {
    if (!complaints || !complaintType) return null;

    const typeData = complaints[complaintType];
    if (!typeData) return null;

    const totals = {};

    for (const [yearMonth, geoData] of Object.entries(typeData)) {
      if (yearMonth >= startRange && yearMonth <= endRange) {
        for (const [tract, count] of Object.entries(geoData)) {
          totals[tract] = (totals[tract] || 0) + count;
        }
      }
    }

    if (!Object.keys(totals).length) return null;

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  }, [complaints, complaintType, startRange, endRange]);


  const tractInfo = useMemo(() => {
    if (!topTract || !tractMeta) return null;
    const [geoid] = topTract;
    return tractMeta[geoid] || null;
  }, [topTract, tractMeta]);

  return (
    <div className="lg:w-1/4 w-full bg-eco-green-soft p-5 rounded-xl shadow-sm space-y-5 h-[70vh] lg:h-[80vh] overflow-y-auto">
      {/* <h2 className="text-xl font-semibold text-eco-green-dark">
        NYC Cleanliness
      </h2> */}

      {(layer == "trash") && (
        <>
          <div>
            <p className="text-eco-green-dark font-semibold text-lg">
              📍 2024 Total Waste (Tons)
            </p>
            <p className="text-2xl font-bold text-eco-green-dark">
              248,477
            </p>
          </div>

          <div>
            <p className="font-semibold text-eco-green-dark ">
              Highest Waste Community District
            </p>

          <div className="mt-1 text-sm text-eco-green-dark/90">
            <p>
              <strong>Borough:</strong> Queens
            </p>
            <p>
              <strong>Community District:</strong>  7
            </p>

            <p className="text-sm text-eco-green-dark/90">
              <strong>Tons:</strong> 8,859
            </p>
          </div>

          </div>
        </>
      )}

      {layer === "311" && (
        <>
          <h2 className="text-xl font-semibold text-eco-green-dark">
            NYC Cleanliness
          </h2>
          {/* TOTAL FOR SELECTED TYPE */}
          <div>
            <p className="text-eco-green-dark font-semibold text-lg">
              📍 {complaintType} Complaints
            </p>
            <p className="text-2xl font-bold text-eco-green-dark">
              {activeTotal.toLocaleString()}
            </p>
            <p className="text-sm text-eco-text-dark/70">
              From {startRange} to {endRange}
            </p>
          </div>

          {/* MOST COMMON TYPE */}
          {topType && (
            <div>
              <p className="font-semibold text-eco-green-dark">
                Most common complaint type
              </p>
              <p className="text-sm text-eco-green-dark/90">
                {topType[0]} — {topType[1].toLocaleString()}
              </p>
            </div>
          )}

          {/* TOP CENSUS TRACT WITH METADATA */}
          {topTract && (
            <div>
              <p className="font-semibold text-eco-green-dark ">
                Highest-complaint Census Tract
              </p>

              {tractInfo && (
                <div className="mt-1 text-sm text-eco-green-dark/90">
                  <p>
                    <strong>Borough:</strong> {tractInfo.boro}
                  </p>
                  <p>
                    <strong>NTA:</strong> {tractInfo.nta}
                  </p>

                  <p className="text-sm text-eco-green-dark/90">
                    <strong>Complaints:</strong> {topTract[1].toLocaleString()} 
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TOTALS BY TYPE */}
          <div>
            <p className="font-semibold text-eco-green-dark">
              📊 Totals by Type
            </p>
            <ul className="text-sm text-eco-text-dark/80 ml-4 space-y-1">
              {Object.entries(totalsByType).map(([type, total]) => (
                <li key={type}>
                  <span className="font-medium">{type}:</span>{" "}
                  {total.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {(layer === "analysis") && (
        <>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
            Analysis Map Guide
          </h2>

          <div className="space-y-6">

            {/* 0. Data Source & Time Range (Added Here) */}
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-300 text-xs text-gray-700">
                <p className="mb-1">
                    <strong>📅 Time Range:</strong> {startYear}-{String(startMonth).padStart(2, '0')} to {endYear}-{String(endMonth).padStart(2, '0')}
                </p>
                <p>
                    <strong>💾 Data Source:</strong> <a href="https://data.cityofnewyork.us/Social-Services/311-trash-reports/h2g7-xbpj/about_data" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NYC Open Data - 311 Service Requests</a>
                </p>
            </div>
            
            {/* 1. Category Legend (Updated with all colors) */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                🎨 Category Legend
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Each color represents the <b>most frequent</b> complaint type in that area:
              </p>
              
              <div className="space-y-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm max-h-[40vh] overflow-y-auto">
                
                {/* Red: Infrastructure */}
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#e41a1c] mt-1 shrink-0"></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Infrastructure Deficit</p>
                    <p className="text-xs text-gray-500">Requests for new litter baskets or reporting damaged bins.</p>
                  </div>
                </div>

                {/* Blue: Missed Collection */}
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#377eb8] mt-1 shrink-0"></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Missed Collection</p>
                    <p className="text-xs text-gray-500">Sanitation truck did not pick up trash/recycling on schedule.</p>
                  </div>
                </div>

                {/* Green: Sweeping Missed */}
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#4daf4a] mt-1 shrink-0"></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Sweeping Missed</p>
                    <p className="text-xs text-gray-500">Mechanical street cleaning failed to service the street.</p>
                  </div>
                </div>

                {/* Purple: Condition/Volume */}
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#984ea3] mt-1 shrink-0"></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Condition / Volume</p>
                    <p className="text-xs text-gray-500">Overflowing baskets, dirty sidewalks, spilling trash.</p>
                  </div>
                </div>

                {/* Yellow: Service Failure (Added border for visibility) */}
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#ffff00] mt-1 shrink-0 border border-gray-300"></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Service Failure</p>
                    <p className="text-xs text-gray-500">Collection truck noise, reckless driving, or bulky item issues.</p>
                  </div>
                </div>

                {/* Grey: Other */}
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#999999] mt-1 shrink-0"></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Other</p>
                    <p className="text-xs text-gray-500">Miscellaneous complaints not fitting major categories.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Display Logic */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                🏆 "Winner Takes All" Display
              </h3>
              <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                To simplify the map, we only show the color of the <b>#1 complaint type</b> for each neighborhood.
              </p>
            </div>

            {/* 3. Opacity / Intensity */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                Severity
              </h3>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 bg-[#377eb8] opacity-30 rounded border border-gray-300"></div>
                  <span className="text-xs text-gray-400">Light</span>
                  <div className="h-1 w-full bg-gradient-to-r from-[#377eb830] to-[#377eb8] rounded-full"></div>
                  <span className="text-xs text-gray-400">Dark</span>
                  <div className="h-6 w-6 bg-[#377eb8] opacity-100 rounded border border-gray-300"></div>
                </div>
                <p className="text-xs text-gray-600">
                  <b>Darker Color = Higher Density.</b><br/>
                  Opacity is calculated based on complaints per 1,000 residents. This highlights areas where the problem is severe relative to population size.
                </p>
              </div>
            </div>

          </div>
        </>
      )}
      
    </div>
  );
}
