"use client";

import React, { useState } from "react";
import { StoreSettings } from "@/data/storeSettings";
import { ProductVariant, YellofContact } from "@/data/products";
import { Order } from "@/data/orders";
import {
  Settings,
  Store,
  Megaphone,
  Coffee,
  Database,
  Save,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

interface AdminMasterSettingsProps {
  settings: StoreSettings;
  products: ProductVariant[];
  orders: Order[];
  contact: YellofContact;
  onSaveSettings: (settings: StoreSettings) => void;
  onResetSettings: () => void;
  onRestoreAllData: (data: { products?: ProductVariant[]; orders?: Order[]; settings?: StoreSettings; contact?: YellofContact }) => void;
}

export const AdminMasterSettings: React.FC<AdminMasterSettingsProps> = ({
  settings,
  products,
  orders,
  contact,
  onSaveSettings,
  onResetSettings,
  onRestoreAllData,
}) => {
  const [formData, setFormData] = useState<StoreSettings>(JSON.parse(JSON.stringify(settings)));
  const [newGrindOption, setNewGrindOption] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleAddGrind = () => {
    if (!newGrindOption.trim()) return;
    setFormData({
      ...formData,
      availableGrindOptions: [...formData.availableGrindOptions, newGrindOption.trim()],
    });
    setNewGrindOption("");
  };

  const handleRemoveGrind = (index: number) => {
    const updated = formData.availableGrindOptions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      availableGrindOptions: updated,
    });
  };

  // Full Backup of Website (Products, Orders, Settings, Contact)
  const handleExportFullBackup = () => {
    const backupData = {
      backupDate: new Date().toISOString(),
      storeName: formData.storeName,
      products,
      orders,
      settings: formData,
      contact,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `yellof_coffee_full_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Restore Full Backup
  const handleImportFullBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && (parsed.products || parsed.orders || parsed.settings || parsed.contact)) {
          if (confirm("Yakin ingin memulihkan seluruh data (produk, pesanan, & pengaturan) dari file backup ini?")) {
            onRestoreAllData(parsed);
            if (parsed.settings) {
              setFormData(parsed.settings);
            }
            alert("✅ Seluruh data berhasil dipulihkan dari backup!");
          }
        } else {
          alert("❌ File backup JSON tidak valid atau format tidak sesuai.");
        }
      } catch {
        alert("❌ Gagal membaca file backup JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-base sm:text-lg font-bold text-white">Master Setting & Operasional Toko</h2>
          </div>
          <p className="text-[11px] sm:text-xs text-[#A39688] mt-0.5">
            Konfigurasi banner promo, opsi gilingan, status toko, dan backup seluruh data.
          </p>
        </div>

        {isSavedNotice && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" /> Pengaturan Tersimpan!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Operasional & Status Toko */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#2A211B]">
            <Store className="w-4 h-4 text-[#FFC72C]" />
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Status Operasional & Nama Toko
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider block">
                Nama Brand / Toko:
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#FFC72C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider block">
                Status Operasional Toko:
              </label>
              <select
                value={formData.storeStatus}
                onChange={(e) => setFormData({ ...formData, storeStatus: e.target.value as "open" | "busy" | "closed" })}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#FFC72C]"
              >
                <option value="open">🟢 Toko Buka (Menerima Pesanan)</option>
                <option value="busy">🟡 Sibuk / Sedang Roasting Kopi</option>
                <option value="closed">🔴 Tutup Sementara / Libur</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider block">
              Catatan Status Operasional:
            </label>
            <input
              type="text"
              value={formData.statusNotice || ""}
              onChange={(e) => setFormData({ ...formData, statusNotice: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
              placeholder="Contoh: Pengiriman setiap hari kerja sebelum jam 16.00 WIB"
            />
          </div>
        </div>

        {/* Section 2: Promo Banner Global */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#2A211B]">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#FFC72C]" />
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Banner Promo / Pengumuman
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-[#A39688]">Tampilkan Banner:</span>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, enablePromoBanner: !formData.enablePromoBanner })}
                className={`relative w-11 h-5.5 rounded-full transition-colors ${
                  formData.enablePromoBanner ? "bg-[#FFC72C]" : "bg-[#2A211B]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${
                    formData.enablePromoBanner ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider block">
              Teks Pengumuman Promo:
            </label>
            <textarea
              rows={2}
              value={formData.promoBannerText}
              onChange={(e) => setFormData({ ...formData, promoBannerText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
              placeholder="Tulis pesan promo atau info diskon..."
            />
          </div>
        </div>

        {/* Section 3: Konfigurasi Opsi Gilingan Kopi */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#2A211B]">
            <Coffee className="w-4 h-4 text-[#FFC72C]" />
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Daftar Opsi Gilingan Kopi
            </h3>
          </div>

          <p className="text-[11px] text-[#A39688]">
            Opsi gilingan ini akan muncul saat pelanggan memesan kopi di website utama maupun saat admin mencatat pesanan manual.
          </p>

          <div className="space-y-2">
            {formData.availableGrindOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0807] border border-[#2A211B]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A1412] text-[#FFC72C] text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-white">{opt}</span>
                </div>
                {formData.availableGrindOptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveGrind(idx)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add new grind option */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Tambah opsi gilingan baru (misal: Cold Brew Coarse Grind)"
              value={newGrindOption}
              onChange={(e) => setNewGrindOption(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/30 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
            />
            <button
              type="button"
              onClick={handleAddGrind}
              className="px-4 py-2 rounded-xl bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-xs font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Tambah
            </button>
          </div>
        </div>

        {/* Section 4: Backup & Restore Seluruh Website */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#2A211B]">
            <Database className="w-4 h-4 text-[#FFC72C]" />
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Backup & Pemulihan Seluruh Data
            </h3>
          </div>

          <p className="text-[11px] text-[#A39688]">
            Unduh salinan cadangan lengkap yang mencakup seluruh Produk, Riwayat Pesanan, Pengaturan Toko, dan Kontak WhatsApp dalam 1 file JSON aman.
          </p>

          <div className="flex items-center gap-3 flex-wrap pt-1">
            <button
              type="button"
              onClick={handleExportFullBackup}
              className="px-4 py-2.5 rounded-xl bg-[#1A1412] hover:bg-[#2A211B] border border-[#DAA520]/40 text-[#FFC72C] text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Unduh Full Backup (JSON)
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-[#1A1412] hover:bg-[#2A211B] border border-[#DAA520]/40 text-[#FFC72C] text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Pulihkan dari Backup JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImportFullBackup}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                if (confirm("Reset semua pengaturan master toko ke default?")) {
                  onResetSettings();
                  setFormData(JSON.parse(JSON.stringify(settings)));
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-[#1A1412] hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Pengaturan
            </button>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(255,199,44,0.3)] hover:scale-[1.02] transition-transform"
          >
            <Save className="w-4 h-4" />
            Simpan Semua Pengaturan
          </button>
        </div>

      </form>

    </div>
  );
};
