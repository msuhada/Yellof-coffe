"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Coffee, MessageCircle, Menu, X } from "lucide-react";
import { YELLOF_CONTACT } from "@/data/products";

interface HeaderProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenDeliveryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal, onOpenDeliveryModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "BERANDA", href: "#beranda" },
    { name: "TENTANG KAMI", href: "#tentang-kami" },
    { name: "PRODUK", href: "#halaman-2" },
    { name: "KEUNGGULAN", href: "#keunggulan" },
    { name: "TESTIMONI", href: "#testimoni" },
    { name: "KONTAK", href: "#kontak" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0807]/95 backdrop-blur-md border-b border-[#DAA520]/20 py-2.5 shadow-2xl"
          : "bg-gradient-to-b from-[#0A0807]/90 via-[#0A0807]/50 to-transparent py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Official Yellof Coffee Logo Image */}
        <a href="#beranda" className="flex items-center group">
          <Image
            src="/images/yellof_logo.jpg"
            alt="Yellof Coffee Official Logo"
            width={200}
            height={70}
            className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs lg:text-sm font-bold tracking-wider py-1 transition-all ${
                link.name === "BERANDA"
                  ? "text-[#FFC72C] border-b-2 border-[#FFC72C]"
                  : "text-[#E2D9D0] hover:text-[#FFC72C]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button: ORDER SEKARANG with WhatsApp icon in yellow pill matching reference */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDeliveryModal}
            className="text-xs font-semibold px-3 py-2 rounded-full border border-[#FFC72C]/40 text-[#FFC72C] hover:bg-[#FFC72C]/10 transition-colors"
          >
            Ojek Online 🛵
          </button>

          <button
            onClick={() => onOpenOrderModal()}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-extrabold text-xs lg:text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(255,199,44,0.35)] hover:scale-105 transition-transform"
          >
            <span>ORDER SEKARANG</span>
            <div className="w-6 h-6 rounded-full bg-[#0A0807] flex items-center justify-center text-[#FFC72C]">
              <MessageCircle className="w-3.5 h-3.5 fill-[#FFC72C]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#FFC72C] p-2 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0C0A]/95 backdrop-blur-xl border-b border-[#FFC72C]/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold tracking-wider text-[#E2D9D0] hover:text-[#FFC72C] py-2 border-b border-[#2A221C]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD034] to-[#E6AF2E] text-[#0A0807] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-[#0A0807]" />
              ORDER VIA WHATSAPP ({YELLOF_CONTACT.whatsappFormatted})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
