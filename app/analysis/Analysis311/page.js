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
  Cell,
  Bar,
} from "recharts";

export default function Analysis311() {
  const [complaints, setComplaints] = useState(null);
  const [tracts, setTracts] = useState(null);

  // Load complaint + census-tract data
  useEffect(() => {
    async function load() {
      try {
        const res1 = await fetch(
          "/data/311/optimized_complaint_census_tract.json"
        );
        const res2 = await fetch("/data/311/NYC_census_tract.geojson");

        const complaintsJson = await res1.json();
        const geoJson = await res2.json();

        setComplaints(complaintsJson);
        setTracts(geoJson.features);
      } catch (e) {
        console.error("❌ Failed to load data", e);
      }
    }
    load();
  }, []);

  // If still loading
  if (!complaints || !tracts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading 311 Data...
      </div>
    );
  }

  const TYPES = ["Collection", "Sweeping", "Basket"];
  const COLORS = ["#198657", "#76d917", "#ff8a00"];

  /*  MONTHLY TREND */
  const monthlyTrend = useMemo(() => {
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

  /* BREAKDOWN BY TYPE (TOTALS) */
  const typeBreakdown = useMemo(() => {
    return TYPES.map((type) => {
      let total = 0;

      for (const [month, geoData] of Object.entries(complaints[type] || {})) {
        total += Object.values(geoData).reduce((a, b) => a + b, 0);
      }

      return { type, value: total };
    });
  }, [complaints]);

  /* YEARLY TOTALS */
  const yearlyTotals = useMemo(() => {
    const yearMap = {};

    for (const type of TYPES) {
      for (const [month, geoData] of Object.entries(complaints[type] || {})) {
        const year = month.split("-")[0];
        const total = Object.values(geoData).reduce((a, b) => a + b, 0);
        yearMap[year] = (yearMap[year] || 0) + total;
      }
    }

    return Object.entries(yearMap)
      .sort((a, b) => a[0] - b[0])
      .map(([year, total]) => ({ year, total }));
  }, [complaints]);

  /* BOROUGH LOOKUP */
  const boroughLookup = useMemo(() => {
    const map = {};

    tracts.forEach((f) => {
      const { GEOID, BoroName } = f.properties;

      if (GEOID && BoroName) {
        map[String(GEOID)] = BoroName;
      }
    });

    return map;
  }, [tracts]);
  /* COMPLAINTS BY BOROUGH  */
  const complaintsByBorough = useMemo(() => {
    const boroughTotals = {};

    for (const type of TYPES) {
      for (const [, geoData] of Object.entries(complaints[type] || {})) {
        for (const [geoid, count] of Object.entries(geoData)) {
          const borough = boroughLookup[String(geoid)];
          if (!borough) continue;

          boroughTotals[borough] = (boroughTotals[borough] || 0) + count;
        }
      }
    }
    return Object.entries(boroughTotals)
      .map(([borough, total]) => ({ borough, total }))
      .sort((a, b) => b.total - a.total);
  }, [complaints, boroughLookup]);
  const BOROUGH_COLORS = {
    Manhattan: "#198657", 
    Brooklyn: "#76d917", 
    Queens: "#ff8a00", 
    Bronx: "#e00000", 
    "Staten Island": "#2e86de", //
  };
 
  const barData = [
    typeBreakdown.reduce((acc, item) => {
      acc[item.type] = item.value;
      return acc;
    }, {}),
  ];

  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">
      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        🗑️ 311 Complaint Analysis
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        This page analyzes real NYC 311 sanitation complaints using monthly,
        borough-level, type-based, and yearly trends.
      </p>

      <div className="space-y-10">
        {/* ⭐ 1 — Monthly Trend */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Monthly Complaint Trend by Type
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Collection"
                stroke="#198657"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Sweeping"
                stroke="#76d917"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Basket"
                stroke="#ff8a00"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ⭐ 2 — Breakdown by Type */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Total Complaints by Type
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey={() => ""} />
              <YAxis />
              <Tooltip />
              <Legend />
              {typeBreakdown.map((item, i) => (
                <Bar
                  key={item.type}
                  dataKey={item.type}
                  name={item.type}
                  fill={COLORS[i]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ⭐ 3 — Yearly Trend */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Total Complaints Over Years
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={yearlyTotals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#198657"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Complaints by Borough */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Complaints by Borough
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={complaintsByBorough}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="borough" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="total" name="Total Complaints">
                {complaintsByBorough.map((entry) => (
                  <Cell
                    key={entry.borough}
                    fill={BOROUGH_COLORS[entry.borough] || "#999"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>. 
        </div>
      </div>
    </div>
  );
}
