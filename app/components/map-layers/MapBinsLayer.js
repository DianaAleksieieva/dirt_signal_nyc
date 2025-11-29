"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import dynamic from "next/dynamic";

// Dynamically import MarkerClusterGroup (fix SSR issues)
const MarkerClusterGroup = dynamic(
  async () => (await import("react-leaflet-cluster")).default,
  { ssr: false }
);

export default function MapBinsLayer({ zoom }) {
  const [bins, setBins] = useState([]);
  const [CircleMarker, setCircleMarker] = useState(null);
  const [Tooltip, setTooltip] = useState(null);

  // --- Load react-leaflet components dynamically ---
  useEffect(() => {
    async function load() {
      const rl = await import("react-leaflet");
      setCircleMarker(() => rl.CircleMarker);
      setTooltip(() => rl.Tooltip);
    }
    load();
  }, []);

  // --- Load & parse CSV file ---
  useEffect(() => {
    Papa.parse("/data/bins/DSNY_Litter_Basket_Inventory.csv", {
      download: true,
      header: true,
      complete: ({ data }) => {
        const parsed = data
          .map((row) => {
            if (!row.point) return null;

            // "POINT (-73.98 40.74)"
            const match = row.point.match(
              /POINT\s*\(([-0-9.]+)\s+([-0-9.]+)\)/
            );
            if (!match) return null;

            const lon = parseFloat(match[1]);
            const lat = parseFloat(match[2]);

            return {
              id: row.BASKETID,
              type: row.BASKETTYPE,
              owner: row.OWNERTYPE,
              street1: row.STREETNAME1,
              street2: row.STREETNAME2,
              section: row.SECTION,
              lat,
              lon,
            };
          })
          .filter(Boolean);

        setBins(parsed);
      },
    });
  }, []);

  if (!CircleMarker || !Tooltip) return null;

  // ZOOM 
  const SHOW_INDIVIDUAL_POINTS_ZOOM = 15;
  const showPoints = zoom >= SHOW_INDIVIDUAL_POINTS_ZOOM;

  return (
    <>
      {!showPoints && (
        <MarkerClusterGroup
          chunkedLoading
          zoomToBoundsOnClick={false}
          spiderfyOnClick={false}
          spiderfyOnEveryZoom={false}
          showCoverageOnHover={false}
        >
          {bins.map((b) => (
            <CircleMarker
              key={b.id}
              center={[b.lat, b.lon]}
              radius={3}
              pathOptions={{
                color: "#198657",
                fillColor: "#198657",
                fillOpacity: 0.9,
              }}
            >
              <Tooltip direction="top">
                <div className="text-xs leading-tight">
                  <strong>Bin #{b.id}</strong>
                  <br />
                  Type: {b.type}
                  <br />
                  Owner: {b.owner}
                  <br />
                  {b.street1} & {b.street2}
                  <br />
                  Section: {b.section}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
      )}

      {showPoints && (
        <>
          {bins.map((b) => (
            <CircleMarker
              key={b.id}
              center={[b.lat, b.lon]}
              radius={4}
              pathOptions={{
                color: "#198657",
                fillColor: "#198657",
                fillOpacity: 0.95,
              }}
            >
              <Tooltip direction="top">
                <div className="text-xs leading-tight">
                  <strong>Bin #{b.id}</strong>
                  <br />
                  Type: {b.type}
                  <br />
                  Owner: {b.owner}
                  <br />
                  {b.street1} & {b.street2}
                  <br />
                  Section: {b.section}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </>
      )}
    </>
  );
}
