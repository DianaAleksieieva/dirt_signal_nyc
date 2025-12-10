"use client";

import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  BarChart,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const SeasonalityChart = ({ data }) => (
  <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[400px]">
    <h3 className="text-lg font-bold text-gray-700 mb-4">
      Seasonality: Complaints vs. Waste
    </h3>
    <ResponsiveContainer width="100%" height="90%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Month_Num"
          label={{ value: "Month", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          yAxisId="left"
          domain={[2, 7]}
          label={{ value: "Complaints", angle: -90, position: "insideLeft" }}
        />
        <YAxis
          yAxisId="right"
          domain={[3500, 5000]}
          orientation="right"
          label={{ value: "Refuse Tons", angle: 90, position: "insideRight" }}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="linear"
          dataKey="Complaints"
          stroke="#e74c3c"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Avg Complaints"
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="Refuse_Tons"
          stroke="#3498db"
          strokeWidth={2}
          dot={{ r: 4 }}
          shape="square"
          name="Refuse (Tons)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

const BOROUGH_COLORS = {
  MN: "#198657",
  BX: "#e00000",
  BK: "#76d917",
  QN: "#ff8a00",
  SI: "#2e86de",
};
const ResourceScatterChart = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    const b = item.Borough;
    if (!acc[b]) acc[b] = [];
    acc[b].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[500px]">
      <h3 className="text-lg font-bold text-gray-700 mb-1">
        Foot Traffic vs. Basket Density
      </h3>
      {/* <p className="text-xs text-gray-500 mb-4">
        (Bubble Size = Complaints Intensity)
      </p> */}
      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart margin={{ top: 40, right: 20, bottom: 50, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="Pedestrian_Count"
            name="Pedestrian Traffic"
            label={{
              value: "Avg Pedestrian Count",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            type="number"
            dataKey="Baskets_Per_1k"
            name="Baskets/1k"
            label={{
              value: "Baskets per 1k Residents",
              angle: -90,
              position: "insideLeft",
            }}
          />
          {/* <ZAxis
            type="number"
            dataKey="Complaints_Per_1k"
            range={[50, 600]}
            name="Complaints"
          /> */}
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-white p-2 border shadow text-xs">
                    <p className="font-bold">
                      {d.CD_ID} ({d.Borough})
                    </p>
                    <p>Pedestrians: {Math.round(d.Pedestrian_Count)}</p>
                    <p>Baskets: {d.Baskets_Per_1k.toFixed(2)}</p>
                    <p>Complaints: {d.Complaints_Per_1k.toFixed(1)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend verticalAlign="top" height={36} />
          {Object.keys(groupedData).map((b) => (
            <Scatter
              key={b}
              name={b}
              data={groupedData[b]}
              fill={BOROUGH_COLORS[b] || "#888"}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const CompareBarChart = ({ data }) => (
  <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[400px]">
    <h3 className="text-lg font-bold text-gray-700 mb-4">
      Top Complaints: SI vs. NYC
    </h3>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" unit="%" />
        <YAxis
          dataKey="type"
          type="category"
          width={250}
          tick={{ fontSize: 11 }}
        />
        <Tooltip formatter={(val) => `${val}%`} />
        <Legend />
        <Bar
          dataKey="Staten Island"
          fill="#2e86de"
          name="Staten Island (%)"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="Rest of NYC"
          fill="#95a5a6"
          name="Rest of NYC (%)"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const CorrelationMatrix = ({ data }) => {
  const vars = [
    "Complaints_Per_1k",
    "Refuse_Tons",
    "Pedestrian_Count",
    "Baskets_Per_1k",
  ];
  const labelMap = {
    Complaints_Per_1k: "Complaints",
    Refuse_Tons: "Refuse",
    Pedestrian_Count: "Pedestrians",
    Baskets_Per_1k: "Baskets",
  };
  const getColor = (val) => {
    const i = Math.abs(val);
    return val > 0
      ? `rgba(231, 76, 60, ${0.1 + i * 0.9})`
      : `rgba(52, 152, 219, ${0.1 + i * 0.9})`;
  };

  return (
    <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[400px] flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold text-gray-700 mb-6 self-start">
        Correlation Matrix
      </h3>
      <div className="grid grid-cols-5 gap-2 text-sm w-full max-w-lg">
        <div className="font-bold"></div>
        {vars.map((v) => (
          <div
            key={v}
            className="font-bold text-center text-gray-600 truncate"
            title={v}
          >
            {labelMap[v]}
          </div>
        ))}
        {vars.map((rowVar) => (
          <React.Fragment key={rowVar}>
            <div
              className="font-bold text-gray-600 flex items-center justify-end pr-2 truncate"
              title={rowVar}
            >
              {labelMap[rowVar]}
            </div>
            {vars.map((colVar) => {
              const cell = data.find((d) => d.x === colVar && d.y === rowVar);
              const val = cell ? cell.value : 0;
              return (
                <div
                  key={`${rowVar}-${colVar}`}
                  className="h-12 w-full flex items-center justify-center rounded text-gray-800 font-medium"
                  style={{ backgroundColor: getColor(val) }}
                >
                  {val.toFixed(2)}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function AnalysisCharts() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    async function fetchData() {
      try {
        const res = await fetch("/data/analysis/analysis_data.json");
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!isMounted) return null;

  if (loading)
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500 animate-pulse">
        Loading charts...
      </div>
    );

  if (!data || !data.seasonality) {
    return (
      <div className="w-full h-40 flex flex-col items-center justify-center text-red-500 bg-red-50 rounded-lg p-4">
        <p className="font-bold">Error loading data.</p>
        <p className="text-sm">
          Check <code>/public/data/analysis/analysis_data.json</code>
        </p>
      </div>
    );
  }

  const ResourceEfficiencyChart = ({ data }) => {
  return (
    <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[500px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-700">Infrastructure vs. Complaints (Weighted by Traffic)</h3>
        <p className="text-xs text-gray-500">
          X: Basket Density | Y: Complaints | <span className="font-bold text-gray-800">Bubble Size: Pedestrian Traffic</span>
        </p>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          
          <XAxis 
            type="number" 
            dataKey="Baskets_Per_1k" 
            name="Basket Density" 
            label={{ value: "Baskets / 1k Pop", position: "insideBottom", offset: -15, fontSize: 12 }} 
          />
          
          <YAxis 
            type="number" 
            dataKey="Complaints_Per_1k" 
            name="Complaints" 
            label={{ value: "Complaints / 1k Pop", angle: -90, position: "insideLeft", style: { textAnchor: 'middle' } }} 
          />
          <ZAxis 
            type="number" 
            dataKey="Pedestrian_Count" 
            range={[50, 800]} 
            name="Pedestrians" 
          />
          
          {/* Tooltip */}
          <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div className="bg-white/95 p-3 border border-gray-100 rounded-lg shadow-xl text-xs">
                  <div className="flex items-center gap-2 mb-2 border-b pb-1">
                    <div className="w-2 h-2 rounded-full" style={{background: BOROUGH_COLORS[d.Borough]}}></div>
                    <span className="font-bold">{d.CD_ID}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <span className="text-gray-500">Baskets:</span> <span className="font-mono">{d.Baskets_Per_1k.toFixed(2)}</span>
                    <span className="text-gray-500">Complaints:</span> <span className="font-mono">{d.Complaints_Per_1k.toFixed(1)}</span>
                    <span className="text-gray-500 font-bold">Traffic:</span> <span className="font-mono font-bold">{Math.round(d.Pedestrian_Count)}</span>
                  </div>
                </div>
              );
            }
            return null;
          }} />

          <Scatter name="Districts" data={data}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={BOROUGH_COLORS[entry.Borough] || "#888"} 
                fillOpacity={0.7}
                stroke="#fff"
                strokeWidth={1}
              />
            ))}
          </Scatter>
          
          <Legend 
            verticalAlign="top" 
            height={36} 
            payload={Object.keys(BOROUGH_COLORS).map(b => ({
              value: b,
              type: 'circle',
              id: b,
              color: BOROUGH_COLORS[b]
            }))}
          />

        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6 my-8">
      <CorrelationMatrix data={data.correlation} />
      <ResourceScatterChart data={data.scatter} />
      <ResourceEfficiencyChart data={data.scatter} />
      <SeasonalityChart data={data.seasonality} />
      {/* <CompareBarChart data={data.siComparison} /> */}
    </div>
  );
}
