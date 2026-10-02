import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/storefront/AnnouncementBar';
import { Header } from './components/storefront/Header';
import { Footer } from './components/storefront/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { LookbookPage } from './pages/LookbookPage';
import { CustomLookPage } from './pages/CustomLookPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { SearchPage } from './pages/SearchPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPath } = useStore();

  // Route matching
  const pathname = currentPath.split('?')[0];

  // Admin route has its own full-screen management interface
  if (pathname.startsWith('/admin')) {
    return (
      <>
        <AdminPage />
        <ToastContainer />
      </>
    );
  }

  // Determine current storefront view
  let pageComponent = <HomePage />;

  if (pathname === '/' || pathname === '/home') {
    pageComponent = <HomePage />;
  } else if (pathname === '/shop' || pathname.startsWith('/shop/')) {
    pageComponent = <ShopPage />;
  } else if (pathname === '/blazers') {
    pageComponent = <ShopPage initialCategory="blazers" />;
  } else if (pathname === '/pants') {
    pageComponent = <ShopPage initialCategory="pants" />;
  } else if (pathname === '/t-shirts' || pathname === '/tshirts') {
    pageComponent = <ShopPage initialCategory="t-shirts" />;
  } else if (pathname === '/hoodies') {
    pageComponent = <ShopPage initialCategory="hoodies" />;
  } else if (pathname === '/coats') {
    pageComponent = <ShopPage initialCategory="coats" />;
  } else if (pathname.startsWith('/products/')) {
    const slug = pathname.replace('/products/', '');
    pageComponent = <ProductDetailPage slug={slug} />;
  } else if (pathname === '/collections' || pathname.startsWith('/collections/')) {
    pageComponent = <CollectionsPage />;
  } else if (pathname === '/search') {
    pageComponent = <SearchPage />;
  } else if (pathname === '/wishlist') {
    pageComponent = <WishlistPage />;
  } else if (pathname === '/lookbook') {
    pageComponent = <LookbookPage />;
  } else if (pathname === '/custom-look') {
    pageComponent = <CustomLookPage />;
  } else if (pathname === '/about') {
    pageComponent = <AboutPage />;
  } else if (pathname === '/contact') {
    pageComponent = <ContactPage />;
  } else if (pathname === '/cart') {
    pageComponent = <CartPage />;
  } else if (pathname === '/checkout') {
    pageComponent = <CheckoutPage />;
  } else if (pathname === '/order-confirmation') {
    pageComponent = <OrderConfirmationPage />;
  } else if (pathname === '/account') {
    pageComponent = <AccountPage />;
  } else {
    pageComponent = <HomePage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <AnnouncementBar />
      <Header />
      <div className="flex-1">
        {pageComponent}
      </div>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
