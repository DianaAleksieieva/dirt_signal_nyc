"use client";

export default function MapPage() {
  return (
    <div>
      <h1>🗺️ NYC Map</h1>
      <p>The interactive map will appear here.</p>

      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          marginTop: "20px",
          background: "#ddd",
          borderRadius: "10px"
        }}
      >
        {/* Map goes here */}
      </div>
    </div>
  );
}
