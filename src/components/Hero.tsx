"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, MessageCircle, Sun, Users, Coffee, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="beranda" className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-[#0A0807]">
      
      {/* Background Image: Directly using the exact image provided by the user */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/user_provided_bg.jpg"
          alt="Yellof Coffee Commercial Advertising Background"
          fill
          className="object-cover object-center opacity-95"
          priority
        />
        {/* Vignette Gradient on Left to ensure high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0807] via-[#0A0807]/75 to-transparent w-full sm:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-[#0A0807]/60" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex items-center py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Typography & Action Buttons */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* Tagline Cursive Script */}
            <div className="font-serif italic text-xl sm:text-3xl text-[#FFDF6D] tracking-wide font-normal drop-shadow-md">
              Nikmatnya Kopi Asli Pasaman
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight uppercase drop-shadow-2xl">
              KOPI NIKMAT, <br />
              <span className="text-[#FFC72C] italic font-serif font-extrabold tracking-normal">
                SEMANGAT
              </span> <br />
              <span className="text-[#FFC72C] font-black">
                BERLIPAT!
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#E2D9D0] max-w-xl leading-relaxed drop-shadow font-light">
              Dibuat dari biji kopi robusta pilihan terbaik yang dipetik langsung dari perkebunan di{" "}
              <strong className="text-[#FFC72C] font-bold underline decoration-[#FFC72C]/50">
                Kabupaten Pasaman
              </strong>{" "}
              dengan aroma kuat, rasa mantap, dan kualitas premium di setiap tegukan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#halaman-2"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-[0_6px_25px_rgba(255,199,44,0.4)] hover:scale-105 transition-transform group"
              >
                <span>LIHAT PRODUK</span>
                <ShoppingCart className="w-4 h-4 fill-[#0A0807]" />
              </a>

              <button
                onClick={onOpenOrderModal}
                className="px-7 py-3.5 rounded-full bg-[#14100E]/80 border border-[#FFC72C]/60 text-[#FFDF6D] font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#FFC72C] hover:text-[#0A0807] transition-all backdrop-blur-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ORDER VIA WA</span>
              </button>

              {/* Hand-drawn curly arrow pointing right */}
              <div className="hidden sm:flex items-center gap-1 text-[#FFDF6D] animate-pulse">
                <svg className="w-12 h-8 stroke-current fill-none" viewBox="0 0 60 40" strokeWidth="2.5">
                  <path d="M 5,20 Q 25,5 45,20 T 55,25" strokeDasharray="3 3" />
                  <path d="M 45,15 L 55,25 L 45,30" />
                </svg>
              </div>
            </div>

          </div>

          {/* Right Column: Left empty so the user's coffee image (cup, sack, beans, leaves) displays cleanly */}
          <div className="lg:col-span-4 hidden lg:block" />

        </div>
      </div>

      {/* Feature Bar across table bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#14100E]/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-[#FFC72C]/40 shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          
          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wide">
                COCOK DINIKMATI SETIAP HARI
              </h4>
              <p className="text-[10px] text-[#A39688]">Teman terbaik relaksasimu</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wide">
                TEMAN TERBAIK AKTIVITASMU
              </h4>
              <p className="text-[10px] text-[#A39688]">Fokus & semangat seharian</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <Coffee className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wide">
                RASA MANTAP
              </h4>
              <p className="text-[10px] text-[#A39688]">Biji robusta kualitas super</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#241C17] border border-[#FFC72C]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white tracking-wide">
                KUALITAS PREMIUM TERJAMIN
              </h4>
              <p className="text-[10px] text-[#A39688]">Garansi mutu 100% murni</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
