"use client";
import { useParams } from "next/navigation";

export default function LocationPage() {
  const params = useParams();

  if (!params || !params.location) {
    return <h1 className="text-2xl">Error: No location found</h1>;
  }

  const locationName = decodeURIComponent(params.location as string);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">{locationName}</h1>
    </div>
  );
}
