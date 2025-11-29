// src/pages/HomePage.jsx
import { PartsData } from "../data/PartsData";
import HeroSection from "../components/home/HeroSection";
import FeaturedPartsSection from "../components/home/FeaturedPartsSection";

export default function HomePage({ onNavigate }) {
  // Ambil 3 item rekomendasi untuk ditampilkan di homepage
  const featuredParts = PartsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-8">
      {/* Banner Hero */}
      <HeroSection onNavigate={onNavigate} />

      {/* Konten utama */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        <FeaturedPartsSection 
          featuredParts={featuredParts} 
          onNavigate={onNavigate} 
        />
      </main>
    </div>
  );
}
