"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Zap, Heart, ShieldAlert } from "lucide-react";

export const KeunggulanSection: React.FC = () => {
  const highlights = [
    {
      title: "Aroma Kuat & Khas Nagari",
      desc: "Menghadirkan wangi aroma khas kopi robusta asli pegunungan Pasaman yang menyerbak seketika diseduh.",
      icon: Award,
    },
    {
      title: "Rasa Lebih Bold & Mantap",
      desc: "Tekstur kental dengan karakter bitter-sweet alami tanpa rasa asam menusuk di lidah.",
      icon: Zap,
    },
    {
      title: "Kandungan Kafein Alami Tinggi",
      desc: "Memberikan suntikan energi dan fokus ekstra untuk mendampingi produktivitas aktivitas Anda seharian.",
      icon: Heart,
    },
    {
      title: "Cocok Untuk Teman Aktivitas",
      desc: "Dapat dinikmati hitam murni, tubruk tradisional, maupun dicampur susu dan gula aren favorit Anda.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="keunggulan" className="py-12 sm:py-16 md:py-20 bg-[#0A0807] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#14100E] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-[#DAA520]/40 shadow-2xl">
          
          {/* Left Column: Keunggulan */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFDF6D]">
                MENGAPA MEMILIH YELLOF COFFEE
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-4xl font-extrabold text-white mt-1">
                KEUNGGULAN KOPI <span className="text-gold-gradient">ROBUSTA PASAMAN</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#1D1713] border border-[#DAA520]/20 hover:border-[#DAA520]/50 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFDF6D]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D]" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[10px] sm:text-xs text-[#A39688] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Checklist summary */}
            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/30 space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-bold text-[#FFDF6D] uppercase tracking-wider block">
                Ringkasan Keunggulan Mutu:
              </span>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#E2D9D0]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                  <span>Aroma kuat dan khas</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                  <span>Rasa lebih bold & mantap</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                  <span>Kafein alami tinggi</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                  <span>Tanpa bahan kimia/esens</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Cherries Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#DAA520]/40 shadow-xl group">
              <Image
                src="/images/coffee_cherries.png"
                alt="Buah Kopi Robusta Pasaman Petik Merah"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0A0807]/90 backdrop-blur-md border border-[#DAA520]/30 text-center">
                <span className="text-[10px] sm:text-xs font-serif font-bold text-[#FFDF6D]">
                  "Hanya Buah Kopi Merah Pilihan Yang Diolah"
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
