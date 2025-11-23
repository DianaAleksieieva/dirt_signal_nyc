"use client";

export default function Analysis() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">

      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        📊 Data Analysis Overview
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        This section will include exploratory analysis, visualizations,
        and summary metrics that describe NYC waste management patterns —
        including 311 complaints, pedestrian density, DSNY infrastructure,
        and census-based geographic trends.
      </p>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SUMMARY CARDS */}
        <div className="bg-eco-green-soft p-5 rounded-xl shadow-sm space-y-2">
          <p className="text-eco-green-dark text-lg font-semibold">
            🗑️ Total 311 Complaints (2024)
          </p>
          <p className="text-3xl font-bold text-eco-green-dark">42,310</p>
          <p className="text-sm text-eco-text-dark/70">
            Placeholder — will load real dataset.
          </p>
        </div>

        <div className="bg-eco-green-soft p-5 rounded-xl shadow-sm space-y-2">
          <p className="text-eco-green-dark text-lg font-semibold">
            🚶 Peak Pedestrian Activity
          </p>
          <p className="text-3xl font-bold text-eco-green-dark">Evenings</p>
          <p className="text-sm text-eco-text-dark/70">
            Based on NYC pedestrian counts (incoming dataset).
          </p>
        </div>

        <div className="bg-eco-green-soft p-5 rounded-xl shadow-sm space-y-2">
          <p className="text-eco-green-dark text-lg font-semibold">
            🏙️ Dirtiest Borough (2024)
          </p>
          <p className="text-3xl font-bold text-eco-green-dark">Manhattan</p>
          <p className="text-sm text-eco-text-dark/70">
            Placeholder — will compute using tract-level aggregation.
          </p>
        </div>

      </div>

      {/* CHART PLACEHOLDERS */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CHART 1 */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px] flex items-center justify-center text-eco-text-dark/60">
          <span>📈 Timeseries Plot Placeholder</span>
        </div>

        {/* CHART 2 */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px] flex items-center justify-center text-eco-text-dark/60">
          <span>🗺️ Choropleth Map Placeholder</span>
        </div>

        {/* CHART 3 FULL WIDTH */}
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[350px] flex items-center justify-center text-eco-text-dark/60 lg:col-span-2">
          <span>📊 Bar Chart / Histogram Placeholder</span>
        </div>

      </div>
    </div>
  );
}
