"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (path) => ({
    marginRight: "20px",
    padding: "8px 12px",
    borderRadius: "6px",
    background: pathname === path ? "#e5e7eb" : "transparent",
    textDecoration: "none",
    color: "#111",
  });

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      borderBottom: "1px solid #ddd",
      background: "#fafafa"
    }}>
      <Link href="/" style={linkStyle("/")}>Home</Link>
      <Link href="/map" style={linkStyle("/map")}>Map</Link>
    </nav>
  );
}
