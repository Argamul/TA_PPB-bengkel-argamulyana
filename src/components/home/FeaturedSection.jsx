// components/home/FeaturedSection.jsx
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/ProductService";
import ProductCard from "../card/ProductCard";
import { Link } from "react-router-dom";

export default function FeaturedSection({ title, category }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const all = await getAllProducts();

      // Normalisasi kategori ke lowercase supaya tidak case-sensitive
      const filtered =
        category && category !== "all"
          ? all.filter(
              (p) =>
                p.category &&
                p.category.toLowerCase() === category.toLowerCase()
            )
          : all;

      // Ambil hanya 2 produk terbaru
      setItems(filtered.slice(0, 2));
    }

    load();
  }, [category]);

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>{title}</h2>

        <Link to={`/catalog?category=${category}`} className="link-small">
          Lihat semua
        </Link>
      </div>

      <div className="featured-grid">
        {items.length === 0 ? (
          <p className="text-muted">Belum ada produk.</p>
        ) : (
          items.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
