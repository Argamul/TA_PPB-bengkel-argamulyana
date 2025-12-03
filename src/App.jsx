import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen.jsx";
import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import AddEditPage from "./pages/AddEditPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import BackButton from "./components/button/BackButton.jsx";

import DesktopNavbar from "./components/navbar/DesktopNavbar.jsx";
import MobileNavbar from "./components/navbar/MobileNavbar.jsx";

import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PWABadges from "./PWABadges.jsx";


// -------------------------------
// MAIN LAYOUT (FINAL)
// -------------------------------
function MainLayout({ children }) {
  const location = useLocation();                 // FIX HERE
  const current = location.pathname;              // gunakan pathname router
  const hiddenBackRoutes = ["/", "/home"];        // halaman tanpa back button

  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />

      <div className="page">

        {/* BackButton muncul di semua halaman kecuali yang disembunyikan */}
        {!hiddenBackRoutes.includes(current) && (
          <div style={{ padding: "1rem" }}>
            <BackButton />
          </div>
        )}

        {children}
      </div>
    </>
  );
}

// -------------------------------
// ROUTES
// -------------------------------
export default function App() {
  return (
    <ErrorBoundary>
      <div className="app-root">
        <Routes>

          {/* Splash tanpa layout */}
          <Route path="/" element={<SplashScreen />} />

          {/* Home */}
          <Route
            path="/home"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />

          {/* Catalog */}
          <Route
            path="/catalog"
            element={
              <MainLayout>
                <CatalogPage />
              </MainLayout>
            }
          />

          {/* Detail Page */}
          <Route
            path="/catalog/:id"
            element={
              <MainLayout>
                <DetailPage />
              </MainLayout>
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <MainLayout>
                <CartPage />
              </MainLayout>
            }
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={
              <MainLayout>
                <WishlistPage />
              </MainLayout>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />

          {/* Edit profile */}
          <Route
            path="/profile/edit"
            element={
              <MainLayout>
                <EditProfilePage />
              </MainLayout>
            }
          />

          {/* Orders */}
          <Route
            path="/orders"
            element={
              <MainLayout>
                <OrderPage />
              </MainLayout>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/product/:id?"
            element={
              <MainLayout>
                <AddEditPage />
              </MainLayout>
            }
          />

          {/* About */}
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <PWABadges />
      </div>
    </ErrorBoundary>
  );
}
