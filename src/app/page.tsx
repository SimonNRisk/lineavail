"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const locationAliases: { [key: string]: string[] } = {
  "Cogro": ["Cogro", "Common Grounds"],
  "Trinity": ["Trin", "Trinity"],
  "Stages Nightclub": ["Stages", "Stages Nightclub"],
  "Brass Pub": ["Brass", "Brass Pub"],
  "Stauffer Library": ["Stauffer", "Stauffer Library"],
  "ARC": ["ARC", "Athletics and Recreation Centre", "Gym"],
  "Douglas Library": ["Douglas", "Douglas Library"],
  "Goodes Hall": ["Goodes", "Goodes Hall"],
  "Beamish-Munro Hall": ["BMH", "Beamish-Munro Hall", "ILC", "Integrated Learning Centre"],
  "Mitchell Hall": ["Mitchell Hall", "Mitchell", "ARC South"]
};


export default function Home() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    // Filter locations based on user input
    if (value.length > 0) {
      const matchedNames = Object.entries(locationAliases)
        .filter(([_, aliases]) =>
          aliases.some(alias => alias.toLowerCase().includes(value))
        )
        .map(([mainName]) => mainName);

      setFiltered([...new Set(matchedNames)]);
    } else {
      setFiltered([]);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundImage: 'url("/campus_pic.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      <h1 className="text-4xl font-bold text-center mt-8 p-10 relative z-10 text-white">
        LineLooker or something
      </h1>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for location..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-900 relative z-10"
          value={search}
          onChange={handleChange}
          onFocus={() => setFiltered(Object.keys(locationAliases))} // Show all main names
        />
        {/* Autocomplete Dropdown */}
        {filtered.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-20 text-black">
            {filtered.map((loc) => (
              <li
                key={loc}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  console.log("Navigating to:", `${encodeURIComponent(loc)}`);
                  router.push(`${encodeURIComponent(loc)}`);
                }}
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 text-white relative z-10">Search for: {search}</p>
    </div>
  );
}
