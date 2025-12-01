// src/components/home/FeaturedPartsSection.jsx
import React from "react";
import PartCard from "../cards/PartsCard";

export default function FeaturedPartsSection({ featuredParts, onNavigate }) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        Featured Spare Parts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredParts.map((part) => (
          <PartCard key={part.id} part={part} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
