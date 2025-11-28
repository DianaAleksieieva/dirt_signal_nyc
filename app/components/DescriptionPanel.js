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
      <h2 className="text-xl font-semibold text-eco-green-dark">
        NYC Cleanliness
      </h2>

      {layer === "311" && (
        <>
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
    </div>
  );
}
