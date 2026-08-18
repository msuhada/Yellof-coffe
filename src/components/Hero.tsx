"use client";

import React from "react";
import Image from "next/image";
import { HeroSectionSettings, DEFAULT_STORE_SETTINGS } from "@/data/storeSettings";
import { ShoppingCart, MessageCircle, Sun, Users, Coffee, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenOrderModal: () => void;
  hero?: HeroSectionSettings;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal, hero }) => {
  const data = hero || DEFAULT_STORE_SETTINGS.hero;

  return (
    <section id="beranda" className="relative min-h-[100svh] pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 flex flex-col justify-between overflow-hidden bg-[#0A0807]">
      
      {/* Background Image: Directly using the exact image provided by the user */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage || "/images/user_provided_bg.jpg"}
          alt="Yellof Coffee Commercial Advertising Background"
          fill
          className="object-cover object-center opacity-95"
          priority
        />
        {/* Vignette Gradient on Left to ensure high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0807] via-[#0A0807]/80 to-transparent w-full sm:w-[70%] md:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-[#0A0807]/60" />
        {/* Extra mobile overlay for readability */}
        <div className="absolute inset-0 bg-[#0A0807]/30 sm:bg-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex items-center py-4 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center w-full">
          
          {/* Left Column: Typography & Action Buttons */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-left">
            
            {/* Tagline Cursive Script */}
            <div className="font-serif italic text-lg sm:text-xl md:text-3xl text-[#FFDF6D] tracking-wide font-normal drop-shadow-md">
              {data.tagline}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight uppercase drop-shadow-2xl">
              {data.headline1} <br />
              <span className="text-[#FFC72C] italic font-serif font-extrabold tracking-normal">
                {data.headlineHighlight}
              </span> <br />
              <span className="text-[#FFC72C] font-black">
                {data.headline3}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-[#E2D9D0] max-w-xl leading-relaxed drop-shadow font-light">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#halaman-2"
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-[11px] sm:text-xs md:text-sm tracking-wider uppercase flex items-center gap-2 sm:gap-2.5 shadow-[0_6px_25px_rgba(255,199,44,0.4)] hover:scale-105 transition-transform group"
              >
                <span>LIHAT PRODUK</span>
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0A0807]" />
              </a>

              <button
                onClick={onOpenOrderModal}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#14100E]/80 border border-[#FFC72C]/60 text-[#FFDF6D] font-bold text-[11px] sm:text-xs md:text-sm flex items-center gap-2 hover:bg-[#FFC72C] hover:text-[#0A0807] transition-all backdrop-blur-md"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>ORDER VIA WA</span>
              </button>

              {/* Hand-drawn curly arrow pointing right */}
              <div className="hidden md:flex items-center gap-1 text-[#FFDF6D] animate-pulse">
                <svg className="w-12 h-8 stroke-current fill-none" viewBox="0 0 60 40" strokeWidth="2.5">
                  <path d="M 5,20 Q 25,5 45,20 T 55,25" strokeDasharray="3 3" />
                  <path d="M 45,15 L 55,25 L 45,30" />
                </svg>
              </div>
            </div>

          </div>

          {/* Right Column: Left empty so the user's coffee image displays cleanly */}
          <div className="lg:col-span-4 hidden lg:block" />

        </div>
      </div>

      {/* Feature Bar across bottom */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-20 w-full pt-2 sm:pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 bg-[#14100E]/95 backdrop-blur-xl p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-[#FFC72C]/40 shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-black uppercase text-white tracking-wide leading-tight truncate">
                COCOK SETIAP HARI
              </h4>
              <p className="text-[9px] sm:text-[10px] text-[#A39688] truncate">Teman terbaik relaksasimu</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-black uppercase text-white tracking-wide leading-tight truncate">
                TEMAN AKTIVITAS
              </h4>
              <p className="text-[9px] sm:text-[10px] text-[#A39688] truncate">Fokus & semangat seharian</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-black uppercase text-white tracking-wide leading-tight truncate">
                RASA MANTAP
              </h4>
              <p className="text-[9px] sm:text-[10px] text-[#A39688] truncate">Biji robusta kualitas super</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-black uppercase text-white tracking-wide leading-tight truncate">
                KUALITAS PREMIUM
              </h4>
              <p className="text-[9px] sm:text-[10px] text-[#A39688] truncate">Garansi mutu 100% murni</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
