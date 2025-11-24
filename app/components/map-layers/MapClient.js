"use client";

import dynamic from "next/dynamic";

const BaseMap = dynamic(
  () => import("./BaseMap"),
  { ssr: false }
);

export default function MapClient({ children }) {
  return <BaseMap>{children}</BaseMap>;
}
