import { Wrench, ShoppingBag, ArrowRight } from "lucide-react";

export default function HeroSection({ onNavigate }) {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Gradient Lights */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-12 w-32 h-32 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/3 right-8 w-24 h-24 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" />

      {/* MOBILE UI */}
      <div className="md:hidden relative z-10 w-full px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Welcome to</h2>

        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-lg opacity-90 -skew-y-1"></div>
          <h1 className="relative text-3xl font-bold text-white px-4 py-2">
            Bengkel SparePart Digital
          </h1>
        </div>

        <p className="text-slate-600 text-base">
          Solusi belanja sparepart kendaraan dari Mobil, Bus, Kereta hingga Pesawat.
        </p>

        <div className="mt-8 flex flex-col space-y-3 max-w-xs mx-auto">
          <button
            onClick={() => onNavigate("catalog")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> Browse Catalog
          </button>

          <button
            onClick={() => onNavigate("about")}
            className="bg-white border border-gray-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <Wrench size={18} /> About Us
          </button>
        </div>
      </div>

      {/* DESKTOP UI */}
      <div className="hidden md:block relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-6xl font-bold text-slate-900 leading-tight mb-6">
              Bengkel SparePart Digital
            </h2>
            <p className="text-lg text-slate-600 max-w-lg mb-8">
              Marketplace modern untuk pembelian sparepart kendaraan. Produk berkualitas, harga transparan, jaminan keaslian.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => onNavigate("catalog")}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition flex items-center gap-3"
              >
                <ShoppingBag size={22} />
                Browse Catalog
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="bg-white/50 backdrop-blur-lg border border-gray-300 text-slate-700 px-10 py-4 rounded-2xl font-semibold hover:scale-105 transition flex items-center gap-3"
              >
                <Wrench size={22} /> About Us
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition">
              <img
                className="w-full h-80 object-cover"
                src="https://images.unsplash.com/photo-1517142089942-ba376ce32a0a?auto=format&fit=crop&w=900&q=80"
                alt="Engine sample"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <img
                className="rounded-3xl w-full h-40 object-cover shadow-md hover:scale-105 transition"
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80"
                alt="Bus engine"
              />
              <img
                className="rounded-3xl w-full h-40 object-cover shadow-md hover:scale-105 transition"
                src="https://images.unsplash.com/photo-1581092787764-5ae382d34a90?auto=format&fit=crop&w=600&q=80"
                alt="Aircraft turbine"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
