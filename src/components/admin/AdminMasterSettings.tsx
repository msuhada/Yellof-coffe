"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  StoreSettings,
  GalleryPhotoItem,
  KeunggulanCardItem,
  DEFAULT_STORE_SETTINGS,
  normalizeStoreSettings,
} from "@/data/storeSettings";
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
  Image as ImageIcon,
  Layers,
  Award,
  FileText,
  Eye,
  Check,
  X,
  MapPin,
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
  const [formData, setFormData] = useState<StoreSettings>(() => normalizeStoreSettings(settings));
  const [activeSubTab, setActiveSubTab] = useState<"general" | "about" | "gallery" | "keunggulan" | "hero" | "backup">("about");
  const [newGrindOption, setNewGrindOption] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Sync if settings from props update
  useEffect(() => {
    if (settings) {
      setFormData(normalizeStoreSettings(settings));
    }
  }, [settings]);

  // Safe defaults
  const about = formData.about || DEFAULT_STORE_SETTINGS.about;
  const hero = formData.hero || DEFAULT_STORE_SETTINGS.hero;
  const gallery = Array.isArray(formData.gallery) && formData.gallery.length > 0 ? formData.gallery : DEFAULT_STORE_SETTINGS.gallery;
  const keunggulan = formData.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;
  const grindOptions = Array.isArray(formData.availableGrindOptions) ? formData.availableGrindOptions : DEFAULT_STORE_SETTINGS.availableGrindOptions;

  // Helper for image upload (FileReader to Base64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onResult: (base64Url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("⚠️ Ukuran foto maksimal 4MB agar performa website tetap cepat.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onResult(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanSettings = normalizeStoreSettings(formData);
    onSaveSettings(cleanSettings);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  // Grind options handlers
  const handleAddGrind = () => {
    if (!newGrindOption.trim()) return;
    setFormData((prev) => ({
      ...prev,
      availableGrindOptions: [...(prev.availableGrindOptions || []), newGrindOption.trim()],
    }));
    setNewGrindOption("");
  };

  const handleRemoveGrind = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      availableGrindOptions: (prev.availableGrindOptions || []).filter((_, i) => i !== index),
    }));
  };

  // About checklist handlers
  const handleAddAboutFeature = () => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...(prev.about || DEFAULT_STORE_SETTINGS.about),
        features: [...(prev.about?.features || DEFAULT_STORE_SETTINGS.about.features), "Keunggulan baru"],
      },
    }));
  };

  const handleUpdateAboutFeature = (index: number, val: string) => {
    setFormData((prev) => {
      const currentAbout = prev.about || DEFAULT_STORE_SETTINGS.about;
      const updated = [...(currentAbout.features || [])];
      updated[index] = val;
      return {
        ...prev,
        about: { ...currentAbout, features: updated },
      };
    });
  };

  const handleRemoveAboutFeature = (index: number) => {
    setFormData((prev) => {
      const currentAbout = prev.about || DEFAULT_STORE_SETTINGS.about;
      const updated = (currentAbout.features || []).filter((_, i) => i !== index);
      return {
        ...prev,
        about: { ...currentAbout, features: updated },
      };
    });
  };

  // Gallery handlers
  const handleUpdateGalleryPhoto = (index: number, field: keyof GalleryPhotoItem, value: string) => {
    setFormData((prev) => {
      const currentGallery = Array.isArray(prev.gallery) && prev.gallery.length > 0 ? prev.gallery : DEFAULT_STORE_SETTINGS.gallery;
      const updated = [...currentGallery];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        gallery: updated,
      };
    });
  };

  // Keunggulan card handlers
  const handleUpdateKeunggulanCard = (index: number, field: keyof KeunggulanCardItem, value: string) => {
    setFormData((prev) => {
      const currentKeunggulan = prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;
      const updatedCards = [...(currentKeunggulan.cards || DEFAULT_STORE_SETTINGS.keunggulan.cards)];
      updatedCards[index] = { ...updatedCards[index], [field]: value };
      return {
        ...prev,
        keunggulan: { ...currentKeunggulan, cards: updatedCards },
      };
    });
  };

  // Keunggulan checklist handlers
  const handleAddKeunggulanChecklist = () => {
    setFormData((prev) => {
      const currentKeunggulan = prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;
      return {
        ...prev,
        keunggulan: {
          ...currentKeunggulan,
          checklist: [...(currentKeunggulan.checklist || []), "Poin mutu baru"],
        },
      };
    });
  };

  const handleUpdateKeunggulanChecklist = (index: number, val: string) => {
    setFormData((prev) => {
      const currentKeunggulan = prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;
      const updated = [...(currentKeunggulan.checklist || [])];
      updated[index] = val;
      return {
        ...prev,
        keunggulan: { ...currentKeunggulan, checklist: updated },
      };
    });
  };

  const handleRemoveKeunggulanChecklist = (index: number) => {
    setFormData((prev) => {
      const currentKeunggulan = prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;
      const updated = (currentKeunggulan.checklist || []).filter((_, i) => i !== index);
      return {
        ...prev,
        keunggulan: { ...currentKeunggulan, checklist: updated },
      };
    });
  };

  // Full Backup
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
    downloadAnchor.setAttribute("download", `yellof_full_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Full Restore
  const handleImportFullBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && (parsed.products || parsed.orders || parsed.settings || parsed.contact)) {
          if (confirm("Yakin ingin memulihkan seluruh data dan pengaturan dari file backup ini?")) {
            onRestoreAllData(parsed);
            if (parsed.settings) {
              setFormData(normalizeStoreSettings(parsed.settings));
            }
            alert("✅ Seluruh data & gambar berhasil dipulihkan dari backup!");
          }
        } else {
          alert("❌ File backup JSON tidak valid.");
        }
      } catch {
        alert("❌ Gagal membaca file backup JSON.");
      }
    };
    reader.readAsText(file);
  };

  // Subtabs configuration
  const subTabs = [
    { id: "about" as const, label: "🖼️ Tentang Kami", desc: "Foto Perkebunan & Kisah" },
    { id: "gallery" as const, label: "📸 Galeri Foto Kopi", desc: "4 Kartu Foto Produk" },
    { id: "keunggulan" as const, label: "⭐ Keunggulan", desc: "Foto Buah Kopi & 4 Kartu" },
    { id: "hero" as const, label: "🌟 Hero Banner", desc: "Headline & Gambar Utama" },
    { id: "general" as const, label: "🏪 Toko & Promo", desc: "Banner Marquee & Status" },
    { id: "backup" as const, label: "💾 Backup Data", desc: "Ekspor / Impor JSON" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 1. Header with Save button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-base sm:text-lg font-bold text-white">Master Setting & Kustomisasi Media</h2>
          </div>
          <p className="text-[11px] sm:text-xs text-[#A39688] mt-0.5">
            Ganti foto perkebunan, galeri produk, gambar keunggulan, teks narasi, banner promo, dan status toko.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSavedNotice && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Tersimpan!
            </div>
          )}
          <button
            onClick={() => handleSave()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,199,44,0.3)] hover:scale-[1.02] transition-transform"
          >
            <Save className="w-4 h-4" />
            Simpan Semua Perubahan
          </button>
        </div>
      </div>

      {/* 2. Subtab Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {subTabs.map((st) => {
          const isActive = activeSubTab === st.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveSubTab(st.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-[#1C1510] border-[#FFC72C] text-[#FFC72C] shadow-[0_0_15px_rgba(255,199,44,0.15)] scale-[1.02]"
                  : "bg-[#0F0C0A] border-[#2A211B] text-[#A39688] hover:text-white hover:border-[#DAA520]/40"
              }`}
            >
              <div className="text-xs sm:text-sm font-bold truncate">{st.label}</div>
              <div className="text-[9px] sm:text-[10px] text-[#6B5D4F] truncate mt-0.5">{st.desc}</div>
            </button>
          );
        })}
      </div>

      {/* 3. SUBTAB CONTENTS */}
      <div className="space-y-6">
        
        {/* SUBTAB A: TENTANG KAMI */}
        {activeSubTab === "about" && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A211B]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Pengaturan Gambar & Teks: Tentang Kami
                </h3>
              </div>
              <span className="text-[10px] text-[#A39688]">Section Halaman Utama</span>
            </div>

            {/* Foto Perkebunan */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                1. Foto Perkebunan Kopi (Tentang Kami):
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Live Image Preview */}
                <div className="relative w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden border-2 border-[#DAA520]/40 shrink-0 bg-[#14100E]">
                  <Image
                    src={about.image || "/images/pasaman_plantation.png"}
                    alt="Preview Tentang Kami"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Upload & URL Controls */}
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="px-4 py-2 rounded-xl bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Foto Baru dari Perangkat
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, (base64) => setFormData((prev) => ({
                          ...prev,
                          about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), image: base64 }
                        })))}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({
                        ...prev,
                        about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), image: "/images/pasaman_plantation.png" }
                      }))}
                      className="px-3 py-2 rounded-xl bg-[#14100E] border border-[#2A211B] text-[#A39688] hover:text-white text-xs"
                    >
                      Gunakan Foto Asli Pasaman
                    </button>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-[#A39688]">Atau masukkan URL gambar:</span>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={about.image}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), image: e.target.value }
                      }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                    />
                  </div>
                </div>
              </div>

              {/* Location Badge text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Teks Label Lokasi:
                  </label>
                  <input
                    type="text"
                    value={about.locationTitle}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), locationTitle: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Keterangan Ketinggian Lahan:
                  </label>
                  <input
                    type="text"
                    value={about.locationSubtitle}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), locationSubtitle: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>
            </div>

            {/* Teks Narasi Tentang Kami */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                2. Judul & Narasi Cerita Kopi:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A39688] uppercase block">Badge Atas:</label>
                  <input
                    type="text"
                    value={about.badge}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), badge: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A39688] uppercase block">Judul Baris 1:</label>
                  <input
                    type="text"
                    value={about.title}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), title: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A39688] uppercase block">Highlight Emas (Baris 2):</label>
                  <input
                    type="text"
                    value={about.titleHighlight}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), titleHighlight: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-[#FFC72C] font-bold text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A39688] uppercase block">Paragraf Pembuka:</label>
                <textarea
                  rows={2}
                  value={about.description1}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), description1: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A39688] uppercase block">Paragraf Detail Kualitas:</label>
                <textarea
                  rows={2}
                  value={about.description2}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    about: { ...(prev.about || DEFAULT_STORE_SETTINGS.about), description2: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
              </div>
            </div>

            {/* Checklist Keunggulan Poin Tentang Kami */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                  3. Poin Keunggulan Checklist Tentang Kami:
                </label>
                <button
                  type="button"
                  onClick={handleAddAboutFeature}
                  className="px-3 py-1 rounded-lg bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3" /> Tambah Poin
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(about.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-[#A39688] font-bold w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleUpdateAboutFeature(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                    />
                    {(about.features || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAboutFeature(idx)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB B: GALERI FOTO KOPI (4 FOTO) */}
        {activeSubTab === "gallery" && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A211B]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Pengaturan 4 Foto Galeri Seri Kopi Pasaman
                </h3>
              </div>
              <span className="text-[10px] text-[#A39688]">Tampil di Samping Form Order</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gallery.map((photo, idx) => (
                <div key={photo.id || idx} className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFC72C] uppercase">
                      Kartu Foto #{idx + 1}
                    </span>
                  </div>

                  {/* Thumbnail & Upload */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden border border-[#DAA520]/30 shrink-0 bg-[#14100E]">
                      <Image
                        src={photo.src || "/images/grid_1_hot_ceramic.jpg"}
                        alt={photo.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <label className="px-3 py-1.5 rounded-lg bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all">
                        <Upload className="w-3 h-3" />
                        Ganti Foto
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, (base64) => handleUpdateGalleryPhoto(idx, "src", base64))}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Atau masukkan URL gambar..."
                        value={photo.src}
                        onChange={(e) => handleUpdateGalleryPhoto(idx, "src", e.target.value)}
                        className="w-full px-2.5 py-1 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-[10px] focus:outline-none focus:border-[#FFC72C]"
                      />
                    </div>
                  </div>

                  {/* Title & Caption */}
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-[#A39688] uppercase block">Judul Foto:</label>
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => handleUpdateGalleryPhoto(idx, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs font-bold focus:outline-none focus:border-[#FFC72C]"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-[#A39688] uppercase block">Keterangan / Caption:</label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => handleUpdateGalleryPhoto(idx, "caption", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-[#D1C7BD] text-xs focus:outline-none focus:border-[#FFC72C]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB C: KEUNGGULAN */}
        {activeSubTab === "keunggulan" && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A211B]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Pengaturan Gambar & Teks: Keunggulan Kopi
                </h3>
              </div>
              <span className="text-[10px] text-[#A39688]">Section Keunggulan Produk</span>
            </div>

            {/* Foto Buah Kopi & Quote */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                1. Foto Buah Kopi Petik Merah:
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-[#DAA520]/40 shrink-0 bg-[#14100E]">
                  <Image
                    src={keunggulan.image || "/images/coffee_cherries.png"}
                    alt="Preview Keunggulan"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="px-4 py-2 rounded-xl bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Foto Buah Kopi Baru
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, (base64) => setFormData((prev) => ({
                          ...prev,
                          keunggulan: { ...(prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan), image: base64 }
                        })))}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({
                        ...prev,
                        keunggulan: { ...(prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan), image: "/images/coffee_cherries.png" }
                      }))}
                      className="px-3 py-2 rounded-xl bg-[#14100E] border border-[#2A211B] text-[#A39688] hover:text-white text-xs"
                    >
                      Gunakan Foto Asli Default
                    </button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#A39688]">Teks Kutipan Pada Foto:</span>
                    <input
                      type="text"
                      value={keunggulan.imageQuote}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        keunggulan: { ...(prev.keunggulan || DEFAULT_STORE_SETTINGS.keunggulan), imageQuote: e.target.value }
                      }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Kartu Keunggulan */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                2. Konten 4 Kartu Keunggulan Kopi:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(keunggulan.cards || []).map((card, idx) => (
                  <div key={card.id || idx} className="p-3 rounded-lg bg-[#14100E] border border-[#2A211B] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FFC72C] text-[#0A0807] text-[10px] font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleUpdateKeunggulanCard(idx, "title", e.target.value)}
                        className="flex-1 px-2.5 py-1 rounded bg-[#0A0807] border border-[#2A211B] text-white text-xs font-bold focus:outline-none focus:border-[#FFC72C]"
                        placeholder="Judul Keunggulan"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={card.desc}
                      onChange={(e) => handleUpdateKeunggulanCard(idx, "desc", e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-[#0A0807] border border-[#2A211B] text-[#D1C7BD] text-xs focus:outline-none focus:border-[#FFC72C]"
                      placeholder="Penjelasan keunggulan..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Ringkasan Mutu */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                  3. Ringkasan Keunggulan Mutu (Checklist Bawah):
                </label>
                <button
                  type="button"
                  onClick={handleAddKeunggulanChecklist}
                  className="px-3 py-1 rounded-lg bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3" /> Tambah Poin
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(keunggulan.checklist || []).map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={pt}
                      onChange={(e) => handleUpdateKeunggulanChecklist(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                    />
                    {(keunggulan.checklist || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveKeunggulanChecklist(idx)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB D: HERO BANNER */}
        {activeSubTab === "hero" && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A211B]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Pengaturan Hero Banner & Headline Utama
                </h3>
              </div>
              <span className="text-[10px] text-[#A39688]">Tampilan Pertama Website</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                Gambar Latar Belakang (Hero Background):
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative w-36 h-20 rounded-xl overflow-hidden border-2 border-[#DAA520]/40 shrink-0 bg-[#14100E]">
                  <Image
                    src={hero.bgImage || "/images/user_provided_bg.jpg"}
                    alt="Preview Hero Background"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="px-4 py-2 rounded-xl bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Background Baru
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, (base64) => setFormData((prev) => ({
                          ...prev,
                          hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), bgImage: base64 }
                        })))}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({
                        ...prev,
                        hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), bgImage: "/images/user_provided_bg.jpg" }
                      }))}
                      className="px-3 py-2 rounded-xl bg-[#14100E] border border-[#2A211B] text-[#A39688] hover:text-white text-xs"
                    >
                      Gunakan Background Asli
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="URL gambar..."
                    value={hero.bgImage}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), bgImage: e.target.value }
                    }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>
            </div>

            {/* Headline Texts */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                Teks Tagline & Headline Hero:
              </label>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A39688] uppercase block">Tagline Atas (Huruf Bersambung):</label>
                <input
                  type="text"
                  value={hero.tagline}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), tagline: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A39688] uppercase block">Headline Baris 1:</label>
                  <input
                    type="text"
                    value={hero.headline1}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), headline1: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs font-black focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A39688] uppercase block">Highlight Emas (Baris 2):</label>
                  <input
                    type="text"
                    value={hero.headlineHighlight}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), headlineHighlight: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-[#FFC72C] text-xs font-black focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A39688] uppercase block">Headline Baris 3:</label>
                  <input
                    type="text"
                    value={hero.headline3}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), headline3: e.target.value }
                    }))}
                    className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-[#FFC72C] text-xs font-black focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#A39688] uppercase block">Deskripsi Hero:</label>
                <textarea
                  rows={2}
                  value={hero.description}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    hero: { ...(prev.hero || DEFAULT_STORE_SETTINGS.hero), description: e.target.value }
                  }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB E: GENERAL & PROMO BANNER */}
        {activeSubTab === "general" && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A211B]">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Operasional Toko & Banner Marquee
                </h3>
              </div>
            </div>

            {/* Status Toko */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0A0807] border border-[#2A211B]">
              <div className="space-y-1">
                <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">Nama Brand / Toko:</label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, storeName: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs font-bold focus:outline-none focus:border-[#FFC72C]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">Status Toko:</label>
                <select
                  value={formData.storeStatus}
                  onChange={(e) => setFormData((prev) => ({ ...prev, storeStatus: e.target.value as "open" | "busy" | "closed" }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs font-bold focus:outline-none focus:border-[#FFC72C]"
                >
                  <option value="open">🟢 Toko Buka (Menerima Pesanan)</option>
                  <option value="busy">🟡 Sedang Roasting Kopi</option>
                  <option value="closed">🔴 Tutup Sementara / Libur</option>
                </select>
              </div>
            </div>

            {/* Banner Promo Marquee */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#FFC72C]" />
                  <span className="text-xs font-bold text-white uppercase">Teks Banner Promo Marquee:</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, enablePromoBanner: !prev.enablePromoBanner }))}
                  className={`px-3 py-1 rounded-full text-[10px] font-black transition-colors ${
                    formData.enablePromoBanner ? "bg-[#FFC72C] text-[#0A0807]" : "bg-[#2A211B] text-[#A39688]"
                  }`}
                >
                  {formData.enablePromoBanner ? "BANNER AKTIF" : "NONAKTIF"}
                </button>
              </div>

              <textarea
                rows={2}
                value={formData.promoBannerText}
                onChange={(e) => setFormData((prev) => ({ ...prev, promoBannerText: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                placeholder="Tuliskan promo yang akan bergulir..."
              />
            </div>

            {/* Opsi Gilingan */}
            <div className="p-4 rounded-xl bg-[#0A0807] border border-[#2A211B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFC72C] uppercase">Daftar Opsi Gilingan Kopi:</span>
              </div>

              <div className="space-y-2">
                {grindOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#14100E] border border-[#2A211B]">
                    <span className="text-xs text-white font-semibold">{opt}</span>
                    {grindOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveGrind(idx)}
                        className="p-1 text-red-400 hover:bg-red-950/40 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Tambah opsi gilingan baru..."
                  value={newGrindOption}
                  onChange={(e) => setNewGrindOption(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#14100E] border border-[#2A211B] text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
                <button
                  type="button"
                  onClick={handleAddGrind}
                  className="px-4 py-1.5 rounded-lg bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-xs font-bold"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB F: BACKUP & RESTORE */}
        {activeSubTab === "backup" && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-[#2A211B]">
              <Database className="w-5 h-5 text-[#FFC72C]" />
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Cadangkan & Pulihkan Seluruh Data Website
              </h3>
            </div>

            <p className="text-xs text-[#A39688]">
              File backup mencakup: <strong>Daftar Produk & Harga</strong>, <strong>Riwayat Penjualan / Pesanan</strong>, <strong>Seluruh Gambar & Teks Kustom</strong>, serta <strong>Kontak WhatsApp</strong>.
            </p>

            <div className="flex items-center gap-3 flex-wrap pt-2">
              <button
                type="button"
                onClick={handleExportFullBackup}
                className="px-5 py-2.5 rounded-xl bg-[#1A1412] hover:bg-[#2A211B] border border-[#DAA520]/40 text-[#FFC72C] text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Unduh Full Backup (JSON)
              </button>

              <label className="px-5 py-2.5 rounded-xl bg-[#1A1412] hover:bg-[#2A211B] border border-[#DAA520]/40 text-[#FFC72C] text-xs font-bold flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" /> Pulihkan dari File JSON
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
                  if (confirm("Reset seluruh pengaturan media, gambar, dan teks ke default bawaan awal?")) {
                    onResetSettings();
                    setFormData(DEFAULT_STORE_SETTINGS);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-[#1A1412] hover:bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset ke Default Awal
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 4. Bottom Sticky Save Bar */}
      <div className="p-4 rounded-2xl bg-[#14100E] border border-[#DAA520]/30 flex items-center justify-between">
        <span className="text-xs text-[#A39688]">
          💡 Perubahan pada gambar dan teks akan langsung diterapkan di website setelah disimpan.
        </span>
        <button
          type="button"
          onClick={() => handleSave()}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(255,199,44,0.35)] hover:scale-[1.02] transition-transform shrink-0"
        >
          <Save className="w-4 h-4" />
          Simpan Semua
        </button>
      </div>

    </div>
  );
};
