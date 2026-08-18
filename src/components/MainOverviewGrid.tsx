"use client";

import React from "react";
import Image from "next/image";
import { YellofContact, DEFAULT_YELLOF_CONTACT } from "@/data/products";
import { AboutSectionSettings, KeunggulanSectionSettings, DEFAULT_STORE_SETTINGS } from "@/data/storeSettings";
import { CheckCircle2, ArrowRight, MessageSquare, Check, ShieldCheck, PackageCheck, MapPin } from "lucide-react";

interface MainOverviewGridProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenDeliveryModal: () => void;
  contact?: YellofContact;
  about?: AboutSectionSettings;
  keunggulan?: KeunggulanSectionSettings;
}

export const MainOverviewGrid: React.FC<MainOverviewGridProps> = ({
  onOpenOrderModal,
  onOpenDeliveryModal,
  contact,
  about,
  keunggulan,
}) => {
  const contactData = contact || DEFAULT_YELLOF_CONTACT;
  const aboutData = about || DEFAULT_STORE_SETTINGS.about;
  const keunggulanData = keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;

  const waUrl = `https://wa.me/${contactData.whatsapp}?text=Halo%20Admin%20Yellof%20Coffee,%20saya%20ingin%20memesan%20kopi%20robusta%20premium%20Pasaman.`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(waUrl)}&color=0a0807&bgcolor=ffffff`;

  return (
    <section id="overview-grid" className="py-6 sm:py-8 md:py-10 bg-[#0A0807] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        
        {/* Layout 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 items-stretch">
          
          {/* COLUMN 1 (LEFT): TENTANG KAMI */}
          <div className="lg:col-span-8 relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#FFC72C]/30 shadow-2xl flex flex-col justify-end min-h-[300px] sm:min-h-[350px] md:min-h-[420px] p-4 sm:p-6 md:p-10 group">
            
            {/* Wide Background Image */}
            <Image
              src={aboutData.image || "/images/pasaman_plantation.png"}
              alt="Perkebunan Kopi Asli Nagari Pasaman"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-[#0A0807]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0807]/90 via-[#0A0807]/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-3 sm:space-y-4 max-w-2xl text-left">
              
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#14100E]/90 border border-[#FFC72C]/40 text-[#FFC72C] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {aboutData.badge || "TENTANG KAMI — NAGARI PASAMAN"}
              </div>

              <h3 className="font-serif text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight">
                {aboutData.title} <br />
                <span className="text-[#FFC72C] italic">{aboutData.titleHighlight}</span>
              </h3>

              <p className="text-[11px] sm:text-xs md:text-sm text-[#D1C7BD] leading-relaxed font-light">
                {aboutData.description1}
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                {(aboutData.features?.slice(0, 3) || [
                  "100% Robusta Pasaman",
                  "Petik Merah Pilihan",
                  "Sangrai Tradisional",
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white bg-[#0A0807]/70 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC72C] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#tentang-kami"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FFC72C] hover:text-white transition-colors group/link"
                >
                  <span>Baca Selengkapnya Kisah Kopi Kami</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          </div>

          {/* COLUMN 2 (RIGHT): WHATSAPP DIRECT QR & FAST ORDER */}
          <div className="lg:col-span-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1A1412] via-[#14100E] to-[#0D0A08] border border-[#FFC72C]/40 p-3.5 sm:p-5 md:p-7 flex flex-col justify-between shadow-2xl space-y-3 sm:space-y-4">
            
            {/* Top Area: On mobile side-by-side (QR Left, Text Right), on desktop stacked */}
            <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-3 sm:gap-4">
              
              {/* QR Code Container (Left on mobile, Center on desktop) */}
              <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-white/95 border-2 border-[#FFC72C] shadow-[0_0_20px_rgba(255,199,44,0.2)] shrink-0">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code WhatsApp Yellof Coffee"
                  width={110}
                  height={110}
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                  unoptimized
                />
                <span className="text-[7px] sm:text-[9px] text-[#0A0807] font-extrabold uppercase tracking-tight mt-1 text-center">
                  SCAN DENGAN HP
                </span>
              </div>

              {/* Text Info (Right on mobile, Top on desktop) */}
              <div className="space-y-1 sm:space-y-1.5 text-left flex-1 min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFC72C]/10 border border-[#FFC72C]/30 text-[#FFC72C] text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  WHATSAPP FAST ORDER
                </div>
                <h3 className="font-serif text-sm sm:text-base md:text-xl font-black text-white leading-snug">
                  Pesan Cepat Kopi <br className="hidden sm:inline" />
                  <span className="text-[#FFC72C]">Asli Kabupaten Pasaman</span>
                </h3>
                <p className="text-[9px] sm:text-xs text-[#A39688] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Scan QR atau klik tombol di bawah untuk pesan langsung via WhatsApp / Ojek Online:
                </p>
              </div>

            </div>

            {/* Action Buttons: 2 Columns Side-by-Side (Berdampingan) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenOrderModal()}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-[10px] sm:text-xs uppercase tracking-tight flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition-all truncate"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-[#0A0807] shrink-0" />
                <span className="truncate">CHAT ADMIN WA</span>
              </button>

              <button
                type="button"
                onClick={onOpenDeliveryModal}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-[#0A0807] border border-[#FFC72C]/50 text-[#FFC72C] hover:bg-[#FFC72C] hover:text-[#0A0807] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-tight flex items-center justify-center gap-1 shadow-sm hover:scale-[1.02] active:scale-95 transition-all truncate"
              >
                <span className="truncate">OJEK ONLINE 🛵</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
