"use client";

import Link from "next/link";

export default function Analysis() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 px-6 pb-10">

      <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
        📊 Data Analysis Overview
      </h1>

      <p className="text-eco-text-dark/80 max-w-2xl mb-8">
        Choose an analysis category below. Each section provides exploratory
        analysis, visualizations, and insights into NYC’s waste and cleanliness patterns.
      </p>

      {/* NAVIGATION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <Link href="/analysis/Analysis311">
          <div className="cursor-pointer bg-eco-green-soft p-6 rounded-xl shadow-sm hover:bg-eco-green-dark hover:text-white transition">
            <h2 className="text-lg font-semibold mb-2">🗑️ 311 Complaints</h2>
            <p className="text-sm opacity-80">
              View trends, hotspots, and temporal patterns.
            </p>
          </div>
        </Link>

        <Link href="/analysis/TrashAnalysis">
          <div className="cursor-pointer bg-eco-green-soft p-6 rounded-xl shadow-sm hover:bg-eco-green-dark hover:text-white transition">
            <h2 className="text-lg font-semibold mb-2">🚮 DSNY Trash Data</h2>
            <p className="text-sm opacity-80">
              Tonnage, pickup density, and waste categories.
            </p>
          </div>
        </Link>

        <Link href="/analysis/ModelingAnalysis">
          <div className="cursor-pointer bg-eco-green-soft p-6 rounded-xl shadow-sm hover:bg-eco-green-dark hover:text-white transition">
            <h2 className="text-lg font-semibold mb-2">📈 Modeling & Forecasting</h2>
            <p className="text-sm opacity-80">
              Predictive models, regressions, and ML experiments.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
