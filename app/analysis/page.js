"use client";

import Link from "next/link";

export default function Analysis() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-3 pb-10">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold text-eco-green-dark mb-4">
          📊 Data Analysis Overview
        </h1>

        <p className="text-eco-text-dark/80 max-w-2xl mb-8">
          This panel summarizes the results of Exploratory Data Analysis.
        </p>

        {/* NAVIGATION BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/analysis/TrashAnalysis">
            <div className="cursor-pointer bg-eco-green-soft p-6 rounded-xl shadow-sm hover:bg-eco-green-dark hover:text-white transition">
              <h2 className="text-lg font-semibold mb-2">
                🚮 DSNY Monthly Trash Data
              </h2>
              <p className="text-sm opacity-80">
                Tonnage, pickup density, and waste categories.
              </p>
            </div>
          </Link>
          <Link href="/analysis/Analysis311">
            <div className="cursor-pointer bg-eco-green-soft p-6 rounded-xl shadow-sm hover:bg-eco-green-dark hover:text-white transition">
              <h2 className="text-lg font-semibold mb-2">🗑️ 311 Complaints</h2>
              <p className="text-sm opacity-80">
                View trends, hotspots, and temporal patterns.
              </p>
            </div>
          </Link>

          <Link href="/analysis/ModelingAnalysis">
            <div className="cursor-pointer bg-eco-green-soft p-6 rounded-xl shadow-sm hover:bg-eco-green-dark hover:text-white transition">
              <h2 className="text-lg font-semibold mb-2">
                📈 Major Cleanliness Issues
              </h2>
              <p className="text-sm opacity-80">
                Trends and dominant cleanliness problems.
              </p>
            </div>
          </Link>
        </div>
      </div>
      {/* PROJECT OVERVIEW */}
      <div className="mt-16 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4">
        {/* LEFT COLUMN */}
        <div>
          <h2 className="text-2xl font-bold text-eco-green-dark mb-4">
            🌱 DirtSignal NYC
          </h2>

          <p className="text-eco-text-dark/80 mb-4">
            New York is an incredibly beautiful city, but both residents and
            visitors agree that cleanliness remains one of its most visible
            challenges. Analysis of DSNY data for 2024 shows that approximately
            <span className="font-semibold">
              {" "}
              8,147 tons of garbage are collected daily{" "}
            </span>
            from residential buildings.
          </p>

          <p className="text-eco-text-dark/80 mb-4">
            Despite the scale of DSNY operations, street cleanliness issues
            persist. To better understand why, this project analyzes
            sanitation-related
            <span className="font-semibold"> 311 complaints </span>
            alongside waste tonnage, pedestrian traffic, and sanitation
            infrastructure.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <h3 className="text-xl font-semibold text-eco-green-dark mb-3">
            📂 Data Sources
          </h3>
          <ul className="text-sm text-eco-text-dark/80 space-y-2">
            <li>
              <span className="font-semibold">
                NYC Population by Community Districts
              </span>{" "}
              — Population estimates by district
            </li>
            <li>
              <span className="font-semibold">DSNY Monthly Tonnage Data</span> —
              Monthly waste collection records
            </li>
            <li>
              <span className="font-semibold">
                DSNY Litter Basket Locations
              </span>{" "}
              — Public trash can locations
            </li>
            <li>
              <span className="font-semibold">NYC 311 Trash Reports</span> —
              Sanitation-related complaints
            </li>
            <li>
              <span className="font-semibold">Bi-Annual Pedestrian Counts</span>{" "}
              — Foot traffic indicators
            </li>
            <li>
              <span className="font-semibold">OpenStreetMap (OSM)</span> —
              Census tracts & neighborhood boundaries
            </li>
          </ul>
        </div>
      </div>
      {/* PROJECT COMPONENTS */}
      <div className=" mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4">
        {/* ANALYSIS DASHBOARD */}
        <div>
          <h3 className="text-2xl font-semibold text-eco-green-dark mb-4">
            1. Analysis Dashboard
          </h3>

          <p className="text-eco-text-dark/80 mb-6 max-w-3xl">
            The Analysis section provides exploratory data analysis and summary
            insights before users interact with the map. It highlights waste
            patterns, complaint behavior, and dominant sanitation issues across
            New York City.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">
                🚮 DSNY Tonnage Analysis
              </h4>
              <ul className="list-disc list-inside text-sm text-eco-text-dark/80 space-y-1">
                <li>Annual DSNY waste tonnage by borough</li>
                <li>Waste volume comparisons across boroughs and districts</li>
                <li>Tonnage trends over time</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                🗑️ 311 Sanitation Complaints
              </h4>
              <ul className="list-disc list-inside text-sm text-eco-text-dark/80 space-y-1">
                <li>Total complaints and complaints by category</li>
                <li>Temporal trends and seasonality</li>
                <li>Complaint intensity by borough</li>
                <li>Identification of high-complaint areas</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-2">
              📈 Analysis of Top Cleanliness Issues
            </h4>
            <p className="text-sm text-eco-text-dark/80 max-w-3xl">
              Identifies the most common sanitation issues faced by each borough
              and examines how pedestrian traffic influences litter complaints.
            </p>
          </div>
        </div>

        {/* INTERACTIVE MAP */}
        <div>
          <h3 className="text-2xl font-semibold text-eco-green-dark mb-4">
            2. Interactive Map
          </h3>

          <p className="text-eco-text-dark/80 mb-6 max-w-3xl">
            The Map section serves as the project’s primary research tool, using
            multi-layered geospatial visualizations to explore sanitation
            conditions across neighborhoods and census tracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">
                DSNY Monthly Waste Data Layer
              </h4>
              <ul className="list-disc list-inside text-sm text-eco-text-dark/80 space-y-1">
                <li>Monthly and annual waste totals</li>
                <li>Relative waste volume differences</li>
                <li>High-waste neighborhood identification</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                311 Sanitation Complaints Layer
              </h4>
              <ul className="list-disc list-inside text-sm text-eco-text-dark/80 space-y-1">
                <li>Complaint density by census tract</li>
                <li>Filters by complaint type</li>
                <li>Time coverage: 2010–2025</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">
                Top Sanitation Issues (“Common Issues”)
              </h4>
              <ul className="list-disc list-inside text-sm text-eco-text-dark/80 space-y-1">
                <li>Dominant issue per borough</li>
                <li>Winner-take-all classification</li>
                <li>Color-coded issue categories</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">DSNY Trash Can Layer</h4>
              <p className="text-sm text-eco-text-dark/80">
                Displays the spatial distribution of DSNY-operated trash cans
                across New York City.
              </p>
            </div>
          </div>
        </div>

        {/* METHODOLOGY */}
        <div>
          <h2 className="text-3xl font-bold text-eco-green-dark mb-4">
            🔬 Methodology
          </h2>

          <p className="text-eco-text-dark/80 max-w-4xl mb-4">
            CleanSight NYC integrates multiple public datasets to investigate
            the extent and drivers of New York City’s sanitation challenges.
            Over 1.7 million 311 sanitation-related complaints (2010–2025) were
            analyzed and categorized into major issue types, including trash
            collection, litter baskets, and street sweeping.
          </p>

          <p className="text-eco-text-dark/80 max-w-4xl">
            Complaints were aggregated at the census tract level for spatial
            analysis. Monthly DSNY tonnage data was analyzed both in absolute
            terms and normalized by population. Pedestrian counts were
            incorporated as a proxy for human activity, and DSNY trash can
            locations were overlaid to assess sanitation infrastructure
            adequacy.
          </p>
        </div>

        {/* KEY FINDINGS */}
        <div>
          <h2 className="text-3xl font-bold text-eco-green-dark mb-6">
            🔍 Key Findings
          </h2>

          <ul className="space-y-4 text-eco-text-dark/80 max-w-4xl">
            <li>
              <strong>Household Waste Volume:</strong> Queens, Staten Island,
              and Brooklyn show higher per-capita waste tonnage than Manhattan,
              likely due to housing structure and storage capacity differences.
            </li>
            <li>
              <strong>311 Complaint Patterns:</strong> Litter complaints
              dominate the data, while street cleaning issues are likely
              underreported.
            </li>
            <li>
              <strong>Structural Change:</strong> Litter basket complaints
              increased by approximately <strong>30%</strong> after mid-2020 and
              did not return to pre-pandemic levels.
            </li>
            <li>
              <strong>Operational Shifts:</strong> Complaint spikes align with
              known service disruptions, including labor shortages and policy
              changes.
            </li>
          </ul>
        </div>

        {/* SOLUTIONS */}
        <div>
          <h2 className="text-3xl font-bold text-eco-green-dark mb-6">
            💡 Our Solutions
          </h2>

          <ul className="list-disc list-inside space-y-2 text-eco-text-dark/80 max-w-4xl">
            <li>Make sanitation data visible and accessible to residents</li>
            <li>Encourage increased reporting through the 311 system</li>
            <li>Promote awareness of sanitation reporting tools</li>
            <li>Support data-driven resource allocation by DSNY</li>
            <li>Encourage waste reduction through community education</li>
          </ul>
        </div>

        {/* ABOUT US */}
        <div>
          <h2 className="text-3xl font-bold text-eco-green-dark mb-4">
            👥 About Us
          </h2>

          <p className="text-eco-text-dark/80 max-w-4xl">
            CleanSight NYC is a data-driven student project developed as part of
            a data visualization course. The project aims to engage communities,
            inform policy decisions, and improve neighborhood cleanliness
            through transparent, accessible analytics.
          </p>

          <a
            href="https://dirtsignalnyc.vercel.app/team"
            target="_blank"
            className="inline-block mt-3 font-semibold underline text-eco-green-dark hover:text-eco-green"
          >
            Meet the Team →
          </a>
        </div>
      </div>
    </div>
  );
}
