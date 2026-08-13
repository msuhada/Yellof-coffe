"use client";

import React, { useState } from "react";
import Image from "next/image";
import { YELLOF_PRODUCTS } from "@/data/products";
import { ShoppingBag, Truck, Sparkles, Check, Plus, Minus, Star, Coffee, ShieldCheck, PackageCheck } from "lucide-react";

interface ProductCatalogProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenDeliveryModal: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenOrderModal,
  onOpenDeliveryModal,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("yellof-250g");
  const [quantity, setQuantity] = useState<number>(1);
  const [grindPreference, setGrindPreference] = useState<string>("Halus");

  const selectedProduct = YELLOF_PRODUCTS.find((p) => p.id === selectedProductId) || YELLOF_PRODUCTS[1];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const galleryPhotos = [
    {
      src: "/images/grid_1_hot_ceramic.jpg",
      title: "Cangkir Ceramic Kopi Hitam",
      caption: "Aroma Mantap & Panas Khas Pasaman",
      aspect: "aspect-[16/9]",
      colSpan: "col-span-12",
    },
    {
      src: "/images/grid_2_iced_coffee.jpg",
      title: "Es Kopi Robusta Segar",
      caption: "Dingin, Segar & Energik Seharian",
      aspect: "aspect-square",
      colSpan: "col-span-6",
    },
    {
      src: "/images/grid_3_pouch_package.jpg",
      title: "Kemasan Pouch Zipper 100% Murni",
      caption: "Kedap Air & Udara (Fresh Roasted)",
      aspect: "aspect-square",
      colSpan: "col-span-6",
    },
    {
      src: "/images/grid_4_hot_glass.jpg",
      title: "Glass Cup Hot Espresso Bold",
      caption: "Specialty Robusta High Altitude Pasaman",
      aspect: "aspect-[16/9]",
      colSpan: "col-span-12",
    },
  ];

  return (
    <section id="halaman-2" className="py-20 bg-[#0F0C0A] relative">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FFC72C]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1412] border border-[#FFC72C]/40 text-[#FFC72C] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            GALERI FOTO & CARD ORDER PRODUK
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            PRODUK KOPI <span className="text-[#FFC72C]">YELLOF COFFEE</span>
          </h2>
          <p className="text-sm text-[#A39688]">
            Nikmati galeri foto asli kelezatan Kopi Robusta Pasaman dan pesan langsung varian pilihan Anda di 1 card order container terpadu.
          </p>
        </div>

        {/* Layout 2 Kolom: Galeri Foto (Col-7) & Single Order Card Container (Col-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: GALERI FOTO YELLOF COFFEE (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[#FFC72C]" />
                GALERI SERI KOPI PASAMAN
              </h3>
            </div>

            {/* Photo Grid Grid Variations */}
            <div className="grid grid-cols-12 gap-2.5 sm:gap-4">
              {galleryPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`${photo.colSpan} relative rounded-2xl overflow-hidden group border border-[#FFC72C]/30 bg-[#0A0807] shadow-xl hover:border-[#FFC72C] transition-all duration-500`}
                >
                  <div className={`relative w-full ${photo.aspect}`}>
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay & Hover Caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-extrabold uppercase text-[#FFC72C] tracking-wider block">
                        Yellof Coffee Pasaman
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-snug">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-[#D1C7BD] font-light">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: 1 DEDICATED CARD CONTAINER ORDER PRODUK UTAMA (lg:col-span-5) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-gradient-to-b from-[#1E1713] via-[#14100E] to-[#0D0A08] border-2 border-[#FFC72C] p-6 sm:p-8 shadow-[0_0_40px_rgba(255,199,44,0.25)] space-y-6">
              
              {/* Header Badge */}
              <div className="text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC72C]/10 border border-[#FFC72C]/40 text-[#FFC72C] text-[10px] font-black uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-[#FFC72C]" />
                  CARD ORDER PRODUK UTAMA
                </div>
                <h3 className="font-serif text-2xl font-black text-white">
                  PESAN SEKARANG <br />
                  <span className="text-[#FFC72C] italic">KOPI ROBUSTA PASAMAN</span>
                </h3>
                <p className="text-xs text-[#A39688]">
                  Pilih varian, ukuran, dan gilingan favorit Anda di bawah ini:
                </p>
              </div>

              {/* 1. Varian Product Selection Tabs */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                  1. Pilih Ukuran Kemasan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {YELLOF_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedProductId(prod.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedProductId === prod.id
                          ? "bg-[#FFC72C] border-[#FFC72C] text-[#0A0807] font-extrabold shadow-md scale-[1.02]"
                          : "bg-[#0A0807]/80 border-[#FFC72C]/30 text-white hover:border-[#FFC72C]/70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold">{prod.weight.split(" ")[0]} {prod.weight.split(" ")[1]}</span>
                        {prod.isBestSeller && (
                          <span className="text-[8px] bg-[#0A0807] text-[#FFC72C] px-1.5 py-0.5 rounded font-black">
                            BEST
                          </span>
                        )}
                      </div>
                      <span className={`text-xs block mt-1 ${selectedProductId === prod.id ? "text-[#0A0807]" : "text-[#FFC72C]"}`}>
                        {formatRupiah(prod.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Grind Preference Selection */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                  2. Pilih Jenis Gilingan:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["Halus", "Sedang", "Kasar", "Biji Utuh"].map((grind) => (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setGrindPreference(grind)}
                      className={`py-2 px-1 rounded-lg border text-[11px] font-bold transition-all text-center ${
                        grindPreference === grind
                          ? "bg-[#FFC72C] border-[#FFC72C] text-[#0A0807]"
                          : "bg-[#0A0807]/60 border-[#FFC72C]/30 text-[#D1C7BD] hover:border-[#FFC72C]/60"
                      }`}
                    >
                      {grind}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Quantity Counter & Live Subtotal Calculator */}
              <div className="bg-[#0A0807] p-4 rounded-2xl border border-[#FFC72C]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D1C7BD]">Jumlah Pesanan:</span>
                  <div className="flex items-center gap-3 bg-[#1A1412] px-3 py-1.5 rounded-xl border border-[#FFC72C]/30">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-6 h-6 rounded bg-[#2A211B] text-white hover:bg-[#FFC72C] hover:text-[#0A0807] flex items-center justify-center text-xs font-bold transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold text-white min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-6 h-6 rounded bg-[#2A211B] text-white hover:bg-[#FFC72C] hover:text-[#0A0807] flex items-center justify-center text-xs font-bold transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#261E18]">
                  <div className="text-left">
                    <span className="text-[10px] text-[#A39688] uppercase block font-bold">Total Harga:</span>
                    <span className="text-xs text-[#D1C7BD]">
                      {quantity}x {selectedProduct.name} ({grindPreference})
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-black text-[#FFC72C]">
                    {formatRupiah(selectedProduct.price * quantity)}
                  </span>
                </div>
              </div>

              {/* 4. Action Buttons */}
              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenOrderModal(selectedProductId)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(255,199,44,0.3)] hover:scale-[1.02] transition-transform"
                >
                  <ShoppingBag className="w-4 h-4 fill-[#0A0807]" />
                  ORDER VIA WHATSAPP (0821-7103-2691)
                </button>

                <button
                  type="button"
                  onClick={onOpenDeliveryModal}
                  className="w-full py-3 rounded-2xl bg-[#1A1412] border border-[#FFC72C]/40 text-[#FFC72C] hover:bg-[#FFC72C] hover:text-[#0A0807] text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Truck className="w-4 h-4" />
                  PESAN VIA OJEK ONLINE (GOFOOD / SHOPEE / GRAB)
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#261E18] text-[10px] text-[#A39688]">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Check className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>100% Robusta Murni</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>Freshly Roasted</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <PackageCheck className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>Packing Amanah</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
