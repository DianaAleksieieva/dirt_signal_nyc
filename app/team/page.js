"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const team = [
  {
    name: "Diana Aleksieieva",
    img: "/team/77931188.jpeg", 
    github: "https://github.com/DianaAleksieieva",
  },
  {
    name: "Hao Zhu",
    img: "/team/14314312.jpeg",
    github: "https://github.com/Arden-Zhu",
  },
  {
    name: "Hong Zhao",
    img: "/team/1760126358872.jpeg",
    github: "https://github.com/HongGith",
  },
  {
    name: "Cindy Zhao",
    img: "/team/59320097.jpeg",
    github: "https://github.com/cindy-zhaoxy",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-eco-beige text-eco-text pt-10 px-6 pb-20">
      <h1 className="text-3xl font-bold text-eco-green-dark text-center mb-4">
        👥 Meet the CleanSight Team
      </h1>

      <p className="text-center text-eco-text-dark/80 max-w-2xl mx-auto mb-10">
        We are a group of designers, engineers, and researchers who believe that
        data can help people understand their city — and improve it.
      </p>

      {/* TEAM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="w-28 h-28 mb-4 rounded-full bg-eco-green-soft overflow-hidden flex items-center justify-center">
              {member.img ? (
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-eco-green-dark text-xl font-bold">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-eco-green-dark">
              {member.name}
            </h3>
            <p className="text-sm text-eco-text-dark/70 mb-3">{member.role}</p>

            <Link
              href={member.github}
              target="_blank"
              className="flex items-center gap-1 text-eco-green-dark hover:text-eco-green-soft transition"
            >
              <FaGithub className="text-xl" />
              <span className="text-sm font-medium">GitHub</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="px-6 py-2 rounded-lg bg-eco-green-dark text-white font-medium shadow-md
                     hover:bg-eco-green-soft hover:text-eco-green-dark transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
