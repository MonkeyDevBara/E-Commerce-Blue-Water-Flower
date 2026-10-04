import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const HomeView: React.FC = () => {
  const { navigateTo, addToCart, setIsResellerModalOpen, toggleWishlist, wishlist } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Grab the 4 featured products as shown in Screen 1 mockup:
  const featuredProducts = [
    PRODUCTS[1], // Cellophane Gradient Matte Tiffany Blue
    PRODUCTS[0], // Daisy Artificial Premium RED
    PRODUCTS[3], // Pita Gelombang Hologram
    PRODUCTS[2]  // Baby Breath Dried
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. ANNOUNCEMENT STRIP */}
      <section className="w-full bg-primary-container text-on-primary py-2.5 px-4 md:px-8 shadow-sm flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center font-label-md text-xs sm:text-sm">
          <span className="flex items-center gap-1 font-semibold tracking-wide">
            <span className="text-secondary-fixed">🎉</span> Gratis ongkir min. Rp 500.000
          </span>
          <span className="hidden sm:inline-block text-on-primary-container font-light opacity-60">·</span>
          <span className="flex items-center gap-1.5">
            Kode voucher: <span className="bg-primary/50 text-secondary-fixed font-semibold px-2 py-0.5 rounded tracking-wider text-xs uppercase">BLUEWATER30</span> untuk diskon 30%
          </span>
          <span className="hidden md:inline-block text-on-primary-container font-light opacity-60">·</span>
          <span className="hidden md:inline-flex items-center gap-1 text-surface-container-lowest">
            <span className="material-symbols-outlined text-[15px] text-secondary-fixed">flight_land</span>
            Impor Langsung dari Yiwu, China
          </span>
        </div>
      </section>

      {/* 2. HERO SECTION */}
      <section className="w-full bg-surface-container-low min-h-[580px] flex items-center py-10 lg:py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle Botanical Organic Background Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-sm text-xs font-semibold tracking-wider uppercase shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
              <span>Impor langsung dari Yiwu, China</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight font-medium leading-[1.15] max-w-2xl">
              Bunga &amp; Aksesoris Floral Premium untuk Bisnis Kamu
            </h1>

            {/* Subtext */}
            <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Supplier terpercaya untuk florist, wedding organizer, dan reseller seluruh Indonesia. Lebih dari 1.700 varian produk tersedia dengan stok real-time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
              <button
                onClick={() => navigateTo('katalog')}
                className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-white px-8 py-3.5 rounded font-label-md text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Belanja Sekarang</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => setIsResellerModalOpen(true)}
                className="inline-flex items-center justify-center bg-surface-container-lowest hover:bg-surface-container-high text-primary px-8 py-3.5 rounded font-label-md text-sm font-semibold shadow-xs transition-colors"
              >
                Daftar Reseller
              </button>
            </div>

            {/* 3 Stat Pills */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-3 w-full max-w-lg">
              <div className="bg-surface-container-lowest/90 backdrop-blur-sm p-3.5 rounded-xl shadow-xs flex flex-col border border-surface-container-highest/40">
                <span className="font-headline text-xl sm:text-2xl text-primary font-bold">1.700+</span>
                <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant">Produk Ready</span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-sm p-3.5 rounded-xl shadow-xs flex flex-col border border-surface-container-highest/40">
                <span className="font-headline text-xl sm:text-2xl text-primary font-bold">5.000+</span>
                <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant">Seluruh RI</span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-sm p-3.5 rounded-xl shadow-xs flex flex-col border border-surface-container-highest/40">
                <div className="flex items-center gap-1">
                  <span className="font-headline text-xl sm:text-2xl text-secondary font-bold">4.8</span>
                  <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                </div>
                <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant">Dari 12rb+ Florist</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div
                onClick={() => navigateTo('detail', 'bunga-artificial', 'daisy-red')}
                className="relative bg-surface-container-lowest rounded-2xl p-3 shadow-md overflow-hidden group cursor-pointer border border-surface-container-highest/60 hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-xl overflow-hidden relative bg-surface-container flex items-center justify-center">
                  <img
                    alt="Bunga Daisy Premium Silk Artificial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9H3BeIqa1wKhiBsDs3oLUamQ3BIbCQUdXTMNCaDkQsVKEvDW1rIrkU7Fy_Dvq_m0YnRx-hcUZ1IdjqettueX2Ttg4gnmRHH54pSNofmhVwzfVOAvGZJO2lXVFujtoqgTrvKgOCuoIzO9VW0rZNJpvfmXLtyj2XCWts7DwIvFfv7fp0iiobDwGU2uZ1MNSjOioQ2R1yZXamN7qUAA5PKnF1_PkqR3uA00S-lxyqn3ZXc-1wMMuhuoF"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-black/10" />

                  {/* Floating Glass Badge Top */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs text-primary font-semibold shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Koleksi Terlengkap 2025 · Yiwu Direct
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist('daisy-red');
                      }}
                      className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-primary shadow-xs hover:text-error transition-colors"
                    >
                      <span className={`material-symbols-outlined text-[16px] ${wishlist.includes('daisy-red') ? 'text-error' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Floating Bottom Pill Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-md rounded-lg p-3.5 shadow-sm flex items-center justify-between border border-surface-container-highest/40">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center text-[16px]">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                        </span>
                        <div>
                          <p className="font-semibold text-xs text-on-surface">Silk &amp; Preserved Grade A</p>
                          <p className="text-[11px] text-on-surface-variant">Garansi Kualitas Tekstur Asli</p>
                        </div>
                      </div>
                      <span className="bg-surface-container text-primary text-xs font-semibold px-2.5 py-1 rounded">
                        B2B Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full bg-primary/10 rounded-2xl blur-md" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SECTION ("Jelajahi Koleksi") */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <span className="text-xs tracking-widest uppercase font-semibold text-secondary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Jelajahi Koleksi
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium tracking-tight">
                Temukan Produk yang Kamu Butuhkan
              </h2>
              <p className="font-body-md text-on-surface-variant text-sm sm:text-base">
                Pilihan terlengkap untuk kebutuhan buket, dekorasi pernikahan, dan studio florist
              </p>
            </div>
            <button
              onClick={() => navigateTo('katalog', 'all')}
              className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
            >
              <span>Semua Kategori</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>

          {/* 4 Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div
              onClick={() => navigateTo('katalog', 'bunga-artificial')}
              className="group bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md border border-surface-container-highest/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-all" />
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-2xl text-primary group-hover:scale-110 transition-transform">
                  🌺
                </div>
                <div>
                  <h3 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors">
                    Bunga Artificial
                  </h3>
                  <p className="text-xs text-secondary font-medium pt-0.5">248 produk</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Silk Peony, Daisy, Tulip, Mawar premium tekstur realistis.
                </p>
              </div>
              <div className="pt-5 flex items-center justify-between text-primary text-xs font-semibold tracking-wider uppercase">
                <span>Lihat Produk</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Category 2 */}
            <div
              onClick={() => navigateTo('katalog', 'gift-wrappers')}
              className="group bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md border border-surface-container-highest/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-all" />
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-2xl text-primary group-hover:scale-110 transition-transform">
                  🎁
                </div>
                <div>
                  <h3 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors">
                    Gift Wrappers
                  </h3>
                  <p className="text-xs text-secondary font-medium pt-0.5">312 produk</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Cellophane Matte tahan air, Korean Two-Tone, dan Tissue paper.
                </p>
              </div>
              <div className="pt-5 flex items-center justify-between text-primary text-xs font-semibold tracking-wider uppercase">
                <span>Lihat Produk</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Category 3 */}
            <div
              onClick={() => navigateTo('katalog', 'dried-flowers')}
              className="group bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md border border-surface-container-highest/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-all" />
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-2xl text-primary group-hover:scale-110 transition-transform">
                  🌾
                </div>
                <div>
                  <h3 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors">
                    Dried Flowers
                  </h3>
                  <p className="text-xs text-secondary font-medium pt-0.5">187 produk</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Baby Breath import, Lagurus Bunny Tail, Amaranthus, dan Pampas.
                </p>
              </div>
              <div className="pt-5 flex items-center justify-between text-primary text-xs font-semibold tracking-wider uppercase">
                <span>Lihat Produk</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Category 4 */}
            <div
              onClick={() => navigateTo('katalog', 'pita-aksesoris')}
              className="group bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md border border-surface-container-highest/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-primary transition-all" />
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-2xl text-primary group-hover:scale-110 transition-transform">
                  🎀
                </div>
                <div>
                  <h3 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors">
                    Pita &amp; Aksesoris
                  </h3>
                  <p className="text-xs text-secondary font-medium pt-0.5">423 produk</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Pita Hologram, Satin, Floral Foam Oasis, dan Gunting Florist Emas.
                </p>
              </div>
              <div className="pt-5 flex items-center justify-between text-primary text-xs font-semibold tracking-wider uppercase">
                <span>Lihat Produk</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS ("Produk Terlaris Bulan Ini") */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs tracking-widest uppercase font-semibold text-primary">
                Katalog Favorit Florist
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium tracking-tight mt-1">
                Produk Terlaris Bulan Ini
              </h2>
            </div>
            <button
              onClick={() => navigateTo('katalog')}
              className="inline-flex items-center gap-1.5 text-primary-container text-sm font-semibold hover:text-primary hover:underline"
            >
              <span>Lihat Semua Katalog</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* 4-column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-surface-container-highest/60 flex flex-col group transition-all duration-200"
              >
                <div
                  onClick={() => navigateTo('detail', undefined, product.id)}
                  className="aspect-square relative overflow-hidden bg-surface-container cursor-pointer flex items-center justify-center p-3"
                >
                  <img
                    alt={product.name}
                    src={product.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                  />
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-xs ${
                        product.badge.includes('SALE')
                          ? 'bg-error text-white'
                          : product.badge === 'BARU'
                          ? 'bg-secondary text-white'
                          : product.badge === 'POPULER'
                          ? 'bg-tertiary text-white'
                          : 'bg-primary-container text-white'
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
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs text-on-surface-variant hover:text-error flex items-center justify-center transition-colors"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${wishlist.includes(product.id) ? 'text-error' : ''}`}>
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-secondary font-bold tracking-wider uppercase">
                      {product.category}
                    </span>
                    <h4
                      onClick={() => navigateTo('detail', undefined, product.id)}
                      className="font-title-md text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2 cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs text-outline font-mono">SKU: {product.sku}</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-1 border-t border-surface-container-highest/40">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline text-lg text-primary font-bold">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-outline line-through">
                          Rp {product.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="text-xs text-outline">/ {product.unit}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.stockStatus === 'hampir_habis' ? 'bg-secondary animate-ping' : 'bg-primary animate-pulse'
                        }`}
                      />
                      <span className={product.stockStatus === 'hampir_habis' ? 'text-secondary font-medium' : ''}>
                        {product.stockStatus === 'hampir_habis'
                          ? `Hampir habis (${product.stock} roll)`
                          : `Stok tersedia (${product.stock} ${product.unit})`}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full mt-1 bg-primary-container hover:bg-primary text-white py-2.5 px-3 rounded font-medium text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>Tambah ke Keranjang</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RESELLER PROGRAM BANNER */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto bg-surface-container-low rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden border border-surface-container-highest/60">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Banner Details */}
            <div className="lg:col-span-6 flex flex-col items-start gap-4">
              <span className="text-xs tracking-widest uppercase font-bold text-secondary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">workspace_premium</span>
                PROGRAM RESELLER GROSIR
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium leading-tight">
                Bergabung sebagai Reseller BlueWater
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Dapatkan akses harga import grosir tangan pertama dari Yiwu, China, prioritas pengiriman ekspedisi kargo cepat, dan materi katalog siap jual tanpa watermark.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsResellerModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-white px-6 py-3 rounded font-medium text-sm transition-colors shadow-sm"
                >
                  <span>Daftar Reseller Sekarang</span>
                  <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                </button>
                <button
                  onClick={() => setIsResellerModalOpen(true)}
                  className="inline-flex items-center bg-surface-container-lowest hover:bg-surface-container text-primary px-5 py-3 rounded font-medium text-sm transition-colors shadow-xs"
                >
                  Pelajari Syarat &amp; Ketentuan
                </button>
              </div>
            </div>

            {/* Right: 2x2 Perk Cards Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Perk 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs flex flex-col gap-2 border border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-xl">
                  💰
                </div>
                <h4 className="font-semibold text-sm text-on-surface">Harga Grosir</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Hingga 40% lebih murah dari harga eceran pasar florist umum.
                </p>
              </div>
              {/* Perk 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs flex flex-col gap-2 border border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-xl">
                  🚚
                </div>
                <h4 className="font-semibold text-sm text-on-surface">Free Ongkir</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Min. pembelian Rp 500.000 ke seluruh ekspedisi darat &amp; laut.
                </p>
              </div>
              {/* Perk 3 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs flex flex-col gap-2 border border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-xl">
                  📦
                </div>
                <h4 className="font-semibold text-sm text-on-surface">Ready Stock</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  1.700+ varian selalu ready di gudang Surabaya &amp; Jakarta.
                </p>
              </div>
              {/* Perk 4 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs flex flex-col gap-2 border border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-xl">
                  🎁
                </div>
                <h4 className="font-semibold text-sm text-on-surface">Poin Reward</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Kumpulkan poin per transaksi, tukar diskon ekstra dan bonus produk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-1.5 max-w-2xl mx-auto">
            <span className="text-xs tracking-widest uppercase font-semibold text-secondary">
              Suara Rekan Bisnis
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium tracking-tight">
              Dipercaya Lebih Dari 12.000+ Florist &amp; WO
            </h2>
            <p className="text-sm text-on-surface-variant">
              Simak pengalaman mereka yang mengembangkan bisnis floral bersama suplai tangan pertama BlueWater.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-highest/50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant italic leading-relaxed">
                  “Kualitas cellophane dan daisy artificial BlueWater sangat rapi, persis standar florist Korea. Margin florist kami naik 30% sejak beralih grosir ke sini.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary font-bold flex items-center justify-center text-sm">
                  AR
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface leading-tight">Anita Rahayu</p>
                  <p className="text-xs text-on-surface-variant">Owner Florette Florist, Surabaya</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-highest/50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant italic leading-relaxed">
                  “Pengiriman cepat, stok ribuan tangkai peony dan gypsophila selalu konsisten untuk dekorasi pelaminan bintang lima. Tidak pernah telat event.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary font-bold flex items-center justify-center text-sm">
                  DS
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface leading-tight">Dewi Sartika</p>
                  <p className="text-xs text-on-surface-variant">Lead Wedding Organizer, Jakarta</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-highest/50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm text-on-surface-variant italic leading-relaxed">
                  “Harga reseller beneran tangan pertama Yiwu, potongan grosirnya nyata dan CS sangat responsif saat butuh kargo dadakan di weekend.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-highest/40">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary font-bold flex items-center justify-center text-sm">
                  BW
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface leading-tight">Budi Wicaksono</p>
                  <p className="text-xs text-on-surface-variant">Toko Bunga Abadi, Malang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto bg-surface-container-low rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-4 shadow-xs border border-surface-container-highest/50">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-xs">
            <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
          </div>

          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="font-headline text-2xl text-on-surface font-medium">
              Dapatkan Info Stok Baru &amp; Promo Grosir Terkini
            </h3>
            <p className="text-sm text-on-surface-variant">
              Kami rutin mengabarkan kontainer barang baru yang tiba dari Yiwu setiap 2 minggu sekali langsung ke email kamu.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2.5 mt-2">
            <input
              required
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Masukkan alamat email bisnis kamu..."
              className="flex-1 bg-white text-on-surface placeholder:text-outline text-sm px-4 py-3 rounded-lg border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
            />
            <button
              type="submit"
              className="bg-primary-container hover:bg-primary text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Berlangganan
            </button>
          </form>

          {newsletterSubscribed && (
            <div className="text-primary text-xs bg-surface-container py-2.5 px-4 rounded-lg flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Terima kasih! Jadwal kontainer baru dan katalog promo akan dikirimkan ke email Anda.</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-outline text-xs pt-2">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span> Data aman &amp; tanpa spam
            </span>
            <span>•</span>
            <span>Bisa berhenti berlangganan kapan saja</span>
          </div>
        </div>
      </section>
    </div>
  );
};
