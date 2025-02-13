"use client";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundImage: 'url("/campus_pic.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      <h1 className="text-4xl font-bold text-center mt-8 p-10 relative z-10 text-white">LineLooker or something</h1>
      
      <input
        type="text"
        placeholder="Search for location..."
        className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-900 relative z-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p className="mt-4 text-white relative z-10">Search for: {search}</p>
    </div>
  );
}
