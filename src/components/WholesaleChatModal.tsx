import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const WholesaleChatModal: React.FC = () => {
  const { isWholesaleChatOpen, setIsWholesaleChatOpen, showToast } = useApp();
  const [productType, setProductType] = useState('Bunga Artificial Silk (Koli Box)');
  const [estVolume, setEstVolume] = useState('10 - 25 Koli (Dus)');
  const [sent, setSent] = useState(false);

  if (!isWholesaleChatOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Permintaan Kargo Diterima', 'Konsultan kargo import Yiwu BlueWater akan segera menghubungi WhatsApp Anda.');
  };

  const handleClose = () => {
    setIsWholesaleChatOpen(false);
    setSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <div onClick={handleClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

        <div className="relative inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border border-surface-container-highest z-10">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {sent ? (
            <div className="py-6 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">support_agent</span>
              </div>
              <h3 className="font-headline text-xl text-on-surface font-bold">Sales Wholesale Segera Merespon!</h3>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Penawaran harga kontainer CIF/FOB dan kargo ekspedisi darat-laut telah disiapkan untuk kebutuhan {productType} Anda.
              </p>
              <a
                href="https://wa.me/6281288997722"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:opacity-90"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Buka WhatsApp Langsung (+62 812-8899-7722)
              </a>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>Pemesanan Koli &amp; Kontainer FCL</span>
              </div>
              <h3 className="font-headline text-2xl text-on-surface font-bold">
                Konsultasi Kargo Wholesale Yiwu
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 mb-4">
                Dapatkan diskon tiered hingga 38% langsung dari sentra pabrik Yiwu, China untuk pembelian partai besar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Jenis Kategori Kebutuhan</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary font-medium"
                  >
                    <option>Bunga Artificial Silk (Koli Box / Karton)</option>
                    <option>Cellophane &amp; Korean Wrapping (Dus 60-100 pack)</option>
                    <option>Pita Satin &amp; Hologram (Dus 50-100 roll)</option>
                    <option>Dried Flowers Preserved (Koli Partai Besar)</option>
                    <option>Campuran Full 1 Kontainer 20ft / 40ft FCL</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">Estimasi Volume Pesanan</label>
                  <select
                    value={estVolume}
                    onChange={(e) => setEstVolume(e.target.value)}
                    className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary font-medium"
                  >
                    <option>5 - 10 Koli Dus (Diskon Tier 1: -20%)</option>
                    <option>10 - 25 Koli Dus (Diskon Tier 2: -28%)</option>
                    <option>&gt; 25 Koli / LCL Ekspedisi Laut (Diskon Tier 3: -35%)</option>
                    <option>1 Kontainer FCL Pabrik Yiwu (Diskon Max: -38% + Custom Logo)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">Nama PIC</label>
                    <input
                      required
                      type="text"
                      placeholder="Nama Anda"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">No WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="0812-xxxx-xxxx"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">Kota Tujuan Pengiriman Kargo</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Surabaya, Jakarta, Medan, Makassar"
                    className="w-full border border-surface-container-highest rounded-lg p-2.5 bg-surface-container-low/40 focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary-container text-white py-3 rounded-lg font-bold text-xs hover:bg-primary transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Hubungkan ke Tim Wholesale Sekarang
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
