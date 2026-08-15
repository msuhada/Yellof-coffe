"use client";

import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rahmat Hidayat",
      role: "Penikmat Kopi - Padang",
      content:
        "Aroma Yellof Coffee ini beneran beda! Begitu diseduh langsung kerasa keaslian robusta Pasaman. Bitter-sweetnya pas dan nggak bikin kembung.",
      rating: 5,
    },
    {
      name: "Siti Rahmawati",
      role: "Ibu Rumah Tangga - Lubuk Sikaping",
      content:
        "Sudah langganan kemasan 250 gram. Suami suka banget karena rasanya mantap tanpa ampas berlebih. Kemasannya juga tebal aman.",
      rating: 5,
    },
    {
      name: "Bambang Kurniawan",
      role: "Pemilik Kedai Kopi - Pekanbaru",
      content:
        "Beli yang kemasan 1 kg grosir untuk campuran house blend di cafe. Pelanggan pada nanya rasa kokinya mantap banget. Rekomended!",
      rating: 5,
    },
  ];

  // Auto-slide every 3.5 seconds on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimoni" className="py-10 sm:py-16 md:py-20 bg-[#0A0807] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-14 space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFC72C]">
            ULASAN PELANGGAN SETIA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            APA KATA <span className="text-[#FFC72C]">PENIKMAT KOPI?</span>
          </h2>
        </div>

        {/* DESKTOP VIEW (Grid 3 Kolom) */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-[#14100E] border border-[#FFC72C]/30 hover:border-[#FFC72C]/70 transition-all duration-300 flex flex-col justify-between space-y-3 lg:space-y-4 shadow-xl"
            >
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#FFC72C] gap-0.5 sm:gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-[#FFC72C]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFC72C]/40" />
                </div>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#D1C7BD] leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#261E18] pt-2 lg:pt-3">
                <h4 className="text-xs font-bold text-white">{item.name}</h4>
                <span className="text-[10px] text-[#A39688]">{item.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW (Auto-sliding) */}
        <div className="block md:hidden relative">
          
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#FFC72C]/40 bg-[#14100E] p-4 sm:p-6 shadow-2xl transition-all duration-500">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className={`${
                  idx === currentIndex
                    ? "block animate-fadeIn"
                    : "hidden"
                } flex flex-col justify-between min-h-[180px] sm:min-h-[220px] space-y-3 sm:space-y-4`}
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FFC72C] gap-0.5 sm:gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FFC72C]" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFC72C]/40" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#E2D9D0] leading-relaxed italic font-light">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                <div className="border-t border-[#261E18] pt-2 sm:pt-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] sm:text-xs text-[#A39688]">{item.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots & Controls */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1F1814] border border-[#FFC72C]/30 text-[#FFC72C] flex items-center justify-center hover:bg-[#FFC72C] hover:text-[#0A0807] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-5 sm:w-7 bg-[#FFC72C]"
                      : "w-2 sm:w-2.5 bg-[#2A211B] border border-[#FFC72C]/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1F1814] border border-[#FFC72C]/30 text-[#FFC72C] flex items-center justify-center hover:bg-[#FFC72C] hover:text-[#0A0807] transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
