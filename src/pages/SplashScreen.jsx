import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundPattern from "../components/splash/BackgroundPattern.jsx";
import LogoContainer from "../components/splash/LogoContainer.jsx";
import TitleSection from "../components/splash/TitleSection.jsx";
import LoadingAnimation from "../components/splash/LoadingAnimation.jsx";
import Footer from "../components/splash/Footer.jsx";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home", { replace: true }), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="splash-root">
      <BackgroundPattern />
      <main className="splash-main fade-in">
        <LogoContainer />
        <TitleSection />
        <LoadingAnimation />
      </main>
      <Footer />
    </div>
  );
}
