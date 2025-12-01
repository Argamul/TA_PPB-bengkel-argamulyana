// src/pages/DetailPage.jsx
import { useState, useEffect } from "react";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useWishlist } from "../hooks/useToggleWishlist";

export default function DetailPage({ partId, onNavigate }) {
  const [part, setPart] = useState(null);
  const { wishlisted, toggleWishlist } = useWishlist(part);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("parts")) || [];
    const found = stored.find((item) => item.id === partId);
    setPart(found);
  }, [partId]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((c) => c.id === part.id);

    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({ ...part, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Ditambahkan ke keranjang!");
  };

  if (!part) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b shadow-sm flex items-center p-4 gap-4">
        <button onClick={() => onNavigate("catalog")} className="text-slate-700 hover:text-slate-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800">Detail Produk</h1>
      </div>

      <main className="max-w-3xl mx-auto p-4">
        <img
          src={part.image}
          alt={part.name}
          className="w-full rounded-2xl object-cover border h-60 mb-6"
        />

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-slate-900">{part.name}</h2>
          <button onClick={toggleWishlist} className="text-yellow-500">
            <Star className={`w-7 h-7 ${wishlisted ? "fill-yellow-500" : "text-yellow-500"}`} />
          </button>
        </div>

        <p className="text-lg text-blue-600 font-semibold mb-3">
          Rp {part.price.toLocaleString()}
        </p>

        <p className="text-slate-600 mb-6 leading-relaxed">{part.description}</p>

        <div className="bg-blue-600 p-4 rounded-xl text-white shadow-lg">
          <button
            onClick={addToCart}
            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Tambah ke Keranjang
          </button>
        </div>
      </main>
    </div>
  );
}
