// src/main.jsx
import { StrictMode, Suspense, lazy, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import SplashScreen from "./pages/SplashScreen";
import PWABadges from "./PWABadges";

// Lazily loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// React Query Client
const queryClient = new QueryClient();

// Loading UI
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
  </div>
);

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);

  const navigate = (targetPage, id = null) => {
    setPage(targetPage);
    setSelectedId(id);
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "catalog":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CatalogPage onNavigate={navigate} />
          </Suspense>
        );
      case "detail":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DetailPage partId={selectedId} onNavigate={navigate} />
          </Suspense>
        );
      case "order":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <OrderPage onNavigate={navigate} />
          </Suspense>
        );
      case "wishlist":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <WishlistPage onNavigate={navigate} />
          </Suspense>
        );
      case "profile":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProfilePage onNavigate={navigate} />
          </Suspense>
        );
      case "about":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage onNavigate={navigate} />
          </Suspense>
        );

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <DesktopNavbar currentPage={page} onNavigate={navigate} />

      {/* MAIN CONTENT */}
      <main className="pt-4 pb-20">
        <ErrorBoundary>{renderPage()}</ErrorBoundary>
      </main>

      {/* MOBILE NAV */}
      <MobileNavbar currentPage={page} onNavigate={navigate} />

      {/* PWA UI */}
      <PWABadges />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoot />
    </QueryClientProvider>
  </StrictMode>
);
