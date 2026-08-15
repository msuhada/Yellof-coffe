"use client";

import React, { useState, useEffect } from "react";
import { ProductVariant, YellofContact, DEFAULT_YELLOF_PRODUCTS, DEFAULT_YELLOF_CONTACT } from "@/data/products";
import { X, ShoppingBag, Send, CheckCircle2, Coffee, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: string;
  products?: ProductVariant[];
  contact?: YellofContact;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialProductId,
  products,
  contact,
}) => {
  const productData = products || DEFAULT_YELLOF_PRODUCTS;
  const contactData = contact || DEFAULT_YELLOF_CONTACT;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || "yellof-250g"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [grindType, setGrindType] = useState<string>("Giling Halus (Tubruk / Espresso)");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
  }, [initialProductId]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentProduct =
    productData.find((p) => p.id === selectedProductId) || productData[1] || productData[0];

  const subtotal = currentProduct.price * quantity;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const textMessage = `Halo Admin Yellof Coffee, saya ingin memesan kopi:

📦 *DETAIL PESANAN:*
• Produk: ${currentProduct.name} (${currentProduct.weight})
• Jumlah: ${quantity} Pcs
• Jenis Gilingan: ${grindType}
• Total Harga: Rp ${subtotal.toLocaleString("id-ID")}

👤 *DATA PEMESAN:*
• Nama: ${customerName || "-"}
• No. HP/WA: ${customerPhone || "-"}
• Alamat Lengkap: ${address || "-"}
${notes ? `• Catatan: ${notes}` : ""}

Mohon diproses pesanannya ya kak. Terima kasih!`;

    const waLink = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(
      textMessage
    )}`;

    setTimeout(() => {
      window.open(waLink, "_blank");
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#14100E] border-t-2 sm:border-2 border-[#DAA520] rounded-t-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(218,165,32,0.3)] sm:my-8 overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1F1814] via-[#2A211B] to-[#1F1814] p-3.5 sm:p-5 border-b border-[#DAA520]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFDF6D] text-[#0A0807] flex items-center justify-center font-bold shadow-md">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-lg font-bold text-white">
                Form Pemesanan WhatsApp
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#FFDF6D]">
                Yellof Coffee Asli Kabupaten Pasaman
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#14100E] border border-[#DAA520]/40 text-[#A39688] hover:text-white hover:border-[#DAA520] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Form — scrollable */}
        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          
          {/* Product Selection */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold text-[#FFDF6D] uppercase tracking-wider block">
              Pilih Ukuran Varian Produk:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/40 text-white text-[11px] sm:text-xs font-semibold focus:outline-none focus:border-[#FFDF6D]"
            >
              {productData.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.weight} - Rp {p.price.toLocaleString("id-ID")} {p.badge ? `(${p.badge})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity & Grind Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-[#FFDF6D] uppercase tracking-wider block">
                Jumlah Pesanan:
              </label>
              <div className="flex items-center gap-2 sm:gap-3 bg-[#0D0A08] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-[#DAA520]/40">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#261E18] text-white hover:bg-[#DAA520] hover:text-[#0A0807] font-bold text-xs sm:text-sm flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xs sm:text-sm font-bold text-white flex-1 text-center">
                  {quantity} Pcs
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#261E18] text-white hover:bg-[#DAA520] hover:text-[#0A0807] font-bold text-xs sm:text-sm flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label className="text-[10px] sm:text-xs font-bold text-[#FFDF6D] uppercase tracking-wider block">
                Opsi Gilingan Kopi:
              </label>
              <select
                value={grindType}
                onChange={(e) => setGrindType(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/40 text-white text-[11px] sm:text-xs font-semibold focus:outline-none focus:border-[#FFDF6D]"
              >
                <option value="Biji Utuh (Roasted Beans)">Biji Utuh (Roasted Beans)</option>
                <option value="Giling Halus (Tubruk / Espresso)">Giling Halus (Tubruk / Espresso)</option>
                <option value="Giling Sedang (V60 / Drip Filter)">Giling Sedang (V60 / Drip Filter)</option>
                <option value="Giling Kasar (French Press / Cold Brew)">Giling Kasar (French Press / Cold Brew)</option>
              </select>
            </div>
          </div>

          {/* Customer Detail Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] font-semibold text-[#A39688]">Nama Pemesan:</label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/30 text-white text-[11px] sm:text-xs focus:outline-none focus:border-[#FFDF6D]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] font-semibold text-[#A39688]">Nomor WhatsApp:</label>
              <input
                type="tel"
                required
                placeholder="Contoh: 081234567890"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/30 text-white text-[11px] sm:text-xs focus:outline-none focus:border-[#FFDF6D]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-semibold text-[#A39688]">Alamat Lengkap Pengiriman:</label>
            <textarea
              required
              rows={2}
              placeholder="Jalan, RT/RW, Kecamatan, Kabupaten/Kota, Kode Pos"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 sm:px-3.5 py-2 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/30 text-white text-[11px] sm:text-xs focus:outline-none focus:border-[#FFDF6D]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-semibold text-[#A39688]">Catatan Khusus (Opsional):</label>
            <input
              type="text"
              placeholder="Contoh: Tolong bungkus bubble wrap tebal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 sm:px-3.5 py-2 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/30 text-white text-[11px] sm:text-xs focus:outline-none focus:border-[#FFDF6D]"
            />
          </div>

          {/* Subtotal Box */}
          <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/50 flex items-center justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] text-[#A39688] uppercase block">ESTIMASI TOTAL:</span>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#FFDF6D]">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 sm:px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Respon Cepat Direct WA</span>
              <span className="sm:hidden">Direct WA</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#FFDF6D] via-[#D4AF37] to-[#B8860B] text-[#0A0807] font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(218,165,32,0.4)] transition-all"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            KIRIM PESANAN VIA WHATSAPP
          </button>
        </form>

      </div>
    </div>
  );
};
