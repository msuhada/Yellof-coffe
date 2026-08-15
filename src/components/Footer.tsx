"use client";

import React from "react";
import Image from "next/image";
import { Truck, PackageCheck, ShieldCheck, Phone, MapPin, Coffee } from "lucide-react";
import { YellofContact, DEFAULT_YELLOF_CONTACT } from "@/data/products";

interface FooterProps {
  contact?: YellofContact;
}

export const Footer: React.FC<FooterProps> = ({ contact }) => {
  const contactData = contact || DEFAULT_YELLOF_CONTACT;

  return (
    <footer className="bg-[#070504] border-t border-[#DAA520]/20 text-[#A39688]">
      
      {/* Top Guarantee Bar */}
      <div className="border-b border-[#1E1713] py-3 sm:py-4 md:py-5 bg-[#0D0A08]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6 text-center divide-x divide-[#1E1713]">
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-0.5 sm:px-1">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#FFC72C] shrink-0" />
              <div className="text-center sm:text-left">
                <h4 className="text-[8px] sm:text-[10px] md:text-xs font-extrabold text-white uppercase tracking-wider leading-tight">
                  PENGIRIMAN CEPAT
                </h4>
                <p className="text-[7px] sm:text-[9px] md:text-[11px] text-[#A39688] hidden sm:block">SELURUH INDONESIA</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-0.5 sm:px-1">
              <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#FFC72C] shrink-0" />
              <div className="text-center sm:text-left">
                <h4 className="text-[8px] sm:text-[10px] md:text-xs font-extrabold text-white uppercase tracking-wider leading-tight">
                  PACKING AMAN
                </h4>
                <p className="text-[7px] sm:text-[9px] md:text-[11px] text-[#A39688] hidden sm:block">BUBBLE WRAP RAPIH</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-0.5 sm:px-1">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#FFC72C] shrink-0" />
              <div className="text-center sm:text-left">
                <h4 className="text-[8px] sm:text-[10px] md:text-xs font-extrabold text-white uppercase tracking-wider leading-tight">
                  100% TERPERCAYA
                </h4>
                <p className="text-[7px] sm:text-[9px] md:text-[11px] text-[#A39688] hidden sm:block">GARANSI MUTU MURNI</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/yellof_logo.jpg"
                alt="Yellof Coffee Official Logo"
                width={220}
                height={75}
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <p className="text-[11px] sm:text-xs text-[#D1C7BD] max-w-sm leading-relaxed">
              Yellof Coffee adalah brand bubuk kopi murni khas Kabupaten Pasaman, Sumatera Barat. Dihadirkan untuk Anda penikmat kopi yang mengutamakan mutu, aroma mantap, dan cita rasa sejati.
            </p>

            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-semibold pt-1 sm:pt-2 flex-wrap">
              <a
                href={`https://instagram.com/${contactData.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#FFDF6D] hover:underline"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {contactData.instagram}
              </a>
              <a
                href={`https://wa.me/${contactData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {contactData.whatsappFormatted}
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
              <li>
                <a href="#beranda" className="hover:text-[#FFDF6D] transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang-kami" className="hover:text-[#FFDF6D] transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#halaman-2" className="hover:text-[#FFDF6D] transition-colors">
                  Produk Varian
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-[#FFDF6D] transition-colors">
                  Keunggulan Kopi Pasaman
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-[#FFDF6D] transition-colors">
                  Kontak & Pemesanan
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Support */}
          <div className="md:col-span-4 space-y-2 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
              Lokasi Produksi & Origin
            </h4>
            <div className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-[#D1C7BD]">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFDF6D] shrink-0 mt-0.5" />
              <span>
                {contactData.address} (Perkebunan Kopi High Altitude)
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#A39688]">
              Menerima pesanan Eceran, Reseller, Grosir, & Suplai Kedai Kopi.
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[#1E1713] mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#807264] gap-1 sm:gap-0">
          <p>© {new Date().getFullYear()} Yellof Coffee. All rights reserved.</p>
          <p>Kopi Robusta Asli Pasaman — Nikmatnya Kopi Berkualitas!</p>
        </div>
      </div>

    </footer>
  );
};
