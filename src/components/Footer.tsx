import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface pt-12 pb-8 border-t border-surface-container-highest/20 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-inverse-on-surface/15">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="BlueWater Flowers Brand Logo"
                className="h-9 w-auto object-contain bg-white p-1 rounded-lg"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XzzChjRvCCaXsTWjI_79PiH0b_nCcqYL2H4BimNUM0flrFtGgQwrsEthhktnNxYpxwGA07z_QS6LL1YFHyDAfjDiNimwL4Pso3K9fqfnD9kUoq0sGdD_6sPtNbwi9ji5_2cFL2b7x5gUvhKcM4wts_gXHMiMHCYmUQ-p9VPE_8iB2WqR0sJ-Pgz6W1JJSn-_2H83kyfx_RrZozO9RWDv8mj7ZySBWUaaTS5gHAL33T8bfZ5iIXhBP_5s8"
              />
              <div className="flex flex-col">
                <span className="font-headline text-lg text-surface-bright tracking-tight leading-none">
                  BlueWater Flowers
                </span>
                <span className="font-label-sm text-[10px] tracking-wider uppercase text-secondary-fixed">
                  PT Bunga Air Biru Indonesia
                </span>
              </div>
            </div>

            <p className="font-body-sm text-surface-variant max-w-sm leading-relaxed">
              Bunga &amp; Aksesoris Floral Premium, Harga Grosir. Impor langsung dari Yiwu, China untuk florist &amp; WO Indonesia.
            </p>

            <div className="flex flex-col gap-2 font-body-sm text-surface-bright">
              <a
                href="https://wa.me/6281288997722"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-secondary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">call</span>
                <span>WhatsApp Wholesale: +62 812-8899-7722</span>
              </a>
              <a
                href="mailto:halo@bluewaterflowers.co.id"
                className="flex items-center gap-2 hover:text-secondary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">mail</span>
                <span>halo@bluewaterflowers.co.id</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                aria-label="Official WhatsApp"
                href="https://wa.me/6281288997722"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-surface-container-high/15 hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
              <a
                aria-label="Instagram Profile"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-high/15 hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                aria-label="B2B Marketplace Store"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-high/15 hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">storefront</span>
              </a>
              <a
                aria-label="Catalog Video Feed"
                href="#"
                className="w-8 h-8 rounded-full bg-surface-container-high/15 hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
              </a>
            </div>
          </div>

          {/* Column 2: Kategori Produk */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-title-md text-secondary-fixed font-semibold tracking-wide">
              Kategori Produk
            </span>
            <ul className="flex flex-col gap-2 font-body-sm text-surface-variant">
              <li>
                <button
                  onClick={() => navigateTo('katalog', 'bunga-artificial')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Bunga Artificial
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog', 'dried-flowers')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Dried Flowers &amp; Preserved
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog', 'gift-wrappers')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Cellophane &amp; Wrapping Paper
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog', 'pita-aksesoris')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Pita Satin, Organza &amp; Renda
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog', 'kemasan-foam')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Floral Foam, Kawat &amp; Oasis
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('katalog', 'kemasan-foam')}
                  className="hover:text-surface-bright transition-colors text-left"
                >
                  Kerangka Buket &amp; Vas Keramik
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Perusahaan */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-title-md text-secondary-fixed font-semibold tracking-wide">
              Perusahaan
            </span>
            <ul className="flex flex-col gap-2 font-body-sm text-surface-variant">
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Tentang Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Program Reseller Grosir
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Cara Order &amp; Pengiriman
                </button>
              </li>
              <li>
                <a href="https://wa.me/6281288997722" target="_blank" rel="noreferrer" className="hover:text-surface-bright transition-colors text-left">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Blog Inspirasi Florist
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Bantuan & Kebijakan */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-title-md text-secondary-fixed font-semibold tracking-wide">
              Bantuan &amp; Kebijakan
            </span>
            <ul className="flex flex-col gap-2 font-body-sm text-surface-variant">
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Syarat &amp; Ketentuan Grosir
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Kebijakan Retur 7 Hari
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Lacak Pesanan Ekspedisi
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-surface-bright transition-colors text-left">
                  Konfirmasi Pembayaran Transfer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-label-sm text-surface-variant text-center sm:text-left">
          <p>© 2025 BlueWater Flowers (PT Bunga Air Biru Indonesia). Hak Cipta Dilindungi. Bunga &amp; Aksesoris Floral Grosir Terpercaya.</p>
          <div className="flex items-center gap-4">
            <span className="text-secondary-fixed flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">shield</span> B2B Verified Supplier
            </span>
            <span className="text-surface-dim hidden md:inline">|</span>
            <span className="text-surface-variant">Direct Factory Import</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
