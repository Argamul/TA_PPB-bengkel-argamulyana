import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import DesktopNavbar from "./components/navbar/DesktopNavbar.jsx";
import MobileNavbar from "./components/navbar/MobileNavbar.jsx";

import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PWABadges from "./PWABadges.jsx";

// ------------ LAZY LOADING HALAMAN ------------
const SplashScreen = lazy(() => import("./pages/SplashScreen.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage.jsx"));
const DetailPage = lazy(() => import("./pages/DetailPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const WishlistPage = lazy(() => import("./pages/WishlistPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage.jsx"));
const OrderPage = lazy(() => import("./pages/OrderPage.jsx"));
const AddEditPage = lazy(() => import("./pages/AddEditPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));

// ------------ LOADING SCREEN ------------
function LoadingScreen() {
  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
      Loading...
    </div>
  );
}

// ------------ MAIN LAYOUT ------------
function MainLayout({ children }) {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />

      <div className="page">
        {children}
      </div>
    </>
  );
}

// ------------ ROUTES ------------
export default function App() {
  return (
    <ErrorBoundary>
      <div className="app-root">

        {/* WRAP ALL ROUTES WITH SUSPENSE */}
        <Suspense fallback={<LoadingScreen />}>

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

            {/* Detail page */}
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

            {/* Admin Add/Edit */}
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

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>

        </Suspense>

        <PWABadges />
      </div>
    </ErrorBoundary>
  );
}
