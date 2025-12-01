// src/pages/CatalogPage.jsx
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PartCard from "../components/cards/PartsCard";

export default function CatalogPage({ onNavigate }) {
  const [parts, setParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const storedParts = JSON.parse(localStorage.getItem("parts")) || [];
    setParts(storedParts);
  }, []);

  const filteredParts = parts.filter((p) => {
    const partName = (p.part_name || p.name || "").toString();
    const partCategory = (p.category || p.type || "").toString();
    const matchSearch = partName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "all" || partCategory === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4">
        <h1 className="text-2xl font-bold text-slate-800 text-center">Katalog Sparepart</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Search & Filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex items-center bg-white border rounded-xl px-3 flex-1">
            <Search className="w-5 h-5 text-slate-500" />
            <input
              className="flex-1 px-2 py-2 focus:outline-none"
              placeholder="Cari sparepart..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="px-3 py-2 border rounded-xl font-medium"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="mobil">Mobil</option>
            <option value="motor">Motor</option>
            <option value="lokomotif">Lokomotif</option>
          </select>
        </div>

        {/* Card List */}
        {filteredParts.length === 0 ? (
          <p className="text-slate-500 text-center mt-12">Tidak ada sparepart ditemukan</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredParts.map((item) => (
              <PartCard key={item.id} part={item} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
