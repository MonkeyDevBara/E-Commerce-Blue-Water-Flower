import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, Product } from '../data/products';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    wishlist,
    setIsCartOpen,
    navigateTo,
    showToast
  } = useApp();

  // Find currently selected product (defaults to Daisy Red)
  const product: Product =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const thumbnails = product.thumbnails || [
    product.image,
    PRODUCTS[1]?.image,
    PRODUCTS[2]?.image,
    PRODUCTS[4]?.image
  ];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Merah (RED)');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'spesifikasi' | 'ulasan'>('deskripsi');
  const [isZoomed, setIsZoomed] = useState(false);

  // Related complementary products
  const relatedProducts = [
    PRODUCTS[1], // Cellophane Tiffany Blue
    PRODUCTS[9], // Pita Satin
    PRODUCTS[2], // Baby Breath
    PRODUCTS[4]  // Tulip Latex
  ];

  const isFavorited = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Lihat suplai grosir florist: ${product.name} di BlueWater Flowers!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Tautan Disalin!', 'Link katalog produk siap dibagikan ke tim florist Anda.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Live Ticker Bar */}
      <section className="w-full bg-surface-container-low px-4 md:px-6 lg:px-8 py-3 border-b border-surface-container-highest">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-outline font-medium">
            <button onClick={() => navigateTo('beranda')} className="hover:text-primary transition-colors">
              Beranda
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <button
              onClick={() => navigateTo('katalog', 'bunga-artificial')}
              className="hover:text-primary transition-colors"
            >
              Bunga Artificial
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary transition-colors">Daisy Import</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">{product.name}</span>
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-xs text-secondary bg-surface-container-lowest px-3 py-1 rounded-full shadow-xs border border-surface-container-highest/60">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping inline-block" />
            <span>Batch Baru: Impor Yiwu Tiba 2 Hari Lalu · Ready Stok Gudang Surabaya</span>
          </div>
        </div>
      </section>

      {/* Main Product Section (2-Column Studio Grid) */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-10 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Gallery Studio (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-24">
            {/* Main Featured Image Canvas */}
            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              className="relative w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden shadow-sm group border border-surface-container-highest/60 flex items-center justify-center p-6 cursor-zoom-in"
            >
              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-contain transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              />

              {/* Floating Commercial Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span> TERLARIS
                </span>
                <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">flight_land</span> IMPORT YIWU
                </span>
              </div>

              {/* Zoom Prompt Pill */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-on-surface text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs pointer-events-none border border-surface-container-highest/40">
                <span className="material-symbols-outlined text-[16px] text-primary">zoom_in</span>
                <span>Hover untuk zoom detail serat</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((thumbUrl, idx) => {
                const isSelected = activeImage === thumbUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(thumbUrl)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-surface-container-low transition-all focus:outline-none p-1 shadow-xs border-2 ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/20 opacity-100'
                        : 'border-surface-container-highest opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbUrl}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick Spec Callout Strip */}
            <div className="bg-surface-container-low/70 rounded-lg p-4 flex items-center justify-between text-xs text-on-surface-variant border border-surface-container-highest/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
                <span>Tinggi Tangkai: <strong>{product.specs?.height || '±30 cm'}</strong></span>
              </div>
              <div className="h-4 w-px bg-surface-container-highest" />
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">aspect_ratio</span>
                <span>Kelopak: <strong>{product.specs?.diameter || 'Ø 7 cm'}</strong></span>
              </div>
              <div className="h-4 w-px bg-surface-container-highest" />
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">scale</span>
                <span>Berat: <strong>{product.specs?.weight || '±50 gr'}</strong></span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Commercial Information (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Category Pill & Stock Meta */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-primary text-xs rounded-full font-semibold tracking-wide">
                <span className="material-symbols-outlined text-[16px]">eco</span> {product.category}
              </span>
              <span className="text-xs text-outline tracking-wider font-mono">
                SKU: <span className="text-on-surface font-semibold">{product.sku}</span> · Kategori: Bunga Sutra
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight font-medium">
              {product.name}
            </h1>

            {/* Rating & Sales Matrix */}
            <div className="flex flex-wrap items-center gap-2 pb-1 text-xs text-on-surface-variant">
              <div className="flex items-center text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="font-bold text-on-surface ml-1.5 text-sm">{product.rating}</span>
              </div>
              <span className="text-outline">•</span>
              <button
                onClick={() => setActiveTab('ulasan')}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                {product.reviewCount} ulasan terverifikasi
              </button>
              <span className="text-outline">•</span>
              <span className="font-medium">{product.soldCount} tangkai terjual bulan ini</span>
              <span className="text-outline">•</span>
              <span className="text-primary font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[16px]">thumb_up</span> 99% puas
              </span>
            </div>

            {/* Tiered Price Card */}
            <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 border border-surface-container-highest/60">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                <span className="text-sm text-on-surface-variant">/ {product.unit} (eceran)</span>
              </div>

              {/* Reseller Tier Highlight Box */}
              <div className="bg-secondary-fixed/25 rounded-lg p-3.5 flex items-start gap-3 border border-secondary-fixed/50">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-secondary">
                  <span className="material-symbols-outlined text-[20px]">stars</span>
                </div>
                <div className="flex flex-col text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-secondary">Harga Khusus Reseller Florist:</span>
                    <span className="font-bold text-primary text-base font-headline">
                      Rp {product.resellerPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Hemat 20%
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] mt-0.5 leading-relaxed">
                    Daftar akun Reseller Florist terverifikasi untuk unlock harga grosir koli (120 tangkai) &amp; karton box.
                  </p>
                </div>
              </div>
            </div>

            {/* Color Variant Selector */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-on-surface font-semibold">
                  Pilihan Warna: <span className="text-primary font-bold">{selectedColor}</span>
                </label>
                <span className="text-xs text-outline">{product.colors.length} Pilihan Tersedia</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'border-2 border-primary bg-primary/10 text-on-surface font-bold shadow-xs'
                          : 'border border-surface-container-highest hover:border-primary bg-surface-container-lowest text-on-surface-variant'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full inline-block shadow-xs border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name.split(' ')[0]}</span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          check_circle
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Warehouse Stock Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface font-semibold">Jumlah:</span>
                <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-surface-container-highest/60">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Kurangi jumlah"
                    className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest rounded hover:bg-surface-container text-primary transition-colors font-bold text-sm"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={product.stock}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                    className="w-12 text-center bg-transparent border-0 font-bold text-sm text-on-surface focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    aria-label="Tambah jumlah"
                    className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest rounded hover:bg-surface-container text-primary transition-colors font-bold text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-outline">{product.unit}</span>
              </div>

              {/* Stock Pill */}
              <div className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>
                  Stok Real-time: <strong>{product.stock} {product.unit}</strong> di Surabaya
                </span>
              </div>
            </div>

            {/* Primary Action CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-surface-container-lowest border-2 border-primary text-primary hover:bg-surface-container-low font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                <span>Tambah ke Keranjang</span>
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-primary-container text-white hover:bg-primary font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                <span>Beli Sekarang</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>

            {/* Wishlist & Share Utilities */}
            <div className="flex items-center justify-between pt-1 text-xs text-on-surface-variant">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 hover:text-primary transition-colors group cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined text-[18px] transition-colors ${
                    isFavorited ? 'text-error' : 'group-hover:text-error'
                  }`}
                  style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
                <span>
                  Simpan ke Wishlist <span className="text-outline font-normal">(412 difavoritkan)</span>
                </span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>Bagikan Produk</span>
              </button>
            </div>

            {/* Trust Badges Strip (4 Mini Value Props) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-surface-container-highest/50">
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center gap-1 border border-surface-container-highest/40">
                <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                <span className="text-xs font-semibold text-on-surface">Kirim Hari Ini</span>
                <span className="text-[10px] text-outline">Order sblm 14:00</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center gap-1 border border-surface-container-highest/40">
                <span className="material-symbols-outlined text-primary text-[20px]">published_with_changes</span>
                <span className="text-xs font-semibold text-on-surface">Garansi Retur</span>
                <span className="text-[10px] text-outline">7 Hari jika cacat</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center gap-1 border border-surface-container-highest/40">
                <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                <span className="text-xs font-semibold text-on-surface">Silk Grade A</span>
                <span className="text-[10px] text-outline">Pewarnaan awet</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col items-center text-center gap-1 border border-surface-container-highest/40">
                <span className="material-symbols-outlined text-primary text-[20px]">security</span>
                <span className="text-xs font-semibold text-on-surface">Pembayaran Aman</span>
                <span className="text-[10px] text-outline">BCA/Mandiri/QRIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Specifications, Description & Reviews Tabs */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-10 bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Interactive Tab Header */}
          <div className="flex items-center gap-2 border-b border-surface-container-highest pb-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('deskripsi')}
              className={`px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'deskripsi'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>Deskripsi Produk</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spesifikasi')}
              className={`px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'spesifikasi'
                  ? 'bg-primary-container text-white font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Spesifikasi Teknis</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ulasan')}
              className={`px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'ulasan'
                  ? 'bg-primary-container text-white font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Ulasan Pembeli (127)</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-xs border border-surface-container-highest/60">
            {/* PANEL 1: DESKRIPSI */}
            {activeTab === 'deskripsi' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 flex flex-col gap-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  <h3 className="font-headline text-xl text-on-surface font-semibold">
                    Tekstur Kelopak Halus dengan Pewarnaan Gradasi Alami
                  </h3>
                  <p>
                    Bunga Daisy Artificial Premium varian Merah (RED) dari BlueWater Flowers diimpor langsung dari sentra floral Yiwu, China. Dibuat menggunakan perpaduan material silk fabric dan high-density latex berkualitas tinggi yang menghasilkan kelopak dengan tekstur alami yang lentur serta warna merah pekat yang tidak mudah pudar. Sangat ideal untuk buket wisuda, dekorasi wedding backdrop, hiasan hampers imlek/natal, serta rangkaian meja café dan hotel.
                  </p>
                  <p>
                    Keunggulan untuk Florist &amp; Reseller: Batang kawat dilapisi floral tape fleksibel yang mudah dipotong, ditekuk, dan dirangkai tanpa merusak tangkai. Tahan air, tahan kelembaban tropis, dan tidak akan rontok saat proses ekspedisi pengiriman jarak jauh ke seluruh Nusantara.
                  </p>

                  {/* Florist Key Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/40">
                      <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">
                        check_circle
                      </span>
                      <span className="text-xs text-on-surface font-medium">
                        Material kelopak: Silk fabric grade A dengan pewarnaan berlapis
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/40">
                      <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">
                        check_circle
                      </span>
                      <span className="text-xs text-on-surface font-medium">
                        Tahan lama bertahun-tahun tanpa perawatan atau penyiraman khusus
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/40">
                      <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">
                        check_circle
                      </span>
                      <span className="text-xs text-on-surface font-medium">
                        Batang fleksibel kawat baja elastis mudah ditekuk untuk wrapping
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/40">
                      <span className="material-symbols-outlined text-primary text-[18px] flex-shrink-0">
                        check_circle
                      </span>
                      <span className="text-xs text-on-surface font-medium">
                        Kemasan koli aman dilapisi bubble wrap tebal anti-penyok
                      </span>
                    </div>
                  </div>
                </div>

                {/* Side Infographic Card for Florists */}
                <div className="lg:col-span-4 bg-surface-container-low p-5 rounded-xl flex flex-col gap-3 border border-surface-container-highest/60">
                  <span className="text-[11px] text-secondary uppercase tracking-wider font-bold">
                    Rekomendasi Rangkaian
                  </span>
                  <h4 className="font-semibold text-sm text-on-surface">Ide Buket Florist:</h4>
                  <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span>Kombinasikan dengan <strong>Baby Breath</strong> putih sebagai filler lembut.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span>Gunakan <strong>Cellophane Matte Hitam atau Tiffany Blue</strong> untuk kontras dramatis.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span>Sematkan <strong>Pita Satin Emas / Krim 2.5cm</strong> sebagai pemanis ikatan tangkai.</span>
                    </li>
                  </ul>
                  <div className="pt-3 mt-auto border-t border-surface-container-highest">
                    <button
                      onClick={() => navigateTo('katalog')}
                      className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
                    >
                      <span>Lihat Koleksi Wrapping &amp; Pita Lengkap</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 2: SPESIFIKASI TEKNIS */}
            {activeTab === 'spesifikasi' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-lg text-on-surface font-semibold">
                    Spesifikasi Detail Produk
                  </h3>
                  <span className="text-xs text-outline font-medium">Standar Industri Floral Yiwu</span>
                </div>
                <div className="overflow-hidden rounded-lg border border-surface-container-highest">
                  <table className="w-full text-left text-xs">
                    <tbody>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary w-1/3 bg-surface-container-low/50">
                          Komposisi Material
                        </th>
                        <td className="py-3 px-4 text-on-surface">{product.specs.material}</td>
                      </tr>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Dimensi Panjang Total
                        </th>
                        <td className="py-3 px-4 text-on-surface">{product.specs.height} (dapat dipotong dengan tang florist)</td>
                      </tr>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Diameter Kepala Bunga
                        </th>
                        <td className="py-3 px-4 text-on-surface">{product.specs.diameter}</td>
                      </tr>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Berat Bersih
                        </th>
                        <td className="py-3 px-4 text-on-surface">{product.specs.weight} (1 kg muat hingga 20 tangkai)</td>
                      </tr>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Pilihan Varian Warna
                        </th>
                        <td className="py-3 px-4 text-on-surface">
                          {product.colors.map((c) => c.name).join(', ')}
                        </td>
                      </tr>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Satuan Jual
                        </th>
                        <td className="py-3 px-4 text-on-surface">{product.specs.packageQty}</td>
                      </tr>
                      <tr className="bg-surface-container-lowest border-b border-surface-container-highest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Minimal Pembelian
                        </th>
                        <td className="py-3 px-4 text-on-surface">1 {product.unit} (Tanpa minimum pembelian)</td>
                      </tr>
                      <tr className="bg-surface-container-lowest">
                        <th className="py-3 px-4 font-semibold text-primary bg-surface-container-low/50">
                          Asal Pabrikasi
                        </th>
                        <td className="py-3 px-4 text-on-surface">{product.specs.origin}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PANEL 3: ULASAN PEMBELI */}
            {activeTab === 'ulasan' && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-surface-container-highest">
                  {/* Numerical Score Block */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-xl text-center border border-surface-container-highest/40">
                    <span className="font-headline text-5xl text-primary font-bold leading-none">4.8</span>
                    <div className="flex text-secondary my-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium">
                      Berdasarkan 127 ulasan florist terverifikasi
                    </span>
                  </div>

                  {/* Star Bars Breakdown */}
                  <div className="lg:col-span-8 flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-14 text-on-surface font-medium">5 Bintang</span>
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[88%]" />
                      </div>
                      <span className="w-10 text-right font-mono text-outline font-semibold">112</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-14 text-on-surface font-medium">4 Bintang</span>
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[10%]" />
                      </div>
                      <span className="w-10 text-right font-mono text-outline font-semibold">12</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-14 text-on-surface font-medium">3 Bintang</span>
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full w-[2%]" />
                      </div>
                      <span className="w-10 text-right font-mono text-outline font-semibold">3</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-14 text-on-surface font-medium">2 Bintang</span>
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-outline rounded-full w-[0%]" />
                      </div>
                      <span className="w-10 text-right font-mono text-outline font-semibold">0</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-14 text-on-surface font-medium">1 Bintang</span>
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-error rounded-full w-[0%]" />
                      </div>
                      <span className="w-10 text-right font-mono text-outline font-semibold">0</span>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="flex flex-col gap-4">
                  {/* Review 1 */}
                  <div className="p-4 rounded-xl bg-surface-container-low/40 flex flex-col gap-2 border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          RM
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-on-surface">Rina Melati</span>
                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">verified</span> Verified Florist Bandung
                            </span>
                          </div>
                          <span className="text-[11px] text-outline">3 hari lalu · Pembelian: 24 tangkai</span>
                        </div>
                      </div>
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "Warna merahnya mewah banget, bukan merah norak. Kelopaknya tebal dan tidak ada sisa lem belepotan di sela-sela kelopak seperti bunga artificial murah. Bakal langganan terus buat buket graduation di studio florist kami."
                    </p>
                  </div>

                  {/* Review 2 */}
                  <div className="p-4 rounded-xl bg-surface-container-low/40 flex flex-col gap-2 border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-xs">
                          HG
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-on-surface">Hendra Gunawan</span>
                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">verified</span> Reseller Dekor Solo
                            </span>
                          </div>
                          <span className="text-[11px] text-outline">1 minggu lalu · Pembelian: 100 tangkai</span>
                        </div>
                      </div>
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "Ambil 100 tangkai kemarin untuk stok event wedding, packaging aman banget dan bunga tidak gepeng sama sekali. Reseller dapat harga spesial, margin untung lumayan! Pengiriman via kargo darat cepat sampai Solo."
                    </p>
                  </div>

                  {/* Review 3 */}
                  <div className="p-4 rounded-xl bg-surface-container-low/40 flex flex-col gap-2 border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          CW
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-on-surface">Clara Wijaya</span>
                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">verified</span> Wedding Organizer Tangerang
                            </span>
                          </div>
                          <span className="text-[11px] text-outline">2 minggu lalu · Pembelian: 36 tangkai</span>
                        </div>
                      </div>
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "Teksturnya sangat mirip daisy asli kalau dilihat dari jarak 1 meter. Tamu undangan mengira ini bunga hidup segar. Sukses besar untuk dekorasi photobooth pesta kemarin."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related & Complementary Products Grid */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-16 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-container-highest pb-4">
            <div>
              <span className="text-xs text-secondary uppercase font-bold tracking-widest">
                Rekomendasi Florist Pro
              </span>
              <h2 className="font-headline text-2xl text-on-surface font-semibold tracking-tight mt-0.5">
                Produk Terkait &amp; Perlengkapan Pelengkap
              </h2>
            </div>
            <button
              onClick={() => navigateTo('katalog')}
              className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
            >
              <span>Lihat Semua Koleksi Aksesoris</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* 4 Card Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct, idx) => (
              <div
                key={relProduct.id}
                className="bg-surface-container-lowest rounded-xl border border-surface-container-highest/70 overflow-hidden hover:shadow-md transition-all group flex flex-col"
              >
                <div
                  onClick={() => navigateTo('detail', undefined, relProduct.id)}
                  className="relative aspect-square bg-surface-container-low overflow-hidden cursor-pointer flex items-center justify-center p-3"
                >
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                  />
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                      idx === 0
                        ? 'bg-secondary text-white'
                        : idx === 1
                        ? 'bg-primary text-white'
                        : idx === 2
                        ? 'bg-secondary-fixed text-on-secondary-container'
                        : 'bg-surface-container-high text-primary font-bold'
                    }`}
                  >
                    {idx === 0 ? 'BEST MATCH' : idx === 1 ? 'GROSIR' : idx === 2 ? 'DRIED' : 'BARU'}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-outline uppercase font-semibold">
                      {relProduct.category}
                    </span>
                    <h3
                      onClick={() => navigateTo('detail', undefined, relProduct.id)}
                      className="font-semibold text-xs text-on-surface group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
                    >
                      {relProduct.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest/60">
                    <div>
                      <span className="text-xs text-primary font-bold">
                        Rp {relProduct.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-outline block">/ {relProduct.unit}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(relProduct, 1)}
                      aria-label="Beli perlengkapan"
                      className="w-8 h-8 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
