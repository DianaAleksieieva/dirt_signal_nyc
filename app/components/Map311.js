"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

// Fix missing marker icons
const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function Map311() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/NYC_census_tract.geojson")
      .then((res) => res.json())
      .then((geojson) => setData(geojson));
  }, []);

  return (
    <MapContainer
      center={[40.7831, -73.97]}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-full rounded-xl"
    >
      <TileLayer
        attribution='© <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        subdomains={["a", "b", "c", "d"]}
      />

      {/* Polygons in light green */}
      {data && (
        <GeoJSON
          data={data}
          style={() => ({
            color: "#198657ff",        
            weight: 0.35,
            fillColor: "#b8e6d4",    
            fillOpacity: 0.35,       
          })}
          onEachFeature={(feature, layer) => {
            const name =
              feature.properties?.name ||
              feature.properties?.NAMELSAD ||
              "Census Tract";

            layer.bindPopup(name);
          }}
        />
      )}
    </MapContainer>
  );
}
