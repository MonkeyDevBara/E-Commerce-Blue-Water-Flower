import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ResellerModal: React.FC = () => {
  const { isResellerModalOpen, setIsResellerModalOpen, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    city: '',
    whatsapp: '',
    businessType: 'Studio Florist Buket'
  });

  if (!isResellerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Pendaftaran Reseller Berhasil!', 'Akun Reseller Florist Anda telah aktif. Harga grosir tangan pertama Yiwu terbuka.');
  };

  const handleClose = () => {
    setIsResellerModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        {/* Backdrop */}
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <div className="relative inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border border-surface-container-highest z-10">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <span className="font-label-sm text-secondary uppercase font-bold tracking-wider">
                Verifikasi Disetujui
              </span>
              <h3 className="font-headline text-2xl text-on-surface font-bold">
                Selamat Datang di Jaringan Reseller BlueWater!
              </h3>
              <p className="text-sm text-on-surface-variant max-w-sm">
                Halo <strong>{formData.name || 'Florist'}</strong> ({formData.businessName || 'Studio Floral'}), akun Anda sekarang berhak atas diskon koli langsung hingga 40% dan katalog foto siap jual tanpa watermark.
              </p>
              <div className="bg-surface-container-low p-4 rounded-xl text-left w-full text-xs space-y-1.5 mt-2">
                <div className="flex justify-between">
                  <span className="text-outline">ID Reseller:</span>
                  <span className="font-mono font-bold text-primary">BW-RESELLER-7729</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Status Akun:</span>
                  <span className="font-semibold text-primary">✓ Aktif &amp; Terverifikasi Yiwu Direct</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Gudang Dispatch:</span>
                  <span>Gudang Utama Surabaya &amp; Jakarta</span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-full mt-4 bg-primary-container text-white py-3 rounded-lg font-bold text-sm hover:bg-primary transition-colors shadow-sm"
              >
                Mulai Belanja Harga Grosir
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 text-secondary font-label-sm text-xs uppercase font-bold tracking-wider mb-1">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                <span>Program Kemitraan Florist &amp; WO</span>
              </div>
              <h3 className="font-headline text-2xl text-on-surface font-bold tracking-tight">
                Daftar Akun Reseller Grosir
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 mb-5">
                Dapatkan akses langsung ke harga import tangan pertama pabrik Yiwu, China tanpa minimal order per transaksi.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-3 gap-2.5 mb-5 text-center text-xs">
                <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col items-center">
                  <span className="text-lg mb-0.5">💰</span>
                  <span className="font-bold text-primary">Harga Grosir</span>
                  <span className="text-[10px] text-outline">Hemat s/d 40%</span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col items-center">
                  <span className="text-lg mb-0.5">📸</span>
                  <span className="font-bold text-primary">Katalog Bersih</span>
                  <span className="text-[10px] text-outline">Tanpa watermark</span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col items-center">
                  <span className="text-lg mb-0.5">🚚</span>
                  <span className="font-bold text-primary">Prioritas Kargo</span>
                  <span className="text-[10px] text-outline">Kirim hari ini</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-left">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Nama Lengkap Pemilik / PIC *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Anita Rahayu"
                    className="w-full border border-surface-container-highest rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary bg-surface-container-low/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Nama Bisnis / Brand Florist / WO *</label>
                  <input
                    required
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Contoh: Florette Florist &amp; Gifts"
                    className="w-full border border-surface-container-highest rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary bg-surface-container-low/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">Kota / Domisili *</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Contoh: Surabaya"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary bg-surface-container-low/30"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-on-surface mb-1">WhatsApp Bisnis Aktif *</label>
                    <input
                      required
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full border border-surface-container-highest rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary bg-surface-container-low/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Kategori Usaha Floral *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full border border-surface-container-highest rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-primary bg-surface-container-low/30 cursor-pointer font-medium"
                  >
                    <option>Studio Florist Buket Wisuda &amp; Hadiah</option>
                    <option>Wedding Organizer &amp; Event Decorator</option>
                    <option>Toko Perlengkapan Bunga &amp; Craft Offline</option>
                    <option>Online Floral Dropshipper &amp; Reseller</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary-container text-white hover:bg-primary py-3 rounded-lg font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>Aktifkan Akun Reseller Sekarang</span>
                  </button>
                  <p className="text-[11px] text-outline text-center mt-2">
                    Gratis tanpa biaya pendaftaran · Langsung aktif dalam hitungan detik
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
