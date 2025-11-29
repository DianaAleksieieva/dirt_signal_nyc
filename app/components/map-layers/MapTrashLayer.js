"use client";

import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const COLORS = ["#2ecc40","#76d917","#a7e400","#d4ed00","#ffe600","#ffcc00","#ffb000","#ff8a00","#ff5c00","#ff2b00","#e00000","#a30000ff"];

export default function MapTrashLayer({ data }) {
  const [GeoJSON, setGeoJSON] = useState(null);
  const [tonnageMap, setTonnageMap] = useState(new Map());
  const [minTonnage, setMinTonnage] = useState(null);
  const [maxTonnage, setMaxTonnage] = useState(null);
  const map = useMap();

  useEffect(() => {
    async function load() {
      const rl = await import("react-leaflet");
      setGeoJSON(() => rl.GeoJSON);
    }
    load();
  }, []);

  useEffect(() => {
    if (!map) return;
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "trash-legend");
      div.style.pointerEvents = "auto";
      const steps = minTonnage != null && maxTonnage != null
        ? Array.from({length: 6}, (_, i) => {
            const t = i / 5;
            return `<div style="display:flex;align-items:center;margin:4px 0"><span style="display:inline-block;width:18px;height:12px;background:${COLORS[Math.floor(t * (COLORS.length - 1))]};margin-right:8px;border:1px solid #999"></span><span>${Math.round(minTonnage + t * (maxTonnage - minTonnage))}</span></div>`;
          }).join('')
        : [0, 3, 6, 8, 11].map((i, ii) => 
            `<div style="display:flex;align-items:center;margin:4px 0"><span style="display:inline-block;width:18px;height:12px;background:${COLORS[i]};margin-right:8px;border:1px solid #999"></span><span>${ii === 0 ? 'Low' : ii === 4 ? 'High' : ''}</span></div>`
          ).join('');
      div.innerHTML = `<div style="padding:8px 10px;font-size:12px;background:rgba(255,255,255,0.92);border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,0.3)"><strong style="display:block;margin-bottom:6px">Tonnage</strong>${steps}</div>`;
      return div;
    };
    legend.addTo(map);
    return () => legend.remove();
  }, [map, minTonnage, maxTonnage]);

  useEffect(() => {
    async function loadCSV() {
      try {
        const res = await fetch("/data/tonnage/community_district_tonnage.csv");
        if (!res.ok) return;
        const lines = (await res.text()).trim().split(/\r?\n/);
        if (lines.length < 2) return;

        const split = (line) => {
          const out = [], cur = []; let inQ = false;
          for (const ch of line) {
            if (ch === '"') inQ = !inQ;
            else if (ch === ',' && !inQ) { out.push(cur.join('').trim().replace(/^"|"$/g, '')); cur.length = 0; }
            else cur.push(ch);
          }
          out.push(cur.join('').trim().replace(/^"|"$/g, ''));
          return out;
        };

        const h = split(lines[0]).map(s => s.toLowerCase());
        const keyIdx = h.findIndex(s => ["cdta2020","geoid","cd","community_district","district","namelsad","name"].includes(s)) ?? 0;
        let valIdx = h.findIndex(s => ["tonnage","tons","total_tonnage","total","value"].includes(s));
        if (valIdx === -1) valIdx = h.findIndex((_, i) => !isNaN(parseFloat(split(lines[1])[i]?.replace(/[^0-9.\-]/g, '')))) ?? -1;
        if (valIdx === -1) return;

        const map = new Map();
        let min = Infinity, max = -Infinity;
        for (let i = 1; i < lines.length; i++) {
          const cols = split(lines[i]);
          const k = cols[keyIdx]?.trim(), v = parseFloat(cols[valIdx]?.replace(/[^0-9.\-]/g, ''));
          if (!k || isNaN(v)) continue;
          [k, k.toLowerCase()].forEach(key => map.set(key, v));
          if (v < min) min = v;
          if (v > max) max = v;
        }
        if (map.size > 0) {
          setTonnageMap(map);
          setMinTonnage(min === Infinity ? null : min);
          setMaxTonnage(max === -Infinity ? null : max);
        }
      } catch {}
    }
    loadCSV();
  }, []);

  const formatDistrict = (code) => {
    const boroughs = { SI: 'Staten Island', BK: 'Brooklyn', MN: 'Manhattan', QN: 'Queens', BX: 'Bronx' };
    const match = String(code).match(/^([A-Z]{2})(\d+)$/);
    return match ? `${boroughs[match[1]] || match[1]} District ${parseInt(match[2])}` : code;
  };

  const getColor = (feature) => {
    const props = feature?.properties;
    if (!props) return COLORS[0];
    
    const keys = [props.CDTA2020, props.GEOID, props.NAMELSAD, props.name].filter(Boolean);
    for (const k of keys) {
      const v = tonnageMap.get(k) ?? tonnageMap.get(String(k).toLowerCase()) ?? tonnageMap.get(String(k).replace(/\D/g, ''));
      if (v != null && minTonnage != null && maxTonnage != null) {
        const t = maxTonnage === minTonnage ? 0 : Math.max(0, Math.min(1, (v - minTonnage) / (maxTonnage - minTonnage)));
        return COLORS[Math.floor(t * (COLORS.length - 1))];
      }
    }
    
    const key = props.CDTA2020 || props.GEOID || props.name || 'unknown';
    return COLORS[Array.from(String(key)).reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
  };

const hasMatchingDistrict = (feature) => {
    const props = feature?.properties;
    if (!props) return false;
    
    const keys = [props.CDTA2020, props.GEOID, props.NAMELSAD, props.name].filter(Boolean);
    for (const k of keys) {
      if (tonnageMap.has(k) || tonnageMap.has(String(k).toLowerCase()) || tonnageMap.has(String(k).replace(/\D/g, ''))) {
        return true;
      }
    }
    return false;
  };

  if (!data || !GeoJSON) return null;

  return (
    <GeoJSON
      key={tonnageMap.size} 
      data={data}
      filter={hasMatchingDistrict}
      style={(f) => ({ color: "#555", weight: 0.4, fillColor: getColor(f), fillOpacity: 0.55 })}
      onEachFeature={(f, layer) => {
        const district = formatDistrict(f.properties?.CDTA2020 || f.properties?.NAMELSAD || f.properties?.name || "District");
        const props = f?.properties;
        const keys = [props?.CDTA2020, props?.GEOID, props?.NAMELSAD, props?.name].filter(Boolean);
        let tonnage = null;
        for (const k of keys) {
          tonnage = tonnageMap.get(k) ?? tonnageMap.get(String(k).toLowerCase()) ?? tonnageMap.get(String(k).replace(/\D/g, ''));
          if (tonnage != null) break;
        }
        layer.bindPopup(`${district}<br>Tonnage: ${tonnage != null ? Math.round(tonnage) : 'N/A'}`);
      }}
    />
  );
}