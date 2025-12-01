import { Wrench, ShoppingCart } from "lucide-react";

export default function HeroSection({ onNavigate }) {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          GAMUL WORKSHOP PARTS
        </h1>

        <p className="text-lg md:text-xl max-w-2xl opacity-90">
          Tempat terbaik untuk mencari dan memesan sparepart kendaraan — mulai dari mobil, bus, pesawat, hingga lokomotif. Kualitas teruji untuk performa maksimal.
        </p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => onNavigate("catalog")}
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <Wrench size={20} />
            Lihat Katalog Parts
          </button>

          <button
            onClick={() => onNavigate("order")}
            className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Pesan Sekarang
          </button>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl opacity-20" />
    </section>
  );
}
