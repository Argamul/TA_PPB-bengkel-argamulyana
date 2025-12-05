import DesktopNavbar from "../components/navbar/DesktopNavbar.jsx";
import MobileNavbar from "../components/navbar/MobileNavbar.jsx";

export default function AboutPage() {
  return (
    <div className="page">
      <main className="page-content">
        <h1>Tentang Bengkel GAMUL</h1>
        <p>
          Aplikasi ini adalah tugas akhir mata kuliah Pemrograman
          Perangkat Bergerak dengan topik Progressive Web Apps.
        </p>
        <p>
          Fokus utama: katalog sparepart untuk empat jenis kendaraan
          utama (bus, mobil, lokomotif, pesawat tempur), fitur
          wishlist, keranjang, dan penyimpanan data di localStorage
          sehingga tetap tersimpan saat offline.
        </p>
      </main>
    </div>
  );
}
