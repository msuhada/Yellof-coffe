"use client";

import React from "react";
import Image from "next/image";
import { YellofContact, DEFAULT_YELLOF_CONTACT } from "@/data/products";
import { MessageSquare, CheckCircle, ShieldCheck, Zap, PackageCheck } from "lucide-react";

interface WhatsAppSectionProps {
  onOpenOrderModal: () => void;
  contact?: YellofContact;
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({ onOpenOrderModal, contact }) => {
  const contactData = contact || DEFAULT_YELLOF_CONTACT;
  const waUrl = `https://wa.me/${contactData.whatsapp}?text=Halo%20Admin%20Yellof%20Coffee,%20saya%20ingin%20memesan%20kopi%20robusta%20premium%20Pasaman.`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(waUrl)}&color=0a0807&bgcolor=ffffff`;

  return (
    <section id="kontak" className="py-10 sm:py-12 md:py-16 bg-[#0D0A08] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#17110E] via-[#14100E] to-[#1F1813] border-2 border-[#DAA520]/50 p-4 sm:p-6 md:p-10 shadow-[0_0_40px_rgba(218,165,32,0.15)] overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-[#DAA520]/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-center relative z-10">
            
            {/* Left: Image & Title */}
            <div className="md:col-span-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#FFDF6D] shrink-0 shadow-lg">
                <Image
                  src="/images/coffee_cherries.png"
                  alt="Yellof Coffee Cherries"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#FFDF6D] flex items-center justify-center sm:justify-start gap-1">
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  LAYANAN PELANGGAN 24/7
                </span>
                <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-extrabold text-white">
                  PESAN SEKARANG ! <br />
                  <span className="text-gold-gradient">LEWAT WHATSAPP</span>
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#D1C7BD]">
                  Kopi berkualitas dari Pasaman langsung dikirim ke rumah Anda.
                </p>
              </div>
            </div>

            {/* Middle: QR Code & Guarantees */}
            <div className="md:col-span-4 flex flex-row items-center justify-center gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-[#2F251E] pt-4 md:pt-0 md:pl-4 lg:pl-6">
              
              {/* QR Code */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-xl flex flex-col items-center shrink-0">
                <img
                  src={qrCodeUrl}
                  alt="Scan QR Code WhatsApp Yellof Coffee"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                />
                <span className="text-[8px] sm:text-[9px] font-bold text-gray-800 mt-0.5 sm:mt-1 uppercase tracking-tighter">
                  SCAN QR UNTUK CHAT
                </span>
              </div>

              {/* Checklist */}
              <div className="space-y-1.5 sm:space-y-2 text-left">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D] shrink-0" />
                  <span>RESPON CEPAT</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D] shrink-0" />
                  <span>PENGIRIMAN AMANAH</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white">
                  <PackageCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D] shrink-0" />
                  <span>KEMASAN TERJAMIN</span>
                </div>
              </div>

            </div>

            {/* Right: CTA Button */}
            <div className="md:col-span-3 flex flex-col items-center justify-center">
              <button
                onClick={onOpenOrderModal}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FFDF6D] via-[#D4AF37] to-[#B8860B] text-[#0A0807] font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 sm:gap-2.5 shadow-[0_0_25px_rgba(218,165,32,0.4)] hover:scale-[1.02] transition-transform"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0A0807]" />
                ORDER VIA WHATSAPP
              </button>
              <span className="text-[10px] sm:text-[11px] text-[#A39688] mt-1.5 sm:mt-2 font-medium">
                Nomor Resmi: {contactData.whatsappFormatted}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
