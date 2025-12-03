import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../services/ProductService";
import ProductCard from "../card/ProductCard";
import { Link } from "react-router-dom";

export default function FeaturedBus() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getProductsByCategory("Bus");
      setItems(Array.isArray(res) ? res.slice(0, 2) : []);
    }
    load();
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Sparepart Bus</h2>
        <Link to="/catalog?category=bus" className="link-small">
          Lihat semua
        </Link>
      </div>

      <div className="featured-grid">
        {items.length === 0 ? (
          <p className="text-muted">Belum ada produk bus.</p>
        ) : (
          items.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
