"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { AboutSectionSettings, DEFAULT_STORE_SETTINGS } from "@/data/storeSettings";

interface AboutSectionProps {
  about?: AboutSectionSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const data = about || DEFAULT_STORE_SETTINGS.about;

  return (
    <section id="tentang-kami" className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden bg-[#0A0807]">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-60 sm:w-96 h-60 sm:h-96 bg-[#DAA520]/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-[#DAA520]/40 shadow-2xl group">
              <Image
                src={data.image || "/images/pasaman_plantation.png"}
                alt={data.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-transparent to-transparent opacity-80" />

              {(data.locationTitle || data.locationSubtitle) && (
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#14100E]/90 backdrop-blur-md border border-[#DAA520]/40">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DAA520]/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFDF6D]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider truncate">
                        {data.locationTitle}
                      </h4>
                      <p className="text-[9px] sm:text-[11px] text-[#A39688] truncate">
                        {data.locationSubtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FFDF6D] flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D]" />
                {data.badge || "TENTANG KAMI"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {data.title} <br />
                <span className="text-gold-gradient">{data.titleHighlight}</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-[#D1C7BD] leading-relaxed font-light">
              {data.description1}
            </p>

            {data.description2 && (
              <p className="text-[11px] sm:text-xs md:text-sm text-[#A39688] leading-relaxed">
                {data.description2}
              </p>
            )}

            {/* Checklist items */}
            {data.features && data.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                {data.features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D] shrink-0" />
                    <span className="text-[11px] sm:text-xs text-[#E2D9D0] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 sm:pt-4">
              <a
                href="#halaman-2"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#1A1412] border border-[#DAA520]/50 text-[#FFDF6D] hover:bg-[#DAA520] hover:text-[#0A0807] transition-all duration-300 text-[11px] sm:text-xs font-bold tracking-wider uppercase"
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
