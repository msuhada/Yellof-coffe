"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Zap, Heart, ShieldAlert, Sparkles } from "lucide-react";
import { KeunggulanSectionSettings, DEFAULT_STORE_SETTINGS } from "@/data/storeSettings";

interface KeunggulanSectionProps {
  keunggulan?: KeunggulanSectionSettings;
}

export const KeunggulanSection: React.FC<KeunggulanSectionProps> = ({ keunggulan }) => {
  const data = keunggulan || DEFAULT_STORE_SETTINGS.keunggulan;

  const defaultIcons = [Award, Zap, Heart, ShieldAlert, Sparkles];

  return (
    <section id="keunggulan" className="py-12 sm:py-16 md:py-20 bg-[#0A0807] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#14100E] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-[#DAA520]/40 shadow-2xl">
          
          {/* Left Column: Keunggulan */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFDF6D]">
                {data.badge || "MENGAPA MEMILIH YELLOF COFFEE"}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-4xl font-extrabold text-white mt-1">
                {data.title} <span className="text-gold-gradient">{data.titleHighlight}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {data.cards.map((item, idx) => {
                const Icon = defaultIcons[idx % defaultIcons.length];
                return (
                  <div key={item.id || idx} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#1D1713] border border-[#DAA520]/20 hover:border-[#DAA520]/50 transition-colors">
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
            {data.checklist && data.checklist.length > 0 && (
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#0D0A08] border border-[#DAA520]/30 space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#FFDF6D] uppercase tracking-wider block">
                  Ringkasan Keunggulan Mutu:
                </span>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#E2D9D0]">
                  {data.checklist.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Cherries Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#DAA520]/40 shadow-xl group">
              <Image
                src={data.image || "/images/coffee_cherries.png"}
                alt={data.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-transparent opacity-70" />

              {data.imageQuote && (
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0A0807]/90 backdrop-blur-md border border-[#DAA520]/30 text-center">
                  <span className="text-[10px] sm:text-xs font-serif font-bold text-[#FFDF6D]">
                    {data.imageQuote}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
