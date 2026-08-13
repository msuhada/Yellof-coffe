"use client";

import React from "react";
import Image from "next/image";
import { Mountain, CheckCircle2, Sparkles, MapPin } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang-kami" className="py-20 lg:py-28 relative overflow-hidden bg-[#0A0807]">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#DAA520]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with torn paper / luxury frame effect */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#DAA520]/40 shadow-2xl group">
              <Image
                src="/images/pasaman_plantation.png"
                alt="Perkebunan Kopi Robusta Yellof Coffee Pasaman"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#14100E]/90 backdrop-blur-md border border-[#DAA520]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DAA520]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FFDF6D]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Kabupaten Pasaman, Sumatera Barat
                    </h4>
                    <p className="text-[11px] text-[#A39688]">
                      Lahan Perkebunan Kopi Subur Ketinggian 800 - 1.200 MDPL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFDF6D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFDF6D]" />
                TENTANG KAMI
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                YELLOF COFFEE <br />
                <span className="text-gold-gradient">KOPI ASLI NAGARI</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#D1C7BD] leading-relaxed font-light">
              Kami berkomitmen menghadirkan kopi robusta berkualitas tinggi langsung dari perkebunan subur di{" "}
              <strong className="text-[#FFDF6D]">Kabupaten Pasaman</strong> untuk Anda yang menghargai cita rasa kopi sesungguhnya.
            </p>

            <p className="text-xs sm:text-sm text-[#A39688] leading-relaxed">
              Dipetik hanya saat buah kopi berwarna merah sempurna (Petik Merah), diproses secara higienis, dan disangrai secara terukur untuk memunculkan kombinasi aroma khas yang bold, rasa mantap tanpa ampas, dan tingkat keasaman yang aman di lambung.
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "100% Biji Robusta Pilihan",
                "Petik Merah Berkualitas",
                "Sangrai Terukur & Fresh",
                "Warisan Cita Rasa Nagari",
                "Tanpa Esens & Pengawet",
                "Sudah Teruji Di Gemari Penikmat Kopi"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFDF6D] shrink-0" />
                  <span className="text-xs text-[#E2D9D0] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#produk"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1412] border border-[#DAA520]/50 text-[#FFDF6D] hover:bg-[#DAA520] hover:text-[#0A0807] transition-all duration-300 text-xs font-bold tracking-wider uppercase"
              >
                JELAJAHI PRODUK KAMI →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
