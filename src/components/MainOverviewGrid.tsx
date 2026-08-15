"use client";

import React from "react";
import Image from "next/image";
import { YellofContact, DEFAULT_YELLOF_CONTACT } from "@/data/products";
import { CheckCircle2, ArrowRight, MessageSquare, Check, ShieldCheck, PackageCheck, MapPin } from "lucide-react";

interface MainOverviewGridProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenDeliveryModal: () => void;
  contact?: YellofContact;
}

export const MainOverviewGrid: React.FC<MainOverviewGridProps> = ({
  onOpenOrderModal,
  onOpenDeliveryModal,
  contact,
}) => {
  const contactData = contact || DEFAULT_YELLOF_CONTACT;
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
              src="/images/pasaman_plantation.png"
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
                TENTANG KAMI — NAGARI PASAMAN
              </div>

              <h3 className="font-serif text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight">
                YELLOF COFFEE <br />
                <span className="text-[#FFC72C] italic">KOPI ASLI NAGARI</span>
              </h3>

              <p className="text-[11px] sm:text-xs md:text-sm text-[#D1C7BD] leading-relaxed font-light">
                Kami berkomitmen menghadirkan kopi robusta berkualitas tinggi langsung dari perkebunan subur di Pasaman untuk Anda yang menghargai cita rasa kopi sesungguhnya.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white bg-[#0A0807]/70 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC72C] shrink-0" />
                  <span>100% Robusta Pasaman</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white bg-[#0A0807]/70 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC72C] shrink-0" />
                  <span>Petik Merah Pilihan</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white bg-[#0A0807]/70 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC72C] shrink-0" />
                  <span>Sangrai Tradisional</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-3">
                <a
                  href="#tentang-kami"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] hover:scale-105 transition-transform text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-lg"
                >
                  <span>SELENGKAPNYA</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* COLUMN 2 (RIGHT): 2 Stacked Cards */}
          <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
            
            {/* Top Card: KEUNGGULAN */}
            <div className="rounded-xl sm:rounded-2xl bg-[#14100E] p-3.5 sm:p-4 md:p-5 border border-[#FFC72C]/40 shadow-xl relative overflow-hidden flex items-center justify-between gap-3">
              
              <div className="space-y-2 sm:space-y-2.5 text-left z-10 min-w-0 flex-1">
                <h4 className="font-serif text-xs sm:text-sm font-extrabold uppercase text-[#FFC72C] tracking-wide">
                  KEUNGGULAN KOPI ROBUSTA
                </h4>
                
                <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-[#E2D9D0]">
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Aroma kuat dan khas</span>
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Rasa lebih bold & mantap</span>
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Kandungan kafein lebih tinggi</span>
                  </li>
                  <li className="flex items-center gap-1.5 sm:gap-2">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Cocok untuk teman aktivitas</span>
                  </li>
                </ul>
              </div>

              {/* Coffee Cherries Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-[#FFC72C]/30 shadow-md">
                <Image
                  src="/images/coffee_cherries.png"
                  alt="Buah Kopi Robusta Pasaman"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

            {/* Bottom Card: PESAN SEKARANG */}
            <div className="rounded-xl sm:rounded-2xl bg-[#14100E] p-3.5 sm:p-4 md:p-5 border border-[#FFC72C]/40 shadow-xl space-y-2.5 sm:space-y-3">
              
              <div className="text-left">
                <h4 className="font-serif text-xs sm:text-sm font-extrabold uppercase text-white">
                  PESAN SEKARANG ! <span className="text-[#FFC72C]">LEWAT WHATSAPP</span>
                </h4>
                <p className="text-[9px] sm:text-[10px] text-[#A39688] font-bold uppercase tracking-wider mt-0.5">
                  SCAN QR CODE DI BAWAH INI
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                
                {/* QR Code */}
                <div className="bg-white p-1 sm:p-1.5 rounded-lg sm:rounded-xl shrink-0 shadow-md">
                  <img
                    src={qrCodeUrl}
                    alt="Scan QR WhatsApp Yellof Coffee"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>

                {/* Checklist */}
                <div className="space-y-1 sm:space-y-1.5 text-left">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-white">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C]" />
                    <span>RESPON CEPAT</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-white">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C]" />
                    <span>PENGIRIMAN AMANAH</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-white">
                    <PackageCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFC72C]" />
                    <span>KEMASAN TERJAMIN</span>
                  </div>
                </div>

              </div>

              <button
                onClick={() => onOpenOrderModal()}
                className="w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-[11px] sm:text-xs tracking-wide flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0A0807]" />
                ORDER VIA WHATSAPP ({contactData.whatsappFormatted})
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
