import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";

import HeroSection from "../components/home/HeroSection";
import FeaturedSection from "../components/home/FeaturedSection";

import CategoryFeatureButton from "../components/button/CategoryFeatureButton";
import { useNavigate } from "react-router-dom";

// ICONS
import { MdDirectionsCar, MdDirectionsBus, MdTrain, MdFlight } from "react-icons/md";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <DesktopNavbar />
      <MobileNavbar />

      <main className="page-content">

        {/* HERO SECTION */}
        <HeroSection />

        {/* SHOP BY VEHICLE TYPE */}
        <section className="vehicle-type-section">
          <h2 className="vehicle-title">Shop by Vehicle Type</h2>
          <p className="vehicle-subtitle">
            Pilih kategori kendaraan untuk menemukan sparepart yang sesuai
          </p>

          <div className="vehicle-grid">

            <CategoryFeatureButton
              icon={<MdDirectionsCar size={32} />}
              label="Mobil"
              onClick={() => navigate("/catalog?category=Mobil")}
            />

            <CategoryFeatureButton
              icon={<MdDirectionsBus size={32} />}
              label="Bus"
              onClick={() => navigate("/catalog?category=Bus")}
            />

            <CategoryFeatureButton
              icon={<MdTrain size={32} />}
              label="Kereta"
              onClick={() => navigate("/catalog?category=Kereta")}
            />

            <CategoryFeatureButton
              icon={<MdFlight size={32} />}
              label="Pesawat"
              onClick={() => navigate("/catalog?category=Pesawat")}
            />

          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <FeaturedSection title="Sparepart Bus" category="Bus" />
        <FeaturedSection title="Sparepart Mobil" category="Mobil" />
        <FeaturedSection title="Sparepart Kereta" category="Kereta" />
        <FeaturedSection title="Sparepart Pesawat" category="Pesawat" />

      </main>
    </div>
  );
}
