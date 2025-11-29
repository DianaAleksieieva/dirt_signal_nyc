"use client";

import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

export default function Analysis311() {
  const [useBulky, setUseBulky] = useState(true);
  const [complaints, setComplaints] = useState(null);
  const [tracts, setTracts] = useState(null);

  /* LOAD DATA */

  useEffect(() => {
    async function load() {
      try {
        const file = useBulky
          ? "/data/311/optimized_complaint_census_tract.json"
          : "/data/311/optimized_complaint_census_tract_no_bulky.json";

        const res1 = await fetch(file);
        const res2 = await fetch("/data/311/NYC_census_tract.geojson");

        const complaintsJson = await res1.json();
        const tractsJson = await res2.json();

        setComplaints(complaintsJson);
        setTracts(tractsJson.features);
      } catch (e) {
        console.error("❌ Failed to load data", e);
      }
    }
    load();
  }, [useBulky]);

  const TYPES = ["Collection", "Sweeping", "Basket"];
  const COLORS = ["#198657", "#76d917", "#ff8a00"];

  /* Monthly Trend */
  const monthlyTrend = useMemo(() => {
    if (!complaints) return [];
    const monthMap = {};

    for (const type of TYPES) {
      for (const [month, geoData] of Object.entries(complaints[type] || {})) {
        const total = Object.values(geoData).reduce((a, b) => a + b, 0);
        if (!monthMap[month]) monthMap[month] = { month };
        monthMap[month][type] = total;
      }
    }

    return Object.values(monthMap).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [complaints]);

  /* Type Breakdown */
  const typeBreakdown = useMemo(() => {
    if (!complaints) return [];
    return TYPES.map((type) => {
      let total = 0;
      for (const [, geoData] of Object.entries(complaints[type] || {})) {
        total += Object.values(geoData).reduce((a, b) => a + b, 0);
      }
      return { type, value: total };
    });
  }, [complaints]);

  /* Yearly Totals */
  const yearlyTotals = useMemo(() => {
    if (!complaints) return [];

    const yearMap = {};

    for (const type of TYPES) {
      for (const [month, geoData] of Object.entries(complaints[type] || {})) {
        const year = month.split("-")[0];
        const total = Object.values(geoData).reduce((a, b) => a + b, 0);
        yearMap[year] = (yearMap[year] || 0) + total;
      }
    }

    return Object.entries(yearMap)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([year, total]) => ({ year, total }));
  }, [complaints]);

  /* Borough Lookup */
  const boroughLookup = useMemo(() => {
    if (!tracts) return {};
    const map = {};
    tracts.forEach((f) => {
      const { GEOID, BoroName } = f.properties;
      if (GEOID) map[GEOID] = BoroName;
    });
    return map;
  }, [tracts]);

  /* Complaints by Borough */
  const complaintsByBorough = useMemo(() => {
    if (!complaints) return [];

    const totals = {};

    for (const type of TYPES) {
      for (const [, geoData] of Object.entries(complaints[type] || {})) {
        for (const [geoid, count] of Object.entries(geoData)) {
          const borough = boroughLookup[geoid];
          if (!borough) continue;
          totals[borough] = (totals[borough] || 0) + count;
        }
      }
    }

    return Object.entries(totals)
      .map(([borough, total]) => ({ borough, total }))
      .sort((a, b) => b.total - a.total);
  }, [complaints, boroughLookup]);

  /* BarChart needs an array */
  const barData = useMemo(() => {
    const row = {};
    typeBreakdown.forEach((t) => (row[t.type] = t.value));
    return [row];
  }, [typeBreakdown]);

  const BOROUGH_COLORS = {
    Manhattan: "#198657",
    Brooklyn: "#76d917",
    Queens: "#ff8a00",
    Bronx: "#e00000",
    "Staten Island": "#2e86de"
  };

  if (!complaints || !tracts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading 311 Data…
      </div>
    );
  }

  /*  RENDER UI */

  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">

      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        🗑️ 311 Complaint Analysis
      </h1>

      {/* Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-eco-text-dark/70">Include bulky items?</span>
        <button
          onClick={() => setUseBulky((p) => !p)}
          className={`px-3 py-1 rounded text-sm shadow-sm transition ${
            useBulky
              ? "bg-eco-green-dark text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {useBulky ? "YES" : "NO"}
        </button>
      </div>

      {/* ⭐ Monthly Trend */}
      <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
        <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
          Monthly Complaint Trend by Type
        </h2>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="Collection" stroke="#198657" strokeWidth={2} />
            <Line type="monotone" dataKey="Sweeping" stroke="#76d917" strokeWidth={2} />
            <Line type="monotone" dataKey="Basket" stroke="#ff8a00" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ⭐ Type Breakdown */}
      <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
        <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
          Total Complaints by Type
        </h2>

        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={() => ""} />
            <YAxis />
            <Tooltip />
            <Legend />

            {typeBreakdown.map((item, i) => (
              <Bar key={item.type} dataKey={item.type} fill={COLORS[i]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ⭐ Yearly Trend */}
      <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
        <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
          Total Complaints Over Years
        </h2>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={yearlyTotals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="total" stroke="#198657" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ⭐ Borough Totals */}
      <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
        <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
          Complaints by Borough
        </h2>

        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={complaintsByBorough}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="borough" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="total">
              {complaintsByBorough.map((entry) => (
                <Cell
                  key={entry.borough}
                  fill={BOROUGH_COLORS[entry.borough] || "#999"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}
