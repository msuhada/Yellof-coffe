"use client";

import React, { useState } from "react";
import { ProductVariant } from "@/data/products";
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Download,
  Upload,
  Save,
  Check,
  X,
  Sparkles,
  DollarSign,
  Tag,
  FileText,
  List,
  AlertTriangle,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface AdminProductMasterProps {
  products: ProductVariant[];
  onSave: (products: ProductVariant[]) => void;
  onReset: () => void;
}

export const AdminProductMaster: React.FC<AdminProductMasterProps> = ({
  products,
  onSave,
  onReset,
}) => {
  const [productList, setProductList] = useState<ProductVariant[]>(
    JSON.parse(JSON.stringify(products))
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Modal States
  const [editingProduct, setEditingProduct] = useState<ProductVariant | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductVariant | null>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Trigger Save to Parent Hook
  const triggerSave = (updated: ProductVariant[]) => {
    setProductList(updated);
    setHasChanges(false);
    onSave(updated);
  };

  // Reorder
  const moveProduct = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= productList.length) return;

    const updated = [...productList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    triggerSave(updated);
  };

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    const newId = `yellof-${Date.now().toString().slice(-4)}`;
    setEditingProduct({
      id: newId,
      name: "Yellof Coffee Robusta Premium",
      weight: "250 Gram",
      weightGram: 250,
      price: 28000,
      originalPrice: 35000,
      badge: "Varian Baru",
      isBestSeller: false,
      description: "Biji Kopi Robusta Asli Pasaman dengan aroma wangi dan rasa mantap.",
      features: [
        "100% Biji Robusta Pasaman",
        "Sangrai Segar Freshly Roasted",
        "Kemasan Zipper Kedap Udara",
        "Tanpa Pengawet / Pewarna",
      ],
    });
    setIsNewProduct(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (product: ProductVariant) => {
    setEditingProduct(JSON.parse(JSON.stringify(product)));
    setIsNewProduct(false);
  };

  // Duplicate Product
  const handleDuplicateProduct = (product: ProductVariant) => {
    const newId = `yellof-${Date.now().toString().slice(-4)}`;
    const duplicated: ProductVariant = {
      ...JSON.parse(JSON.stringify(product)),
      id: newId,
      weight: `${product.weight} (Copy)`,
      badge: "Duplikat",
      isBestSeller: false,
    };
    const updated = [...productList, duplicated];
    triggerSave(updated);
  };

  // Delete Product
  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    const updated = productList.filter((p) => p.id !== productToDelete.id);
    triggerSave(updated);
    setProductToDelete(null);
  };

  // Save from Modal
  const handleSaveModalProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    let updated: ProductVariant[];
    if (isNewProduct) {
      updated = [...productList, editingProduct];
    } else {
      updated = productList.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    }

    triggerSave(updated);
    setEditingProduct(null);
  };

  // Dynamic Feature items handlers
  const handleAddFeature = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, "Keunggulan baru produk"],
    });
  };

  const handleUpdateFeature = (index: number, val: string) => {
    if (!editingProduct) return;
    const updatedFeatures = [...editingProduct.features];
    updatedFeatures[index] = val;
    setEditingProduct({
      ...editingProduct,
      features: updatedFeatures,
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingProduct) return;
    const updatedFeatures = editingProduct.features.filter((_, i) => i !== index);
    setEditingProduct({
      ...editingProduct,
      features: updatedFeatures,
    });
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(productList, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `yellof_products_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          triggerSave(parsed);
          alert("✅ Data produk berhasil diimpor!");
        } else {
          alert("❌ Format file JSON tidak valid.");
        }
      } catch {
        alert("❌ Gagal membaca file JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 1. HEADER & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FFC72C]" />
            <h2 className="text-base sm:text-lg font-bold text-white">Master Konfigurasi Produk & Varian</h2>
          </div>
          <p className="text-[11px] sm:text-xs text-[#A39688] mt-0.5">
            Tambah varian baru, ubah harga, edit keunggulan dinamis, duplikat & hapus produk secara instan.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,199,44,0.25)] hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4" />
            + Tambah Produk Baru
          </button>

          <button
            onClick={handleExportJSON}
            title="Backup Data Produk (JSON)"
            className="p-2 rounded-xl bg-[#1A1412] border border-[#DAA520]/30 text-[#FFC72C] hover:bg-[#2A211B] transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <label
            title="Impor Data Produk (JSON)"
            className="p-2 rounded-xl bg-[#1A1412] border border-[#DAA520]/30 text-[#FFC72C] hover:bg-[#2A211B] cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (confirm("Reset semua produk ke data default bawaan pabrik?")) {
                onReset();
              }
            }}
            title="Reset ke Default"
            className="p-2 rounded-xl bg-[#1A1412] border border-red-500/30 text-red-400 hover:bg-red-950/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT CARDS LIST */}
      <div className="space-y-3 sm:space-y-4">
        {productList.length === 0 ? (
          <div className="p-8 text-center bg-[#120E0C] border border-[#2A211B] rounded-2xl space-y-3">
            <Package className="w-10 h-10 mx-auto text-[#4A3F35]" />
            <p className="text-sm text-[#A39688]">Belum ada produk terdaftar.</p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-lg bg-[#FFC72C] text-[#0A0807] font-bold text-xs"
            >
              + Buat Produk Pertama
            </button>
          </div>
        ) : (
          productList.map((product, index) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#120E0C] border border-[#DAA520]/25 hover:border-[#FFC72C]/60 transition-all shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left Info */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  
                  {/* Reorder Buttons & Position */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      disabled={index === 0}
                      onClick={() => moveProduct(index, "up")}
                      className="p-1 rounded bg-[#1A1412] text-[#A39688] hover:text-[#FFC72C] disabled:opacity-20 transition-colors"
                      title="Geser Ke Atas"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-bold text-[#6B5D4F]">{index + 1}</span>
                    <button
                      disabled={index === productList.length - 1}
                      onClick={() => moveProduct(index, "down")}
                      className="p-1 rounded bg-[#1A1412] text-[#A39688] hover:text-[#FFC72C] disabled:opacity-20 transition-colors"
                      title="Geser Ke Bawah"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Weight Icon Avatar */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-inner ${
                    product.isBestSeller
                      ? "bg-gradient-to-br from-[#FFD034] to-[#E6AF2E] text-[#0A0807]"
                      : "bg-[#1A1412] text-[#FFC72C] border border-[#DAA520]/40"
                  }`}>
                    <span>{product.weight.split(" ")[0]}</span>
                    <span className="text-[9px] font-semibold uppercase">{product.weight.split(" ")[1] || "G"}</span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-bold text-white truncate">
                        {product.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-[#1A1412] border border-[#DAA520]/30 text-[#FFC72C] text-[10px] font-extrabold">
                        {product.weight} ({product.weightGram || 0}g)
                      </span>
                      {product.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-[#FFC72C]/15 border border-[#FFC72C]/40 text-[#FFC72C] text-[9px] font-bold uppercase">
                          {product.badge}
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 text-[9px] font-bold uppercase flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> BEST SELLER
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-[#A39688] line-clamp-1">
                      {product.description}
                    </p>

                    {/* Features Tags Pill Preview */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {product.features.map((feat, fIdx) => (
                        <span key={fIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-[#0A0807] border border-[#2A211B] text-[#D1C7BD]">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right: Prices & Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#1F1814]">
                  
                  {/* Price Tag */}
                  <div className="text-left md:text-right">
                    <div className="text-sm sm:text-lg font-black text-[#FFC72C]">
                      {formatRupiah(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="flex items-center md:justify-end gap-1 text-[10px] text-[#A39688]">
                        <span className="line-through">{formatRupiah(product.originalPrice)}</span>
                        <span className="text-emerald-400 font-bold">-{discount}%</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    
                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="px-3 py-2 rounded-xl bg-[#1A1412] hover:bg-[#FFC72C] text-[#FFC72C] hover:text-[#0A0807] border border-[#DAA520]/40 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Duplicate */}
                    <button
                      onClick={() => handleDuplicateProduct(product)}
                      title="Duplikat Varian Ini"
                      className="p-2 rounded-xl bg-[#1A1412] hover:bg-[#2A211B] text-[#A39688] hover:text-white border border-[#2A211B] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setProductToDelete(product)}
                      title="Hapus Produk"
                      className="p-2 rounded-xl bg-[#1A1412] hover:bg-red-950/40 text-red-400 border border-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 3. MODAL: ADD / EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#14100E] border-2 border-[#DAA520] rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(218,165,32,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1F1814] via-[#2A211B] to-[#1F1814] border-b border-[#DAA520]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5 text-[#FFC72C]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                  {isNewProduct ? "Tambah Produk & Varian Baru" : `Edit Produk: ${editingProduct.weight}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-[#14100E] text-[#A39688] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveModalProduct} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Row 1: Nama Produk & Varian Berat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Nama Seri Produk:
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    Label Ukuran Kemasan:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 250 Gram / 1 Kg"
                    value={editingProduct.weight}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              {/* Row 2: Berat Bersih Gram, Harga Jual, Harga Coret */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">
                    Berat Bersih (Gram):
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingProduct.weightGram || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weightGram: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Harga Jual (Rp):
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#FFC72C]/60 text-[#FFC72C] text-xs font-bold focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">
                    Harga Coret / Asli (Rp):
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-[#A39688] text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              {/* Row 3: Badge & Best Seller Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Badge / Label Highlight:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: BEST SELLER / HEMAT 20%"
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A0807] border border-[#DAA520]/40">
                  <div>
                    <span className="text-xs font-bold text-white block">Status Best Seller</span>
                    <span className="text-[10px] text-[#A39688]">Tandai sebagai varian paling favorit</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, isBestSeller: !editingProduct.isBestSeller })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      editingProduct.isBestSeller ? "bg-[#FFC72C]" : "bg-[#2A211B]"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        editingProduct.isBestSeller ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Row 4: Deskripsi Produk */}
              <div className="space-y-1">
                <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Deskripsi Varian:
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              {/* Row 5: Dynamic Features List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider flex items-center gap-1">
                    <List className="w-3 h-3" />
                    Poin Fitur & Keunggulan Produk:
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-2.5 py-1 rounded-lg bg-[#1A1412] text-[#FFC72C] border border-[#DAA520]/30 hover:bg-[#FFC72C] hover:text-[#0A0807] text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    Tambah Poin
                  </button>
                </div>

                <div className="space-y-2">
                  {editingProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[11px] text-[#A39688] font-mono w-5 text-right">{idx + 1}.</span>
                      <input
                        type="text"
                        required
                        value={feat}
                        onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A0807] border border-[#DAA520]/30 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                        placeholder={`Poin keunggulan ${idx + 1}`}
                      />
                      {editingProduct.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1.5 rounded-lg bg-[#1A1412] text-red-400 hover:bg-red-950/40 border border-red-500/30 transition-colors"
                          title="Hapus Poin Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="p-3.5 rounded-2xl bg-[#0A0807] border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Live Preview Tampilan:
                  </span>
                  <span className="text-[10px] text-[#A39688]">
                    {editingProduct.weight}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-black text-[#FFC72C]">
                    {formatRupiah(editingProduct.price)}
                  </span>
                  {editingProduct.originalPrice && editingProduct.originalPrice > editingProduct.price && (
                    <span className="text-xs text-[#A39688] line-through">
                      {formatRupiah(editingProduct.originalPrice)}
                    </span>
                  )}
                  {editingProduct.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FFC72C]/15 text-[#FFC72C] font-bold">
                      {editingProduct.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2A211B]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#1A1412] text-xs text-[#A39688] hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#FFD034] to-[#E6AF2E] text-[#0A0807] font-black text-xs flex items-center gap-1.5 shadow hover:scale-[1.02] transition-transform"
                >
                  <Save className="w-4 h-4" />
                  {isNewProduct ? "Simpan Produk Baru" : "Terapkan Perubahan"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: DELETE PRODUCT CONFIRMATION */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-[#14100E] border border-red-500/50 rounded-2xl p-5 space-y-4 text-center shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">Hapus Produk Ini?</h3>
              <p className="text-xs text-[#A39688]">
                Varian <span className="text-white font-bold">{productToDelete.name} ({productToDelete.weight})</span> akan dihapus dari katalog.
              </p>
              <p className="text-[10px] text-red-400/80">Pelanggan tidak akan dapat lagi memilih varian ini di website.</p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-lg bg-[#1A1412] text-xs text-[#A39688] hover:text-white font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Ya, Hapus Produk
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
