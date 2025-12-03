import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getProductById } from "../services/ProductService";
import useCart from "../hooks/useCart";
import useToggleWishlist from "../hooks/useToggleWishlist";

import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Package,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function DetailPage() {
  const { id } = useParams();              // id dari URL
  const navigate = useNavigate();          // tombol back
  const { addToCart } = useCart();         // keranjang
  const { isWishlisted, toggleWishlist } = useToggleWishlist(); // wishlist

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ambil produk dari Supabase
  useEffect(() => {
    async function load() {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading)
    return <p style={{ padding: 20 }}>Memuat detail...</p>;

  if (!product)
    return <p style={{ padding: 20 }}>Produk tidak ditemukan.</p>;

  // jika tidak ada multiple images
  const images = product.images || [product.image];

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header simple dengan back */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00]"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Kembali</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* IMAGE VIEWER */}
          <div>
            <div className="bg-white rounded-[20px] shadow-lg p-8 mb-4 relative overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={product.manufacturer}
                className="w-full h-96 object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#0A1A3F]" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
                  >
                    <ChevronRight className="w-6 h-6 text-[#0A1A3F]" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-[12px] overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-[#FF7A00] shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT DETAIL */}
          <div>
            <div className="bg-white rounded-[20px] shadow-lg p-8">

              {/* Category */}
              <div className="inline-block px-4 py-1 bg-[#0A1A3F]/10 text-[#0A1A3F] rounded-full text-sm mb-4 capitalize">
                {product.category}
              </div>

              <h1 className="text-[#0A1A3F] mb-4 text-3xl font-bold">
                {product.manufacturer}
              </h1>

              {/* PRICE */}
              <div className="mb-6">
                <div className="text-4xl text-[#FF7A00] mb-2">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </div>
              </div>

              {/* SPECS */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-6 bg-slate-50 rounded-[20px]">
                <div>
                  <p className="text-sm text-slate-600">Engine Type</p>
                  <p className="text-[#0A1A3F]">{product.engine_type}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600">Stok</p>
                  <p className="text-green-600">
                    {product.stock || "Tersedia"}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-6">
                <h3 className="text-[#0A1A3F] font-semibold mb-2">
                  Deskripsi
                </h3>
                <p className="text-slate-600">
                  {product.description || "Tidak ada deskripsi."}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 mb-6">
                {/* ADD TO CART */}
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[20px] bg-[#FF7A00] hover:bg-[#ff8a1a] text-white shadow"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambah Keranjang
                </button>

                {/* WISHLIST */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`px-6 py-4 rounded-[20px] border-2 transition ${
                    isWishlisted(product.id)
                      ? "border-pink-500 bg-pink-50 text-pink-500"
                      : "border-[#0A1A3F] text-[#0A1A3F] hover:bg-[#0A1A3F] hover:text-white"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* FEATURES */}
              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Pengiriman cepat & aman</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Packing premium untuk sparepart berat</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>Garansi 1 tahun</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
