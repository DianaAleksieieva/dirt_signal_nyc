"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (path) => ({
    marginRight: "20px",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: pathname === path ? "#0e4f33" : "#0d3323",
    background: pathname === path ? "#d5efe2" : "transparent",
    fontWeight: pathname === path ? "600" : "500",
    transition: "0.2s",
  });

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 24px",
        borderBottom: "1px solid #e5e5e5",
        background: "#f7f6f2",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" style={linkStyle("/")}>
        Home
      </Link>
      <Link href="/analysis" style={linkStyle("/Analysis")}>
        Analysis
      </Link>
      <Link href="/map" style={linkStyle("/map")}>
        Map
      </Link>
      <Link href="/team" style={linkStyle("/team")}>
        Team
      </Link>
    </nav>
  );
}
