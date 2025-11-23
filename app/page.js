import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-eco-beige text-eco-text px-6 pt-3">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-eco-green-dark mb-4 text-center pt-2">
        🗽 CleanSight NYC
      </h1>

      {/* DESCRIPTION */}
      <section className="hero py-12 pt-2">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6 italic">
            See your city. Understand it. Improve it.
          </h2>

          <p className="mb-4">
            New York is one of the most extraordinary places on Earth. Yet
            despite massive daily cleaning efforts, many streets still struggle
            with overflowing bins, scattered litter, and uneven sanitation.</p>

          <p className="mb-4">
            <strong> CleanSight NYC</strong> analyzes which places have the most
            problems with cleanliness. We using <strong>311 cleanliness complaints </strong> and{" "}
            <strong>DSNY waste tonnage data</strong>, to transform
            the city’s raw data into an intuitive picture of how cleanliness,
            infrastructure, and human activity interact across neighborhoods.
            This helps to understand the problem and find solutions for a
            cleaner environment.
          </p>

          <p className="mb-4">
            We beliave when people can truly
            <em>see</em> the conditions around them, they become part of the
            solution.
          </p>

          <p className="mb-2">A cleaner city doesn’t start with more rules.</p>
          <p className="font-semibold">
            It starts with <strong>more understanding</strong>.<br />
            And understanding starts here.
          </p>
        </div>
      </section>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* MAP BUTTON */}
        <Link
          href="/map"
          className="px-6 py-3 rounded-lg bg-eco-green-dark text-white font-medium shadow-md
               hover:bg-eco-green-soft hover:text-eco-green-dark transition text-center"
        >
          🗺️ Explore the Map
        </Link>

        {/* ANALYSIS BUTTON */}
        <Link
          href="/analysis"
          className="px-6 py-3 rounded-lg bg-eco-green-dark text-white font-medium shadow-md
               hover:bg-eco-green-soft hover:text-eco-green-dark transition text-center"
        >
          📊 View Analysis
        </Link>
      </div>
    </div>
  );
}
