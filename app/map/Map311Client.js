"use client";

import dynamic from "next/dynamic";

const Map311 = dynamic(() => import("../components/Map311"), {
  ssr: false,
});

export default function Map311Client() {
  return <Map311 />;
}
