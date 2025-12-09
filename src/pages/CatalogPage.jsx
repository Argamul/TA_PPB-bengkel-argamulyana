// pages/CatalogPage.jsx
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/card/ProductCard";

const categories = [
  { label: "All", value: "all" },
  { label: "Mobil", value: "Mobil" },
  { label: "Bus", value: "Bus" },
  { label: "Kereta", value: "Kereta" },
  { label: "Pesawat", value: "Pesawat" },
];

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // FETCH SUPABASE
  useEffect(() => {
    async function load() {
      const data = await getAllProducts();
      setProducts(data);
      setDisplayed(data);
    }
    load();
  }, []);

  // FILTER + SEARCH
  useEffect(() => {
    let filtered = [...products];

    // category filter
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // search filter — SAFE NULL CHECK
    if (search.trim() !== "") {
      const s = search.toLowerCase();

      filtered = filtered.filter((p) =>
        (p.manufacturer || "").toLowerCase().includes(s) ||
        (p.engine_type || "").toLowerCase().includes(s) ||
        String(p.price || "").includes(s)
      );
    }

    setDisplayed(filtered);
  }, [category, search, products]);

  return (
    <div className="page">
      <main className="page-content">

        {/* ADMIN BUTTON */}
        <button
          className="btn-primary-cta"
          style={{ marginBottom: "1rem" }}
          onClick={() => navigate("/admin/product")}
        >
          + Tambah Barang (Admin)
        </button>

        {/* SEARCH */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search parts, manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="filter-row">
          {categories.map((c) => (
            <button
              key={c.value}
              className={"filter-chip " + (category === c.value ? "active" : "")}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="result-count">
          Showing {displayed.length} products
        </p>

        {/* PRODUCT LIST */}
        <div className="grid-products">
          {displayed.length === 0 ? (
            <p style={{ color: "#ccc" }}>Tidak ada produk ditemukan.</p>
          ) : (
            displayed.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>

      </main>
    </div>
  );
}
