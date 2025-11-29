// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 pt-10">

      {/* Title Section */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800">
        Tentang Website Ini
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-2">
        Website ini dibuat sebagai bagian dari Tugas Akhir mata kuliah Pemrograman Perangkat Bergerak.
      </p>

      {/* Illustration Banner */}
      <div className="mt-10 flex justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3481/3481033.png"
          alt="Workshop Illustration"
          className="w-64 opacity-90 drop-shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-6">

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Visi & Misi</h2>
          <p className="text-gray-700 leading-relaxed">
            Website Bengkel Transportasi Indonesia bertujuan untuk memberikan pengalaman modern dalam
            pemesanan suku cadang kendaraan seperti mobil, bus, pesawat, dan lokomotif.
            Dengan pendekatan digital berbasis Progressive Web App (PWA),
            pengguna dapat mengakses aplikasi ini secara offline, mengelola keranjang belanja suku cadang,
            dan melakukan pemesanan dengan mudah melalui perangkat mobile maupun desktop.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Teknologi yang Digunakan</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>React + Vite</li>
            <li>TailwindCSS</li>
            <li>LocalStorage untuk Cart System</li>
            <li>PWA (Installable + Offline mode)</li>
            <li>Modular Component Design</li>
          </ul>
        </section>

        {/* Profile Card */}
        <section className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-2xl text-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">Profil Pengembang</h2>
          
          <div className="flex items-center gap-4">
            <img
              src="https://ui-avatars.com/api/?name=Arga+Mulyana&size=220&background=2b7a78&color=fff"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-white shadow-md object-cover"
            />

            <div>
              <p className="font-bold text-lg">Arga Mulyana Saputra</p>
              <p>21120123130065</p>
              <p>Kelompok 31 - Teknik Komputer UNDIP</p>
            </div>
          </div>
        </section>

      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => onNavigate("order")}
          className="px-6 py-3 bg-green-700 text-white rounded-xl shadow hover:bg-green-800 transition font-medium"
        >
          Pesan Sparepart Sekarang
        </button>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 mb-6">
        © 2025 Bengkel Transportasi Indonesia
      </div>

    </div>
  );
}
