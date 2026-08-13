"use client";

import React from "react";
import Image from "next/image";
import { YELLOF_CONTACT } from "@/data/products";
import { MessageSquare, CheckCircle, ShieldCheck, Zap, PackageCheck } from "lucide-react";

interface WhatsAppSectionProps {
  onOpenOrderModal: () => void;
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({ onOpenOrderModal }) => {
  const waUrl = `https://wa.me/${YELLOF_CONTACT.whatsapp}?text=Halo%20Admin%20Yellof%20Coffee,%20saya%20ingin%20memesan%20kopi%20robusta%20premium%20Pasaman.`;
  // QR Code SVG generator link for real scan capability
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waUrl)}&color=0a0807&bgcolor=ffffff`;

  return (
    <section id="kontak" className="py-16 bg-[#0D0A08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box Persis Seperti Gambar Referensi */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#17110E] via-[#14100E] to-[#1F1813] border-2 border-[#DAA520]/50 p-6 sm:p-10 shadow-[0_0_40px_rgba(218,165,32,0.15)] overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#DAA520]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Cherries Circle Image & Title */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#FFDF6D] shrink-0 shadow-lg">
                <Image
                  src="/images/coffee_cherries.png"
                  alt="Yellof Coffee Cherries"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FFDF6D] flex items-center justify-center sm:justify-start gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  LAYANAN PELANGGAN 24/7
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  PESAN SEKARANG ! <br />
                  <span className="text-gold-gradient">LEWAT WHATSAPP</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#D1C7BD]">
                  Kopi berkualitas dari Pasaman langsung dikirim ke rumah Anda.
                </p>
              </div>
            </div>

            {/* Middle: QR Code & Guarantees matching reference image */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row items-center justify-center gap-4 border-t lg:border-t-0 lg:border-l border-[#2F251E] pt-6 lg:pt-0 lg:pl-6">
              
              {/* Scan QR Code Box */}
              <div className="bg-white p-2.5 rounded-2xl shadow-xl flex flex-col items-center shrink-0">
                <img
                  src={qrCodeUrl}
                  alt="Scan QR Code WhatsApp Yellof Coffee"
                  className="w-28 h-28 object-contain"
                />
                <span className="text-[9px] font-bold text-gray-800 mt-1 uppercase tracking-tighter">
                  SCAN QR UNTUK CHAT
                </span>
              </div>

              {/* Checklist items from reference image */}
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircle className="w-4 h-4 text-[#FFDF6D]" />
                  <span>RESPON CEPAT</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-[#FFDF6D]" />
                  <span>PENGIRIMAN AMANAH</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <PackageCheck className="w-4 h-4 text-[#FFDF6D]" />
                  <span>KEMASAN TERJAMIN</span>
                </div>
              </div>

            </div>

            {/* Right: Big CTA Button */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <button
                onClick={onOpenOrderModal}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FFDF6D] via-[#D4AF37] to-[#B8860B] text-[#0A0807] font-black text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(218,165,32,0.4)] hover:scale-[1.02] transition-transform"
              >
                <MessageSquare className="w-5 h-5 fill-[#0A0807]" />
                ORDER VIA WHATSAPP
              </button>
              <span className="text-[11px] text-[#A39688] mt-2 font-medium">
                Nomor Resmi: {YELLOF_CONTACT.whatsappFormatted}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
