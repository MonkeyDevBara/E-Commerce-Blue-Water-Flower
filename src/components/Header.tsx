import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentView,
    selectedCategory,
    cartCount,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsResellerModalOpen,
    navigateTo
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('katalog');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-container-highest shadow-[0_4px_16px_-2px_rgba(26,92,56,0.05)]">
      {/* Top Wholesale Trust Bar */}
      <div className="bg-primary-container text-on-primary py-1 px-4 md:px-8 text-center text-label-sm font-label-sm tracking-wider flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-secondary-fixed">verified</span>
          Impor Langsung Dari Yiwu, China
        </span>
        <span className="hidden md:inline-block text-secondary-fixed">•</span>
        <span className="hidden md:inline-block">Harga Grosir Khusus Florist &amp; Event Organizer</span>
        <span className="hidden lg:inline-block text-secondary-fixed">•</span>
        <span className="hidden lg:flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-secondary-fixed">local_shipping</span>
          Gratis Ongkir Min. Belanja Tertentu
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 w-full px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigateTo('beranda')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <img
              alt="BlueWater Flowers Brand Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XzzChjRvCCaXsTWjI_79PiH0b_nCcqYL2H4BimNUM0flrFtGgQwrsEthhktnNxYpxwGA07z_QS6LL1YFHyDAfjDiNimwL4Pso3K9fqfnD9kUoq0sGdD_6sPtNbwi9ji5_2cFL2b7x5gUvhKcM4wts_gXHMiMHCYmUQ-p9VPE_8iB2WqR0sJ-Pgz6W1JJSn-_2H83kyfx_RrZozO9RWDv8mj7ZySBWUaaTS5gHAL33T8bfZ5iIXhBP_5s8"
            />
            <div className="flex flex-col">
              <span className="font-headline text-xl text-primary tracking-tight leading-none group-hover:text-primary-container transition-colors">
                BlueWater
              </span>
              <span className="font-label-sm text-[10px] tracking-widest uppercase text-secondary font-bold">
                Floral Supply
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            onClick={() => navigateTo('beranda')}
            className={`px-4 py-2 transition-all rounded-lg font-medium text-sm ${
              currentView === 'beranda'
                ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => navigateTo('katalog', 'all')}
            className={`px-4 py-2 transition-all rounded-lg font-medium text-sm ${
              currentView === 'katalog' && selectedCategory === 'all'
                ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Katalog
          </button>
          <button
            onClick={() => navigateTo('katalog', 'bunga-artificial')}
            className={`px-4 py-2 transition-all rounded-lg font-medium text-sm ${
              (currentView === 'katalog' && selectedCategory === 'bunga-artificial') ||
              (currentView === 'detail')
                ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Bunga Artificial
          </button>
          <button
            onClick={() => navigateTo('katalog', 'dried-flowers')}
            className={`px-4 py-2 transition-all rounded-lg font-medium text-sm ${
              currentView === 'katalog' && selectedCategory === 'dried-flowers'
                ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Dried Flowers
          </button>
          <button
            onClick={() => navigateTo('katalog', 'gift-wrappers')}
            className={`px-4 py-2 transition-all rounded-lg font-medium text-sm ${
              currentView === 'katalog' && selectedCategory === 'gift-wrappers'
                ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Gift Wrappers
          </button>
          <button
            onClick={() => {
              navigateTo('detail');
            }}
            className="px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors text-sm font-medium rounded-lg"
          >
            Detail Produk (Demo)
          </button>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-56 lg:w-64">
            <span className="material-symbols-outlined absolute left-2.5 text-outline pointer-events-none text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-highest text-on-surface placeholder:text-outline text-body-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Cari bunga, pita, cellophane..."
            />
          </form>

          {/* Cart Bag Icon with Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Keranjang Belanja"
            className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white leading-none shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-surface-container-highest hidden sm:block"></div>

          {/* Login / Auth */}
          <button
            onClick={() => setIsResellerModalOpen(true)}
            className="hidden sm:inline-flex items-center justify-center border border-primary text-primary hover:bg-surface-container-low font-medium text-sm px-3.5 py-2 rounded-lg transition-colors"
          >
            Masuk
          </button>

          {/* Register Reseller CTA */}
          <button
            onClick={() => setIsResellerModalOpen(true)}
            className="inline-flex items-center justify-center bg-primary-container text-white hover:bg-primary font-medium text-sm px-3.5 py-2 rounded-lg transition-all shadow-sm"
          >
            Daftar Reseller
          </button>

          {/* Profile Circle */}
          <button
            onClick={() => setIsResellerModalOpen(true)}
            aria-label="Profil Pengguna"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
