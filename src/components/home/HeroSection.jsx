import PrimaryCTAButton from "../button/PrimaryCTAButton";
import SecondaryButton from "../button/SecondaryButton";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        
        <h1 className="hero-title">
          Temukan Sparepart Terbaik<br />
          Untuk Kendaraan Anda
        </h1>

        <p className="hero-subtitle">
          Marketplace sparepart lengkap untuk Bus, Mobil, Kereta, dan Pesawat.
          Pengiriman cepat & harga bersaing.
        </p>

        <div className="hero-actions">
          <PrimaryCTAButton to="/catalog" iconRight="→">
            Jelajahi Katalog
          </PrimaryCTAButton>

          <SecondaryButton to="/about">
            Tentang Aplikasi
          </SecondaryButton>
        </div>

      </div>
    </section>
  );
}
