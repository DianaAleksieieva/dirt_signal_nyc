import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* FULLSCREEN BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/jermaine-ee-A2CChTZvzTE-unsplash.jpg')",
        }}
      ></div>

      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-0"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-eco-text">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-eco-green-dark mb-6 text-center drop-shadow-md">
          🗽 CleanSight NYC
        </h1>

        {/* TEXT BLOCK */}
        <section className="hero w-full max-w-3xl">
          <div className="bg-white/80 rounded-xl shadow-md p-8 space-y-4 text-center">
            <h2 className="text-xl font-semibold italic">
              See your city. Understand it. Improve it.
            </h2>

            <p>
              New York is one of the most extraordinary places on Earth. Yet
              despite massive daily cleaning efforts, many streets still
              struggle with overflowing bins, scattered litter, and uneven
              sanitation.
            </p>

            <p>
              <strong>CleanSight NYC</strong> analyzes which places have the
              most problems with cleanliness. We use{" "}
              <strong>311 cleanliness complaints</strong> and{" "}
              <strong>DSNY waste tonnage data</strong> to transform raw city
              data into a clear picture of how cleanliness, infrastructure, and
              human activity interact across neighborhoods.
            </p>

            <p>
              When people can truly <em>see</em> the conditions around them,
              they become part of the solution.
            </p>

            <p>A cleaner city doesn’t start with more rules.</p>

            <p className="font-semibold">
              It starts with <strong>more understanding</strong>.<br />
              And understanding starts here.
            </p>
          </div>
        </section>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/map"
            className="px-6 py-3 rounded-lg bg-eco-green-dark text-white font-medium shadow-md
               hover:bg-eco-green-soft hover:text-eco-green-dark transition text-center"
          >
            🗺️ Explore the Map
          </Link>

          <Link
            href="/analysis"
            className="px-6 py-3 rounded-lg bg-eco-green-dark text-white font-medium shadow-md
               hover:bg-eco-green-soft hover:text-eco-green-dark transition text-center"
          >
            📊 View Analysis
          </Link>

          <Link
            href="/team"
            className="px-6 py-3 rounded-lg bg-eco-green-dark text-white font-medium shadow-md
               hover:bg-eco-green-soft hover:text-eco-green-dark transition text-center"
          >
            👥 Our Team
          </Link>
        </div>
      </div>
    </div>
  );
}
