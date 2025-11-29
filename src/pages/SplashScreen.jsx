// src/pages/SplashScreen.jsx
import { useState, useEffect } from "react";
import BackgroundPattern from "../components/splash/BackgroundPattern";
import FloatingElements from "../components/splash/FloatingElements";
import LogoContainer from "../components/splash/LogoContainer";
import TitleSection from "../components/splash/TitleSection";
import LoadingAnimation from "../components/splash/LoadingAnimation";
import Footer from "../components/splash/Footer";

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 150);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              if (typeof onComplete === "function") onComplete();
            }, 800);
          }, 500);

          return 100;
        }
        return prev + 6;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
      bg-gradient-to-br from-green-200 via-white to-blue-300 px-4 transition-all duration-700
      ${fadeIn ? "opacity-100" : "opacity-0"} 
      ${fadeOut ? "opacity-0 scale-110" : "scale-100"}`}
    >
      <BackgroundPattern />
      <FloatingElements />

      <div
        className={`relative z-10 flex flex-col items-center justify-center space-y-4
        transition-all duration-700
        ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${fadeOut ? "opacity-0 -translate-y-10" : ""}`}
      >
        <LogoContainer />
        <TitleSection />
        <LoadingAnimation progress={progress} />
      </div>

      <Footer />
    </div>
  );
}
