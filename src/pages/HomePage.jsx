// src/pages/HomePage.jsx
import HeroSection from "../components/home/HeroSection";
import FeaturedPartsSection from "../components/home/FeaturedPartSection";

import { useQuery } from "@tanstack/react-query";
import { fetchParts } from "../services/SupabaseClient";

export default function HomePage({ onNavigate }) {
  const { data: parts, isLoading, isError, error } = useQuery({
    queryKey: ["parts"],
    queryFn: fetchParts,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <HeroSection onNavigate={onNavigate} />
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        {isLoading && (
          <div className="py-12 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        )}

        {isError && (
          <div className="p-6 bg-red-50 text-red-800 rounded-lg">
            Terjadi kesalahan saat memuat data: {String(error?.message || error)}
          </div>
        )}

        {!isLoading && !isError && parts && (
          <FeaturedPartsSection featuredParts={parts.slice(0, 4)} onNavigate={onNavigate} />
        )}
      </main>
    </div>
  );
}
