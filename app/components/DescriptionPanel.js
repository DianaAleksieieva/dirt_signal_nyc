"use client";

export default function DescriptionPanel({ layer }) {
  return (
    <div className="lg:w-1/4 w-full bg-eco-green-soft p-5 rounded-xl shadow-sm space-y-5 h-[70vh] lg:h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold text-eco-green-dark">
        NYC Cleanliness
      </h2>

      {/* Dynamic content based on loaded layer */}
      {layer === "311" && (
        <>
          <div className="space-y-1">
            <p className="text-eco-green-dark font-semibold text-lg">
              📍 311 Trash Complaints
            </p>
            <p className="text-2xl font-bold text-eco-green-dark">42,310</p>
            <p className="text-sm text-eco-text-dark/70">
              Total complaints recorded in 2024 (placeholder).
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-eco-green-dark font-semibold">
              🏙️ Borough Cleanliness Index
            </p>
            <ul className="text-sm text-eco-text-dark/80 list-disc ml-5 space-y-1">
              <li>
                <span className="font-semibold">Manhattan:</span> Highest density of complaints
              </li>
              <li>
                <span className="font-semibold">Staten Island:</span> Cleanest overall
              </li>
              <li>
                <span className="font-semibold">Bronx:</span> High hotspot frequency
              </li>
            </ul>
          </div>

          <p className="text-sm text-eco-text-dark leading-relaxed">
            These metrics summarize trash-related 311 reports, population
            density, foot-traffic behavior, and availability of public waste
            bins. Data will auto-update when real datasets are connected.
          </p>
        </>
      )}

      {layer === "trash" && (
        <>
          <p className="text-lg font-semibold text-eco-green-dark">
            🗑️ Trash Dataset Loaded
          </p>
          <p className="text-sm text-eco-text-dark">
            Summary for trash dataset will go here.
          </p>
        </>
      )}

      {layer === "bins" && (
        <>
          <p className="text-lg font-semibold text-eco-green-dark">
            🗑️ DSNY Bins Dataset
          </p>
          <p className="text-sm text-eco-text-dark">
            Summary for DSNY bins dataset will appear here.
          </p>
        </>
      )}
    </div>
  );
}
