import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateCartQuantity, removeFromCart, showToast } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const freeShippingThreshold = 500000;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const shippingCost = isFreeShipping || cartTotal === 0 ? 0 : 25000;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'BLUEWATER30') {
      setDiscountPercent(30);
      setCouponApplied(true);
      showToast('Kupon Berhasil!', 'Voucher BLUEWATER30 aktif: Diskon 30% diterapkan.');
    } else {
      showToast('Kupon Tidak Valid', 'Gunakan kode BLUEWATER30 untuk diskon 30%.');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(false);
    setCheckoutComplete(true);
    showToast('Pesanan Terkirim!', 'Invoice grosir dan nomor kargo telah dikirim via WhatsApp.');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h2 className="font-headline text-lg font-semibold text-on-surface">Keranjang Grosir Florist</h2>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length} Produk
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Free shipping Progress Meter */}
          <div className="px-5 py-3 bg-primary-container text-on-primary">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-secondary-fixed">local_shipping</span>
                {isFreeShipping ? (
                  <strong className="text-secondary-fixed">Selamat! Anda Dapat Gratis Ongkir</strong>
                ) : (
                  <span>
                    Tambah <strong>Rp {remainingForFreeShipping.toLocaleString('id-ID')}</strong> lagi untuk Gratis Ongkir
                  </span>
                )}
              </span>
              <span>{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-primary/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary-fixed transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-surface-container-highest">
            {checkoutComplete ? (
              <div className="text-center py-12 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="font-headline text-xl text-primary font-bold">Pesanan Terkonfirmasi!</h3>
                <p className="text-sm text-on-surface-variant max-w-xs">
                  Tim Wholesale BlueWater Flowers segera menyiapkan pengemasan kardus koli Anda untuk ekspedisi hari ini.
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-4 px-6 py-2.5 bg-primary-container text-white font-medium text-sm rounded-lg hover:bg-primary transition-colors"
                >
                  Kembali Berbelanja
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-surface-container text-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">remove_shopping_cart</span>
                </div>
                <h3 className="font-headline text-lg text-on-surface font-semibold">Keranjang Belanja Kosong</h3>
                <p className="text-sm text-outline max-w-xs">
                  Pilih bunga artificial, dried flowers, atau cellophane import berkualitas untuk kebutuhan buket Anda.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 flex gap-3 group">
                  <div className="w-20 h-20 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 border border-surface-container-highest flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-medium text-sm text-on-surface leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-outline hover:text-error transition-colors p-0.5"
                          title="Hapus item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-outline font-mono">SKU: {item.product.sku}</span>
                        {item.selectedColor && (
                          <span className="text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-medium">
                            {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-surface-container-highest rounded-lg bg-surface-container-low/70">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm font-bold text-on-surface hover:bg-surface-container rounded-l-lg transition-colors"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm font-bold text-on-surface hover:bg-surface-container rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                        <div className="text-[11px] text-outline">
                          @ Rp {item.product.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {!checkoutComplete && cartItems.length > 0 && (
            <div className="p-5 border-t border-surface-container-highest bg-surface-container-low/30 flex flex-col gap-3">
              {/* Coupon Voucher Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kode voucher: BLUEWATER30"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border border-surface-container-highest rounded-lg px-3 py-2 text-xs uppercase font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs rounded-lg transition-colors"
                >
                  Gunakan
                </button>
              </form>

              {couponApplied && (
                <div className="text-xs text-primary font-semibold flex items-center justify-between bg-primary/10 px-3 py-1.5 rounded-md">
                  <span>Diskon Voucher BLUEWATER30 (30%)</span>
                  <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-on-surface-variant pt-1">
                <div className="flex justify-between">
                  <span>Subtotal Produk ({cartItems.length} item)</span>
                  <span className="font-semibold text-on-surface">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-primary font-medium">
                    <span>Potongan Grosir / Voucher</span>
                    <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim Ekspedisi Kargo</span>
                  <span>{isFreeShipping ? <strong className="text-primary">GRATIS</strong> : `Rp ${shippingCost.toLocaleString('id-ID')}`}</span>
                </div>
                <div className="h-px bg-surface-container-highest pt-1" />
                <div className="flex justify-between text-base font-bold text-on-surface pt-1">
                  <span>Total Tagihan</span>
                  <span className="text-primary font-headline">Rp {finalTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-primary-container hover:bg-primary text-white py-3 rounded-lg font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Lanjut Checkout Ekspedisi</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Quick Checkout Form Modal Overlay inside Drawer */}
          {isCheckingOut && (
            <div className="absolute inset-0 bg-white z-20 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest mb-4">
                  <h3 className="font-headline text-lg font-bold text-on-surface">Data Penerima &amp; Ekspedisi</h3>
                  <button onClick={() => setIsCheckingOut(false)} className="text-outline hover:text-on-surface">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">Nama Florist / Toko Bunga *</label>
                    <input
                      required
                      type="text"
                      defaultValue="Florette Florist Studio"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">WhatsApp Penerima *</label>
                    <input
                      required
                      type="tel"
                      defaultValue="0812-3456-7890"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">Kota &amp; Provinsi Tujuan *</label>
                    <input
                      required
                      type="text"
                      defaultValue="Surabaya, Jawa Timur"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">Pilihan Ekspedisi Kargo *</label>
                    <select className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary cursor-pointer font-medium">
                      <option>Indah Logistik Cargo (Rekomendasi Paket Florist)</option>
                      <option>Dakota Cargo (Dus Besar / Volume Besar)</option>
                      <option>J&amp;T Cargo (Prioritas Cepat Sampai)</option>
                      <option>Baraka Sarana Tama (Jawa-Bali-Sumatera)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">Catatan Tambahan untuk Gudang Packing</label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Tolong dilapisi bubble wrap extra untuk bunga artificial merah."
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 border-t border-surface-container-highest flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 py-2.5 border border-surface-container-highest text-on-surface-variant font-medium text-xs rounded-lg hover:bg-surface-container-low"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-2.5 bg-primary-container text-white font-bold text-xs rounded-lg hover:bg-primary transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Konfirmasi Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
