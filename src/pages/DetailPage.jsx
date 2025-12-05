// pages/DetailPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LuTruck,
  LuArrowLeftRight,
  LuShieldCheck,
  LuHeart
} from "react-icons/lu";
import { supabase } from "../services/SupabaseClient";

export default function DetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wish, setWish] = useState(false);

  // Format Rupiah
  const formatRp = (num) => "Rp " + Number(num).toLocaleString("id-ID");

  // ======================================
  // FETCH PRODUK DARI SUPABASE
  // ======================================
  useEffect(() => {
    async function fetchProduct() {
      console.log("Querying spare_parts for ID:", id);

      const { data, error } = await supabase
        .from("spare_parts")               // ← GANTI DI SINI
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase error:", error);
      } else {
        console.log("Product fetched:", data);
        setProduct(data);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading product...</p>;
  if (!product) return <p style={{ padding: "2rem" }}>Product not found.</p>;

  return (
    <div className="page">
      <main className="page-content detail-root">
        <div className="detail-grid">

          {/* LEFT IMAGE */}
          <div className="detail-image-card">
            <img
              src={product.image_url}
              alt={product.name}
              className="detail-image"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image")
              }
            />
          </div>

          {/* RIGHT INFO */}
          <div className="detail-info-card">

            <span className="detail-tag">{product.category || "Spare Part"}</span>

            {/* NAME */}
            <h1 className="detail-title">{product.name}</h1>

            {/* PRICE */}
            <div className="detail-price-box">
              <h2 className="detail-price">{formatRp(product.price)}</h2>
            </div>

            {/* SPECIFICATION */}
            <div className="detail-spec-box">
              <div className="spec-row">
                <div>
                  <label>Manufacturer</label>
                  <p>{product.manufacturer || "-"}</p>
                </div>

                <div>
                  <label>Engine Type</label>
                  <p>{product.engine_type || "-"}</p>
                </div>
              </div>

              <div className="spec-row">
                <div>
                  <label>Part Number</label>
                  <p>{product.part_number || "-"}</p>
                </div>

                <div>
                  <label>Stock Status</label>
                  <p className="detail-stock">
                    {product.stock_status || "In Stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <h3 className="detail-section-title">Description</h3>
            <p className="detail-description">
              {product.description || "No description available."}
            </p>

            {/* BUTTONS */}
            <div className="detail-actions">
              <button className="btn-add-cart">🛒 Add to Cart</button>

              <button
                className={`btn-wishlist ${wish ? "active" : ""}`}
                onClick={() => setWish(!wish)}
              >
                <LuHeart size={20} />
              </button>
            </div>

            {/* BENEFITS */}
            <div className="detail-benefits">
              <p><LuTruck /> Gratis ongkir bila belanja lebih dari Rp 500.000</p>
              <p><LuArrowLeftRight /> Pengembalian dilayani sampai 30 hari setelah pembelian</p>
              <p><LuShieldCheck /> Garansi 1 tahun sudah termasuk </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
