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

  // Load JSON file once
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/data/311/optimized_complaint_census_tract.json");
        const json = await res.json();
        setComplaints(json);
      } catch (e) {
        console.error("❌ Failed to load complaint data", e);
      }
    }
    load();
  }, []);

  // If still loading
  if (!complaints) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading 311 Data...
      </div>
    );
  }

  const TYPES = ["Collection", "Sweeping", "Basket"];

  // --- 1️⃣ Monthly multi-series trend (aggregated by month) ---
  const monthlyTrend = useMemo(() => {
    const monthMap = {}; // "2010-01" → { Collection:123, Sweeping:90, Basket:12 }

    for (const type of TYPES) {
      for (const [month, geoData] of Object.entries(complaints[type] || {})) {
        const total = Object.values(geoData).reduce((a, b) => a + b, 0);
        if (!monthMap[month]) monthMap[month] = { month };
        monthMap[month][type] = total;
      }
    }

    // Convert to sorted array
    return Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
  }, [complaints]);

  // --- 2️⃣ Breakdown by complaint type ---
  const typeBreakdown = useMemo(() => {
    return TYPES.map(type => {
      let total = 0;

      for (const [month, geoData] of Object.entries(complaints[type] || {})) {
        total += Object.values(geoData).reduce((a, b) => a + b, 0);
      }

      return { type, value: total };
    });
  }, [complaints]);

  // --- 3️⃣ Yearly totals (all types combined) ---
  const yearlyTotals = useMemo(() => {
    const yearMap = {}; // "2010" → total complaints across all types

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

  // BAR COLORS (consistent with your eco palette)
  const COLORS = ["#198657", "#76d917", "#ff8a00"];

  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">
      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        🗑️ 311 Complaint Analysis
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        This page analyzes real NYC 311 sanitation complaints using monthly, type-based,
        and yearly trends.
      </p>

      <div className="space-y-10">

        {/* ⭐ 1 — Monthly Multi-Series Trend */}
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

              <Line type="monotone" dataKey="Collection" stroke="#198657" strokeWidth={2} />
              <Line type="monotone" dataKey="Sweeping" stroke="#76d917" strokeWidth={2} />
              <Line type="monotone" dataKey="Basket" stroke="#ff8a00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ⭐ 2 — Breakdown by Type */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Total Complaints by Type
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={typeBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="value">
                {typeBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ⭐ 3 — Yearly Trend Line */}
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

      </div>
    </div>
  );
}
