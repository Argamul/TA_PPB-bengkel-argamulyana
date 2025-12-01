// src/main.jsx
import { StrictMode, Suspense, lazy, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from "./pages/SplashScreen";
import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import PWABadges from "./PWABadges";

// Create Query Client
const queryClient = new QueryClient();

// Lazy loaded pages
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// Import HomePage directly (not lazy) to avoid module resolution issues with nested imports
import HomePage from "./pages/HomePage";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} />;

      case "catalog":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CatalogPage onNavigate={handleNavigation} />
          </Suspense>
        );

      case "order":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <OrderPage onNavigate={handleNavigation} />
          </Suspense>
        );

      case "profile":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProfilePage onNavigate={handleNavigation} />
          </Suspense>
        );

      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <main className="min-h-screen">{renderPage()}</main>

      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadges />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRoot />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
