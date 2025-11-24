"use client";

export default function TrashAnalysis() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">

      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        🚮 DSNY Trash Data Analysis
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        This page will visualize DSNY pickup data, tonnage, and borough-level comparisons.
      </p>

      {/* PLACEHOLDERS */}
      <div className="space-y-8">
        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px] flex items-center justify-center text-eco-text-dark/60">
          Tonnage Over Time Placeholder
        </div>

        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[350px] flex items-center justify-center text-eco-text-dark/60">
          Waste Category Breakdown Placeholder
        </div>

        <div className="bg-white/70 rounded-xl shadow-sm p-6 h-[300px] flex items-center justify-center text-eco-text-dark/60">
          Borough Comparison Placeholder
        </div>
      </div>

    </div>
  );
}
