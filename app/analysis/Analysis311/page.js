"use client";

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

// 3-line monthly timeseries placeholder
const sampleMultiSeries = [
  { month: "Jan", Collection: 120, Sweeping: 90, Basket: 60 },
  { month: "Feb", Collection: 150, Sweeping: 110, Basket: 70 },
  { month: "Mar", Collection: 180, Sweeping: 130, Basket: 85 },
  { month: "Apr", Collection: 160, Sweeping: 125, Basket: 80 },
  { month: "May", Collection: 210, Sweeping: 150, Basket: 95 },
  { month: "Jun", Collection: 200, Sweeping: 140, Basket: 90 },
];

// Placeholder type breakdown
const sampleTypeBreakdown = [
  { type: "Collection", value: 1200 },
  { type: "Sweeping", value: 900 },
  { type: "Basket", value: 600 },
];

// NEW: Placeholder yearly totals
const sampleYearlyTotals = [
  { year: "2015", total: 42000 },
  { year: "2016", total: 45000 },
  { year: "2017", total: 47000 },
  { year: "2018", total: 52000 },
  { year: "2019", total: 56000 },
  { year: "2020", total: 51000 },
  { year: "2021", total: 58000 },
  { year: "2022", total: 60000 },
  { year: "2023", total: 64000 },
];

export default function Analysis311() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">
      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        🗑️ 311 Complaint Analysis
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        This page will include full exploratory analysis of NYC 311 sanitation
        complaints.
      </p>

      <div className="space-y-10">
        {/* MULTI-LINE TIMESERIES (by type)*/}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Monthly Complaint Trend by Type (Placeholder)
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={sampleMultiSeries}>
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

        {/* BAR CHART BY TYPE */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Complaint Types Breakdown (Placeholder)
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={sampleTypeBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="value">
                <Cell fill="#198657" /> {/* dark eco green (Collection) */}
                <Cell fill="#76d917" /> {/* lime green (Sweeping) */}
                <Cell fill="#ff8a00" /> {/* eco orange (Basket) */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* YEARLY TREND LINE */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px]">
          <h2 className="text-lg font-semibold text-eco-green-dark mb-3">
            Total Complaints Over Years (Placeholder)
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={sampleYearlyTotals}>
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
