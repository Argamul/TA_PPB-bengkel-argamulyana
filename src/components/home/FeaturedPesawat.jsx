import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../services/ProductService";
import ProductCard from "../card/ProductCard";
import { Link } from "react-router-dom";

export default function FeaturedPesawat() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getProductsByCategory("Pesawat");
      setItems(Array.isArray(res) ? res.slice(0, 2) : []);
    }
    load();
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Sparepart Pesawat</h2>
        <Link to="/catalog?category=pesawat" className="link-small">
          Lihat semua
        </Link>
      </div>

      <div className="featured-grid">
        {items.length === 0 ? (
          <p className="text-muted">Belum ada produk pesawat.</p>
        ) : (
          items.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
