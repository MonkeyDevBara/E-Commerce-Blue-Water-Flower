import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';

export const CatalogView: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    navigateTo,
    addToCart,
    toggleWishlist,
    wishlist,
    searchQuery,
    setIsWholesaleChatOpen
  } = useApp();

  // Local filter states
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [priceQuickFilter, setPriceQuickFilter] = useState<'all' | 'under25' | '25to50' | 'above50'>('all');
  const [stockOnly, setStockOnly] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<string>('Red');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('terlaris');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Available colors for filter swatches
  const colorOptions = [
    { name: 'Red', hex: '#e53935' },
    { name: 'Pink', hex: '#f06292' },
    { name: 'Purple', hex: '#8e24aa' },
    { name: 'Blue', hex: '#1e88e5' },
    { name: 'Green', hex: '#43a047' },
    { name: 'Yellow', hex: '#fdd835' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Black', hex: '#212121' },
    { name: 'Gold', hex: '#d4af37' },
    { name: 'Tiffany Blue', hex: '#4dd0e1' }
  ];

  const handlePriceQuick = (type: 'all' | 'under25' | '25to50' | 'above50') => {
    setPriceQuickFilter(type);
    if (type === 'under25') {
      setMinPrice(0);
      setMaxPrice(25000);
    } else if (type === '25to50') {
      setMinPrice(25000);
      setMaxPrice(50000);
    } else if (type === 'above50') {
      setMinPrice(50000);
      setMaxPrice(150000);
    } else {
      setMinPrice(0);
      setMaxPrice(100000);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(100000);
    setPriceQuickFilter('all');
    setStockOnly(false);
    setSelectedColor('');
    setSelectedRating(0);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'all') {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        if (catObj && item.category !== catObj.name) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }

      // Stock filter
      if (stockOnly && item.stockStatus !== 'tersedia') {
        return false;
      }

      // Rating filter
      if (selectedRating > 0 && item.rating < selectedRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'harga-terendah') return a.price - b.price;
      if (sortBy === 'harga-tertinggi') return b.price - a.price;
      if (sortBy === 'terbaru') return b.reviewCount - a.reviewCount;
      if (sortBy === 'diskon') return (b.originalPrice ? b.originalPrice - b.price : 0) - (a.originalPrice ? a.originalPrice - a.price : 0);
      return b.rating - a.rating; // Terlaris default
    });
  }, [selectedCategory, searchQuery, minPrice, maxPrice, stockOnly, selectedRating, sortBy]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* TOP CATEGORY HEADER BAND */}
        <div className="bg-primary-container text-on-primary rounded-xl py-8 px-6 md:px-10 mb-8 relative overflow-hidden shadow-sm">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-fixed/10 pointer-events-none blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-1.5 text-secondary-fixed text-xs font-semibold uppercase tracking-widest mb-1.5">
                <span className="material-symbols-outlined text-[16px]">warehouse</span> Direct Factory Catalog
              </div>
              <h1 className="font-headline text-3xl md:text-4xl text-on-primary mb-1.5 tracking-tight">
                Katalog Produk
              </h1>
              <p className="text-sm md:text-base text-primary-fixed-dim/90">
                1.771 varian produk floral import Yiwu tersedia • Stok real-time gudang Indonesia
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/40 backdrop-blur-xs px-4 py-2 rounded-lg self-start md:self-auto border border-primary-fixed/10">
              <span className="material-symbols-outlined text-secondary-fixed text-[20px]">local_shipping</span>
              <span className="text-xs text-on-primary font-medium">Ekspedisi Reguler &amp; Kontainer Kargo</span>
            </div>
          </div>

          {/* Horizontal Pill Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-xs transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                      : 'bg-primary/30 text-on-primary hover:bg-primary/60'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name} ({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN WORKSPACE: 2 COLUMNS */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* FILTER SIDEBAR (260px Desktop, Sticky) */}
          <aside className="w-full lg:w-[260px] lg:flex-shrink-0 bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-highest/60 lg:sticky lg:top-24 mb-6 lg:mb-0">
            <div className="flex items-center justify-between pb-3 mb-3 bg-surface-container-low px-3 py-2 rounded-lg">
              <div className="flex items-center gap-1.5 font-semibold text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">filter_list</span>
                <span>Filter Produk</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-primary hover:underline font-medium"
              >
                Reset semua
              </button>
            </div>

            <div className="space-y-4">
              {/* Section 1: KATEGORI */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-bold block mb-2">
                  Kategori
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-on-surface">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex items-center justify-between cursor-pointer hover:text-primary py-1"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                          className="w-4 h-4 accent-primary rounded cursor-pointer"
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-outline text-[11px] font-mono">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-surface-container-highest" />

              {/* Section 2: RENTANG HARGA */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-bold block mb-2">
                  Rentang Harga (IDR)
                </span>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-surface-container-low px-2 py-1.5 rounded border border-surface-container-highest/50">
                    <label className="block text-[10px] text-outline uppercase font-semibold">Min</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full bg-transparent text-xs text-on-surface font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="bg-surface-container-low px-2 py-1.5 rounded border border-surface-container-highest/50">
                    <label className="block text-[10px] text-outline uppercase font-semibold">Max</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full bg-transparent text-xs text-on-surface font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => handlePriceQuick('under25')}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      priceQuickFilter === 'under25'
                        ? 'bg-primary-container text-white font-medium'
                        : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    &lt; Rp 25rb
                  </button>
                  <button
                    onClick={() => handlePriceQuick('25to50')}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      priceQuickFilter === '25to50'
                        ? 'bg-primary-container text-white font-medium'
                        : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    Rp 25-50rb
                  </button>
                  <button
                    onClick={() => handlePriceQuick('above50')}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      priceQuickFilter === 'above50'
                        ? 'bg-primary-container text-white font-medium'
                        : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    &gt; Rp 50rb
                  </button>
                </div>
              </div>

              <div className="h-px bg-surface-container-highest" />

              {/* Section 3: KETERSEDIAAN STOK */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-bold block mb-2">
                  Ketersediaan Stok
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-on-surface">
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary py-1">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={stockOnly}
                        onChange={(e) => setStockOnly(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <span>Stok Tersedia</span>
                    </span>
                    <span className="text-outline text-[11px] font-mono">1.152</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer hover:text-primary py-1">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!stockOnly}
                        onChange={(e) => setStockOnly(!e.target.checked)}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <span>Hampir Habis</span>
                    </span>
                    <span className="text-outline text-[11px] font-mono">285</span>
                  </label>
                </div>
              </div>

              <div className="h-px bg-surface-container-highest" />

              {/* Section 4: PILIHAN WARNA */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-outline font-bold">
                    Pilihan Warna
                  </span>
                  {selectedColor && (
                    <span className="text-[11px] text-primary font-bold">{selectedColor} terpilih</span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2 pt-1">
                  {colorOptions.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(isSelected ? '' : c.name)}
                        className={`w-8 h-8 rounded-full shadow-xs flex items-center justify-center transition-transform hover:scale-110 relative ${
                          c.name === 'White' ? 'border border-surface-container-highest' : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {isSelected && (
                          <span className={`material-symbols-outlined text-[16px] font-bold ${c.name === 'White' || c.name === 'Yellow' ? 'text-black' : 'text-white'}`}>
                            check
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-surface-container-highest" />

              {/* Section 5: RATING */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-bold block mb-2">
                  Rating Pelanggan
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-on-surface">
                  <label
                    onClick={() => setSelectedRating(selectedRating === 5 ? 0 : 5)}
                    className="flex items-center justify-between cursor-pointer hover:text-primary py-1"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRating === 5}
                        onChange={() => {}}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <span className="flex items-center text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="text-outline text-[11px] font-mono">892</span>
                  </label>
                  <label
                    onClick={() => setSelectedRating(selectedRating === 4 ? 0 : 4)}
                    className="flex items-center justify-between cursor-pointer hover:text-primary py-1"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRating === 4}
                        onChange={() => {}}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <span className="flex items-center text-secondary">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                        <span className="text-xs text-on-surface-variant ml-1">&amp; ke atas</span>
                      </span>
                    </span>
                    <span className="text-outline text-[11px] font-mono">1.203</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => {}}
                className="w-full bg-primary-container hover:bg-primary text-white py-2.5 rounded-lg font-medium text-xs transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
              >
                <span className="material-symbols-outlined text-[18px]">done_all</span> Terapkan Filter
              </button>
            </div>
          </aside>

          {/* MAIN AREA: Product catalog grid & controls */}
          <section className="flex-1 w-full flex flex-col min-w-0">
            {/* TOPBAR */}
            <div className="bg-surface-container-lowest rounded-xl p-4 mb-4 shadow-sm border border-surface-container-highest/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <nav className="flex items-center gap-1 text-xs text-outline mb-1">
                  <button onClick={() => navigateTo('beranda')} className="hover:text-primary">
                    Beranda
                  </button>
                  <span>›</span>
                  <button onClick={() => handleResetFilters()} className="hover:text-primary">
                    Katalog Produk
                  </button>
                  <span>›</span>
                  <span className="text-primary font-semibold">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Semua Kategori'}
                  </span>
                </nav>
                <p className="text-xs text-on-surface font-medium">
                  Menampilkan{' '}
                  <span className="font-bold text-primary">1–{filteredProducts.length}</span> dari{' '}
                  <span className="font-bold">1.771</span> produk floral siap kirim
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-outline whitespace-nowrap">Urutkan:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface-container-low text-on-surface text-xs font-semibold rounded-lg py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer border border-surface-container-highest/60"
                  >
                    <option value="terlaris">Terlaris (Volume Grosir)</option>
                    <option value="harga-terendah">Harga Terendah</option>
                    <option value="harga-tertinggi">Harga Tertinggi</option>
                    <option value="terbaru">Produk Terbaru</option>
                    <option value="diskon">Diskon Terbesar</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-outline text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIVE FILTER TAGS ROW */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[11px] text-outline uppercase tracking-wider mr-1 font-bold">
                Filter Aktif:
              </span>
              <div className="inline-flex items-center gap-1.5 bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-medium">
                <span>{CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Semua Produk'}</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-error flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
              {selectedColor && (
                <div className="inline-flex items-center gap-1.5 bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-medium">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: colorOptions.find((c) => c.name === selectedColor)?.hex || '#e53935'
                    }}
                  />
                  <span>Warna: {selectedColor}</span>
                  <button onClick={() => setSelectedColor('')} className="hover:text-error flex items-center">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              )}
              {stockOnly && (
                <div className="inline-flex items-center gap-1.5 bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-medium">
                  <span>Stok Tersedia</span>
                  <button onClick={() => setStockOnly(false)} className="hover:text-error flex items-center">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-error hover:underline ml-2 font-medium"
              >
                Hapus Semua
              </button>
            </div>

            {/* 12 PRODUCT CARDS GRID (3-Column Desktop Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-surface-container-highest/60 transition-all duration-200 flex flex-col group"
                >
                  <div
                    onClick={() => navigateTo('detail', undefined, product.id)}
                    className="relative aspect-square bg-surface-container-low overflow-hidden flex items-center justify-center p-4 cursor-pointer"
                  >
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 ${
                          product.badge.includes('SALE')
                            ? 'bg-secondary text-white'
                            : product.badge === 'BARU'
                            ? 'bg-surface-container-high text-primary font-semibold'
                            : product.badge === 'POPULER'
                            ? 'bg-tertiary-container text-white'
                            : product.badge === 'REKOMENDASI'
                            ? 'bg-surface-container-high text-primary-container font-semibold'
                            : product.badge === 'BASIC'
                            ? 'bg-surface-container-high text-on-surface'
                            : product.badge === 'GROSIR'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-primary-container text-[#f5e6ba]'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs text-on-surface-variant hover:text-error flex items-center justify-center z-10 transition-colors"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${wishlist.includes(product.id) ? 'text-error' : ''}`}>
                        favorite
                      </span>
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-outline mb-1 font-mono">
                        <span>SKU: {product.sku}</span>
                        <span
                          className={`font-sans font-medium flex items-center gap-1 ${
                            product.stockStatus === 'hampir_habis' ? 'text-secondary' : 'text-primary'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full inline-block ${
                              product.stockStatus === 'hampir_habis' ? 'bg-secondary' : 'bg-primary'
                            }`}
                          />
                          {product.stockStatus === 'hampir_habis' ? 'Hampir habis' : 'Stok tersedia'}
                        </span>
                      </div>
                      <h3
                        onClick={() => navigateTo('detail', undefined, product.id)}
                        className="font-headline text-base text-on-surface mb-1 group-hover:text-primary transition-colors line-clamp-1 cursor-pointer font-semibold"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant mb-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-surface-container-highest/40">
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-headline text-lg text-primary font-bold">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-outline line-through">
                                Rp {product.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-outline block">
                            {product.wholesaleUnitNote || `Reseller: Rp ${product.resellerPrice.toLocaleString('id-ID')}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="flex-1 bg-primary-container hover:bg-primary text-white py-2 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                          <span>Beli</span>
                        </button>
                        <button
                          onClick={() => {
                            addToCart(product, product.wholesaleMinQty || 12);
                          }}
                          className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant transition-colors"
                          title="Order Koli / Grosir Dus Cepat"
                        >
                          <span className="material-symbols-outlined text-[20px]">package_2</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WHOLESALE BULK QUICK STRIP */}
            <div className="bg-surface-container-low rounded-xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-surface-container-highest/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                </div>
                <div>
                  <h4 className="font-headline text-base text-on-surface font-semibold">
                    Butuh Pembelian Dus / Kontainer FCL?
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Dapatkan diskon tiered hingga 38% langsung dari pabrik Yiwu untuk Florist &amp; Toko Perlengkapan.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWholesaleChatOpen(true)}
                className="whitespace-nowrap px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat Sales Wholesale</span>
              </button>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low text-xs transition-colors flex items-center gap-1 shadow-sm font-medium border border-surface-container-highest/50"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-lg font-bold text-xs shadow-sm flex items-center justify-center ${
                  currentPage === 1
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-surface-container-highest/50'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 rounded-lg font-medium text-xs shadow-sm flex items-center justify-center ${
                  currentPage === 2
                    ? 'bg-primary text-white font-bold'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-surface-container-highest/50'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 rounded-lg font-medium text-xs shadow-sm flex items-center justify-center ${
                  currentPage === 3
                    ? 'bg-primary text-white font-bold'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-surface-container-highest/50'
                }`}
              >
                3
              </button>
              <span className="w-8 text-center text-outline font-bold text-xs">...</span>
              <button
                onClick={() => setCurrentPage(148)}
                className={`w-9 h-9 rounded-lg font-medium text-xs shadow-sm flex items-center justify-center ${
                  currentPage === 148
                    ? 'bg-primary text-white font-bold'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-surface-container-highest/50'
                }`}
              >
                148
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(148, p + 1))}
                className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low text-xs transition-colors flex items-center gap-1 shadow-sm font-medium border border-surface-container-highest/50"
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
