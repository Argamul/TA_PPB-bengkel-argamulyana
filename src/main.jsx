import React, { useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import PWABadges from './PWABadges';
import { Toaster } from 'sonner';
import './index.css';

const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AddEditPage = lazy(() => import('./pages/AddEditPage'));

const queryClient = new QueryClient();

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const navigate = (targetPage, data = null) => {
    setPage(targetPage);
    if (data?.id) setSelectedId(data.id);
    if (data?.product) setSelectedData(data.product);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'catalog':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <CatalogPage onNavigate={navigate} />
          </Suspense>
        );
      case 'detail':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <DetailPage id={selectedId} data={selectedData} onNavigate={navigate} />
          </Suspense>
        );
      case 'cart':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <CartPage onNavigate={navigate} />
          </Suspense>
        );
      case 'wishlist':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <WishlistPage onNavigate={navigate} />
          </Suspense>
        );
      case 'order':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <OrderPage onNavigate={navigate} />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <ProfilePage onNavigate={navigate} />
          </Suspense>
        );
      case 'about':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <AboutPage onNavigate={navigate} />
          </Suspense>
        );
      case 'addpart':
        return (
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <AddEditPage onNavigate={navigate} />
          </Suspense>
        );
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavbar page={page} onNavigate={navigate} />
      <main className="flex-1">
        <ErrorBoundary>{renderPage()}</ErrorBoundary>
      </main>
      <MobileNavbar page={page} onNavigate={navigate} />
      <PWABadges />
      <Toaster />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoot />
    </QueryClientProvider>
  </React.StrictMode>
);
