"use client";

export default function Analysis311() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">

      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        🗑️ 311 Complaint Analysis
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        This page will include full exploratory analysis of NYC 311 sanitation complaints.
      </p>

      {/* PLACEHOLDERS */}
      <div className="space-y-8">
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px] flex items-center justify-center text-eco-text-dark/60">
          Timeseries Chart Placeholder
        </div>

        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[350px] flex items-center justify-center text-eco-text-dark/60">
          Choropleth Map Placeholder
        </div>

        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px] flex items-center justify-center text-eco-text-dark/60">
          Summary Metrics Placeholder
        </div>
      </div>

    </div>
  );
}
