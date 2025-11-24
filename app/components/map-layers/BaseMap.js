"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function BaseMap({ children }) {
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

      {children}
    </MapContainer>
  );
}
