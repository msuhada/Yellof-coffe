"use client";

import React from "react";
import Image from "next/image";
import { YELLOF_CONTACT } from "@/data/products";
import { CheckCircle2, ArrowRight, MessageSquare, Check, ShieldCheck, PackageCheck, MapPin } from "lucide-react";

interface MainOverviewGridProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenDeliveryModal: () => void;
}

export const MainOverviewGrid: React.FC<MainOverviewGridProps> = ({
  onOpenOrderModal,
  onOpenDeliveryModal,
}) => {
  const waUrl = `https://wa.me/${YELLOF_CONTACT.whatsapp}?text=Halo%20Admin%20Yellof%20Coffee,%20saya%20ingin%20memesan%20kopi%20robusta%20premium%20Pasaman.`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(waUrl)}&color=0a0807&bgcolor=ffffff`;

  return (
    <section id="overview-grid" className="py-10 bg-[#0A0807] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout 2 Kolom: Card "Tentang Kami" Memanjang (col-span-8) & Right Cards (col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMN 1 (LEFT): TENTANG KAMI MEMANJANG (lg:col-span-8) Menggantikan Card Produk Kami */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#FFC72C]/30 shadow-2xl flex flex-col justify-end min-h-[380px] sm:min-h-[420px] p-6 sm:p-10 group">
            
            {/* Wide Background Pasaman Plantation Image */}
            <Image
              src="/images/pasaman_plantation.png"
              alt="Perkebunan Kopi Asli Nagari Pasaman"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Dark Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-[#0A0807]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0807]/90 via-[#0A0807]/40 to-transparent" />

            {/* Content inside expanded card */}
            <div className="relative z-10 space-y-4 max-w-2xl text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14100E]/90 border border-[#FFC72C]/40 text-[#FFC72C] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5" />
                TENTANG KAMI — NAGARI PASAMAN
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight">
                YELLOF COFFEE <br />
                <span className="text-[#FFC72C] italic">KOPI ASLI NAGARI</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed font-light">
                Kami berkomitmen menghadirkan kopi robusta berkualitas tinggi langsung dari perkebunan subur di Pasaman untuk Anda yang menghargai cita rasa kopi sesungguhnya.
              </p>

              {/* Feature Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-white bg-[#0A0807]/70 px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC72C] shrink-0" />
                  <span>100% Robusta Pasaman</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-white bg-[#0A0807]/70 px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC72C] shrink-0" />
                  <span>Petik Merah Pilihan</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-white bg-[#0A0807]/70 px-3 py-1.5 rounded-lg border border-[#FFC72C]/30 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC72C] shrink-0" />
                  <span>Sangrai Tradisional</span>
                </div>
              </div>

              <div className="pt-3">
                <a
                  href="#tentang-kami"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] hover:scale-105 transition-transform text-xs font-extrabold uppercase tracking-wider shadow-lg"
                >
                  <span>SELENGKAPNYA</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* COLUMN 2 (RIGHT): 2 Stacked Dark Cards (Keunggulan & Pesan Sekarang WA) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Top Card: KEUNGGULAN KOPI ROBUSTA */}
            <div className="rounded-2xl bg-[#14100E] p-4 sm:p-5 border border-[#FFC72C]/40 shadow-xl relative overflow-hidden flex items-center justify-between">
              
              <div className="space-y-2.5 text-left z-10">
                <h4 className="font-serif text-sm font-extrabold uppercase text-[#FFC72C] tracking-wide">
                  KEUNGGULAN KOPI ROBUSTA
                </h4>
                
                <ul className="space-y-1.5 text-xs text-[#E2D9D0]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Aroma kuat dan khas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Rasa lebih bold & mantap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Kandungan kafein lebih tinggi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFC72C] shrink-0" />
                    <span>Cocok untuk teman aktivitas sehari-hari</span>
                  </li>
                </ul>
              </div>

              {/* Coffee Cherries Image on Right */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-[#FFC72C]/30 shadow-md">
                <Image
                  src="/images/coffee_cherries.png"
                  alt="Buah Kopi Robusta Pasaman"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

            {/* Bottom Card: PESAN SEKARANG ! LEWAT WHATSAPP */}
            <div className="rounded-2xl bg-[#14100E] p-4 sm:p-5 border border-[#FFC72C]/40 shadow-xl space-y-3">
              
              <div className="text-left">
                <h4 className="font-serif text-sm font-extrabold uppercase text-white">
                  PESAN SEKARANG ! <span className="text-[#FFC72C]">LEWAT WHATSAPP</span>
                </h4>
                <p className="text-[10px] text-[#A39688] font-bold uppercase tracking-wider mt-0.5">
                  SCAN QR CODE DI BAWAH INI
                </p>
              </div>

              <div className="flex items-center gap-4">
                
                {/* QR Code */}
                <div className="bg-white p-1.5 rounded-xl shrink-0 shadow-md">
                  <img
                    src={qrCodeUrl}
                    alt="Scan QR WhatsApp Yellof Coffee"
                    className="w-20 h-20 object-contain"
                  />
                </div>

                {/* Checklist */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC72C]" />
                    <span>RESPON CEPAT</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFC72C]" />
                    <span>PENGIRIMAN AMANAH</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                    <PackageCheck className="w-3.5 h-3.5 text-[#FFC72C]" />
                    <span>KEMASAN TERJAMIN</span>
                  </div>
                </div>

              </div>

              <button
                onClick={() => onOpenOrderModal()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs tracking-wide flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <MessageSquare className="w-4 h-4 fill-[#0A0807]" />
                ORDER VIA WHATSAPP ({YELLOF_CONTACT.whatsappFormatted})
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
