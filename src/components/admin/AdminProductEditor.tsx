"use client";

import React, { useState } from "react";
import { ProductVariant } from "@/data/products";
import { Save, RotateCcw, Package, Tag, DollarSign, FileText, List, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface AdminProductEditorProps {
  products: ProductVariant[];
  onSave: (products: ProductVariant[]) => void;
  onReset: () => void;
}

export const AdminProductEditor: React.FC<AdminProductEditorProps> = ({
  products,
  onSave,
  onReset,
}) => {
  const [editedProducts, setEditedProducts] = useState<ProductVariant[]>(
    JSON.parse(JSON.stringify(products))
  );
  const [expandedId, setExpandedId] = useState<string | null>(products[0]?.id || null);
  const [hasChanges, setHasChanges] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const updateProduct = (id: string, field: keyof ProductVariant, value: string | number | boolean | string[]) => {
    setEditedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    setHasChanges(true);
  };

  const updateFeature = (productId: string, featureIndex: number, value: string) => {
    setEditedProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newFeatures = [...p.features];
          newFeatures[featureIndex] = value;
          return { ...p, features: newFeatures };
        }
        return p;
      })
    );
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    onSave(editedProducts);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (confirm("Yakin ingin reset semua produk ke data default?")) {
      onReset();
      setHasChanges(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[#FFC72C]" />
          <h2 className="text-base sm:text-lg font-bold text-white">Editor Produk & Harga</h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg bg-[#1A1412] border border-red-500/30 text-red-400 hover:bg-red-950/30 text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Reset Default
          </button>
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges}
            className="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg bg-gradient-to-r from-[#FFD034] to-[#E6AF2E] text-[#0A0807] font-black text-[10px] sm:text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
          >
            <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Simpan Semua
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="text-[10px] sm:text-xs text-amber-400 bg-amber-950/30 border border-amber-500/30 rounded-lg px-3 py-2 animate-fadeIn">
          ⚡ Ada perubahan belum disimpan. Klik &ldquo;Simpan Semua&rdquo; untuk menyimpan.
        </div>
      )}

      {/* Product Cards */}
      <div className="space-y-3">
        {editedProducts.map((product) => {
          const isExpanded = expandedId === product.id;
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <div
              key={product.id}
              className={`rounded-xl sm:rounded-2xl border transition-all ${
                isExpanded
                  ? "bg-[#14100E] border-[#FFC72C]/60 shadow-[0_0_20px_rgba(255,199,44,0.1)]"
                  : "bg-[#0F0C0A] border-[#DAA520]/20 hover:border-[#DAA520]/40"
              }`}
            >
              {/* Card Header — always visible */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : product.id)}
                className="w-full p-3 sm:p-4 flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 font-black text-xs sm:text-sm ${
                    product.isBestSeller
                      ? "bg-[#FFC72C] text-[#0A0807]"
                      : "bg-[#1A1412] text-[#FFC72C] border border-[#DAA520]/30"
                  }`}>
                    {product.weight.split(" ")[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">{product.weight}</span>
                      {product.badge && (
                        <span className="text-[8px] sm:text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#FFC72C]/15 text-[#FFC72C] border border-[#FFC72C]/30 shrink-0">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs sm:text-sm font-black text-[#FFC72C]">{formatRupiah(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#A39688] line-through">{formatRupiah(product.originalPrice)}</span>
                      )}
                      {discount > 0 && (
                        <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded">
                          -{discount}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#A39688] shrink-0" />
                )}
              </button>

              {/* Expanded Editor */}
              {isExpanded && (
                <div className="px-3 sm:px-4 pb-4 sm:pb-5 space-y-3 sm:space-y-4 border-t border-[#DAA520]/20 pt-3 sm:pt-4 animate-fadeIn">
                  
                  {/* Row 1: Prices */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Harga Jual (Rp)
                      </label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, "price", Number(e.target.value))}
                        className="admin-input"
                        min={0}
                        step={1000}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Harga Coret (Rp)
                      </label>
                      <input
                        type="number"
                        value={product.originalPrice || 0}
                        onChange={(e) => updateProduct(product.id, "originalPrice", Number(e.target.value) || undefined as unknown as number)}
                        className="admin-input"
                        min={0}
                        step={1000}
                      />
                    </div>
                  </div>

                  {/* Row 2: Name & Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Badge / Label
                      </label>
                      <input
                        type="text"
                        value={product.badge || ""}
                        onChange={(e) => updateProduct(product.id, "badge", e.target.value)}
                        className="admin-input"
                        placeholder="contoh: BEST SELLER"
                      />
                    </div>
                  </div>

                  {/* Row 3: Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Deskripsi Produk
                    </label>
                    <textarea
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                      className="admin-input"
                      rows={2}
                    />
                  </div>

                  {/* Row 4: Features */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
                      <List className="w-3 h-3" />
                      Fitur Produk (4 item)
                    </label>
                    <div className="space-y-1.5">
                      {product.features.map((feature, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(product.id, idx, e.target.value)}
                          className="admin-input"
                          placeholder={`Fitur ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Best Seller Toggle */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-[#0D0A08] border border-[#DAA520]/20">
                    <span className="text-[10px] sm:text-xs font-bold text-[#A39688]">Best Seller?</span>
                    <button
                      type="button"
                      onClick={() => updateProduct(product.id, "isBestSeller", !product.isBestSeller)}
                      className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                        product.isBestSeller ? "bg-[#FFC72C]" : "bg-[#2A211B]"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow transition-transform ${
                          product.isBestSeller ? "translate-x-5 sm:translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Preview */}
                  <div className="p-3 rounded-lg bg-[#0D0A08] border border-emerald-500/20 space-y-1">
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Preview Harga:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-lg font-black text-[#FFC72C]">{formatRupiah(product.price)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="text-[11px] text-[#A39688] line-through">{formatRupiah(product.originalPrice)}</span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                            HEMAT {formatRupiah(product.originalPrice - product.price)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
