import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ResellerModal } from './components/ResellerModal';
import { WholesaleChatModal } from './components/WholesaleChatModal';
import { Toast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';

const AppContent: React.FC = () => {
  const { currentView, navigateTo } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest text-on-surface">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Screen Router */}
      <main className="w-full pt-20 flex-1">
        {currentView === 'beranda' && <HomeView />}
        {currentView === 'katalog' && <CatalogView />}
        {currentView === 'detail' && <ProductDetailView />}
      </main>

      {/* Global Wholesale Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <CartDrawer />
      <ResellerModal />
      <WholesaleChatModal />
      <Toast />

      {/* Screen Switcher Floating Pill for Quick Evaluation */}
      <div className="fixed bottom-4 left-4 z-40 bg-white/90 backdrop-blur-md border border-surface-container-highest shadow-lg rounded-full p-1.5 flex items-center gap-1 text-xs">
        <span className="px-2.5 py-1 text-outline font-semibold uppercase tracking-wider text-[10px] hidden sm:inline">
          Layar:
        </span>
        <button
          onClick={() => navigateTo('beranda')}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            currentView === 'beranda'
              ? 'bg-primary text-white font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`}
        >
          1. Beranda
        </button>
        <button
          onClick={() => navigateTo('katalog')}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            currentView === 'katalog'
              ? 'bg-primary text-white font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`}
        >
          2. Katalog
        </button>
        <button
          onClick={() => navigateTo('detail', 'bunga-artificial', 'daisy-red')}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            currentView === 'detail'
              ? 'bg-primary text-white font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`}
        >
          3. Detail Produk
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
