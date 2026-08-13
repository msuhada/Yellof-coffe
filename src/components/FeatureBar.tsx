"use client";

import React from "react";
import { Sun, Users, ShieldCheck, Coffee } from "lucide-react";

export const FeatureBar: React.FC = () => {
  const features = [
    {
      icon: Sun,
      title: "COCOK DINIKMATI SETIAP HARI",
      desc: "Teman terbaik untuk menemani aktivitas dan relaksasimu.",
    },
    {
      icon: Users,
      title: "RASA MANTAP",
      desc: "Dibuat dengan proses sangrai terbaik untuk rasa kopi yang mantap.",
    },
    {
      icon: ShieldCheck,
      title: "KUALITAS PREMIUM TERJAMIN",
      desc: "Biji kopi pilihan & diproses dengan standar kualitas terbaik.",
    },
    {
      icon: Coffee,
      title: "AROMA KUAT BITTER SWEET",
      desc: "Aroma khas robusta dengan rasa yang bold dan seimbang.",
    },
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#14100E]/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-[#DAA520]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        {features.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#1E1815] transition-colors border border-transparent hover:border-[#DAA520]/20"
            >
              <div className="w-11 h-11 rounded-xl bg-[#241C17] border border-[#DAA520]/40 flex items-center justify-center shrink-0 shadow-inner">
                <IconComp className="w-6 h-6 text-[#FFDF6D]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold tracking-wider text-white uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#A39688] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
