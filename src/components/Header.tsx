"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Coffee, MessageCircle, Menu, X, Truck, Megaphone, Sparkles, ArrowRight } from "lucide-react";
import { YellofContact, DEFAULT_YELLOF_CONTACT } from "@/data/products";

interface HeaderProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenDeliveryModal: () => void;
  contact?: YellofContact;
  promoBanner?: {
    enabled: boolean;
    text: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  onOpenOrderModal,
  onOpenDeliveryModal,
  contact,
  promoBanner,
}) => {
  const contactData = contact || DEFAULT_YELLOF_CONTACT;
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
          ? "bg-[#0A0807]/95 backdrop-blur-md border-b border-[#DAA520]/20 shadow-2xl"
          : "bg-gradient-to-b from-[#0A0807]/95 via-[#0A0807]/80 to-[#0A0807]/40"
      }`}
    >
      {/* 1. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 flex items-center justify-between">
        
        {/* Official Yellof Coffee Logo Image */}
        <a href="#beranda" className="flex items-center group shrink-0">
          <Image
            src="/images/yellof_logo.png"
            alt="Yellof Coffee Official Logo"
            width={220}
            height={80}
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[11px] lg:text-xs xl:text-sm font-bold tracking-wider py-1 transition-all whitespace-nowrap ${
                link.name === "BERANDA"
                  ? "text-[#FFC72C] border-b-2 border-[#FFC72C]"
                  : "text-[#E2D9D0] hover:text-[#FFC72C]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons — hidden on mobile, visible from sm up */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          <button
            onClick={onOpenDeliveryModal}
            className="text-[10px] lg:text-xs font-semibold px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-full border border-[#FFC72C]/40 text-[#FFC72C] hover:bg-[#FFC72C]/10 transition-colors whitespace-nowrap"
          >
            Ojek Online 🛵
          </button>

          <button
            onClick={() => onOpenOrderModal()}
            className="px-3 lg:px-5 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-extrabold text-[10px] lg:text-xs xl:text-sm flex items-center gap-1.5 lg:gap-2 shadow-[0_4px_20px_rgba(255,199,44,0.35)] hover:scale-105 transition-transform whitespace-nowrap"
          >
            <span>ORDER SEKARANG</span>
            <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#0A0807] flex items-center justify-center text-[#FFC72C]">
              <MessageCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-[#FFC72C]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#FFC72C] p-1.5 sm:p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
        </button>
      </div>

      {/* 2. DYNAMIC CONTINUOUS MARQUEE PROMO BANNER */}
      {promoBanner?.enabled && promoBanner?.text && (
        <div
          onClick={() => onOpenOrderModal()}
          role="button"
          tabIndex={0}
          title="Klik untuk langsung memesan promo kopi via WhatsApp!"
          className="group relative w-full cursor-pointer overflow-hidden bg-gradient-to-r from-[#E6AF2E] via-[#FFD034] to-[#FFC72C] text-[#0A0807] border-t border-b border-[#0A0807]/25 shadow-lg transition-all duration-300 hover:brightness-105 animate-shimmer animate-promo-glow flex items-center py-1.5 sm:py-2"
        >
          {/* Left Pinned Badge with dark gradient shadow */}
          <div className="relative z-10 pl-3 sm:pl-5 pr-2 sm:pr-3 bg-gradient-to-r from-[#E6AF2E] via-[#E6AF2E] to-transparent flex items-center shrink-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A0807] text-[#FFC72C] text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Sparkles className="w-3 h-3 text-[#FFC72C] animate-spin" style={{ animationDuration: "6s" }} />
              <span>PROMO</span>
            </div>
          </div>

          {/* Marquee Scrolling Text Track */}
          <div className="overflow-hidden relative flex-1 whitespace-nowrap mask-gradient">
            <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
              
              {/* Item 1 */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-wide text-[#0A0807]">
                <Megaphone className="w-3.5 h-3.5 shrink-0 text-[#0A0807] animate-bounce" />
                <span>{promoBanner.text}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0807]/15 text-[10px] font-black group-hover:bg-[#0A0807] group-hover:text-[#FFC72C] transition-colors ml-1">
                  Pesan Sekarang <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Separator */}
              <span className="text-xs opacity-60">✦ ☕ ✦</span>

              {/* Item 2 (Duplicate for infinite smooth loop) */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-wide text-[#0A0807]">
                <Megaphone className="w-3.5 h-3.5 shrink-0 text-[#0A0807] animate-bounce" />
                <span>{promoBanner.text}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0807]/15 text-[10px] font-black group-hover:bg-[#0A0807] group-hover:text-[#FFC72C] transition-colors ml-1">
                  Pesan Sekarang <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Separator */}
              <span className="text-xs opacity-60">✦ ☕ ✦</span>

              {/* Item 3 */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-wide text-[#0A0807]">
                <Megaphone className="w-3.5 h-3.5 shrink-0 text-[#0A0807] animate-bounce" />
                <span>{promoBanner.text}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0807]/15 text-[10px] font-black group-hover:bg-[#0A0807] group-hover:text-[#FFC72C] transition-colors ml-1">
                  Pesan Sekarang <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Separator */}
              <span className="text-xs opacity-60">✦ ☕ ✦</span>

              {/* Item 4 */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-wide text-[#0A0807]">
                <Megaphone className="w-3.5 h-3.5 shrink-0 text-[#0A0807] animate-bounce" />
                <span>{promoBanner.text}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0807]/15 text-[10px] font-black group-hover:bg-[#0A0807] group-hover:text-[#FFC72C] transition-colors ml-1">
                  Pesan Sekarang <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Mobile Drawer — Full overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#0F0C0A]/98 backdrop-blur-xl z-40 animate-fadeIn overflow-y-auto">
          <div className="px-5 sm:px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold tracking-wider text-[#E2D9D0] hover:text-[#FFC72C] py-3 border-b border-[#2A221C] flex items-center justify-between group transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-[#FFC72C]/0 group-hover:text-[#FFC72C] transition-colors">→</span>
                </a>
              ))}
            </div>

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD034] to-[#E6AF2E] text-[#0A0807] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-[#0A0807]" />
                ORDER VIA WHATSAPP ({contactData.whatsappFormatted})
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeliveryModal();
                }}
                className="w-full py-3 rounded-2xl bg-[#1A1412] border border-[#FFC72C]/40 text-[#FFC72C] font-bold text-sm flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                PESAN VIA OJEK ONLINE 🛵
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
