import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/ProductService";
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

  useEffect(() => {
    async function load() {
      const data = await getAllProducts();
      setProducts(data);
      setDisplayed(data);
    }
    load();
  }, []);

  // Filter kategori + pencarian
  useEffect(() => {
    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.manufacturer.toLowerCase().includes(s) ||
          p.engine_type.toLowerCase().includes(s) ||
          String(p.price).includes(s)
      );
    }

    setDisplayed(filtered);
  }, [category, search, products]);

  return (
    <div className="page">
      <main className="page-content">

        {/* === ADMIN ADD BUTTON === */}
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <Link to="/admin/product">
            <button className="btn-add-admin">
              + Tambah Barang (Hanya Admin)
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search parts, manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className="filter-row">
          {categories.map((c) => (
            <button
              key={c.value}
              className={`filter-chip ${category === c.value ? "active" : ""}`}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="result-count">
          Showing {displayed.length} products
        </p>

        {/* Product Grid */}
        <div className="grid-products">
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
