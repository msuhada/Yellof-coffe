"use client";

import React, { useState } from "react";
import { DELIVERY_PLATFORMS, SUPPORTED_REGIONS } from "@/data/deliveryPlatforms";
import { X, Truck, MapPin, ExternalLink, CheckCircle2, ShoppingBag } from "lucide-react";

interface DeliveryAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWhatsAppOrder: () => void;
}

export const DeliveryAppModal: React.FC<DeliveryAppModalProps> = ({
  isOpen,
  onClose,
  onSelectWhatsAppOrder,
}) => {
  const [selectedArea, setSelectedArea] = useState<string>("Kabupaten Pasaman");

  if (!isOpen) return null;

  const filteredPlatforms = DELIVERY_PLATFORMS.filter(
    (platform) =>
      platform.supportedAreas.includes(selectedArea) ||
      platform.supportedAreas.includes("Seluruh Indonesia")
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#14100E] border-2 border-[#DAA520] rounded-3xl shadow-[0_0_50px_rgba(218,165,32,0.3)] my-8 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1F1814] via-[#2A211B] to-[#1F1814] p-5 border-b border-[#DAA520]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-[#0A0807] flex items-center justify-center font-bold shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Opsi Order Jasa Antar & Ojek Online
              </h3>
              <p className="text-[11px] text-[#FFDF6D]">
                GoFood, ShopeeFood, GrabFood, Maxim & Ekspedisi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#14100E] border border-[#DAA520]/40 text-[#A39688] hover:text-white hover:border-[#DAA520] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Area Selector */}
          <div className="p-4 rounded-2xl bg-[#0D0A08] border border-[#DAA520]/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#FFDF6D] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Pilih Lokasi Area Pengiriman Anda:
              </label>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Layanan Aktif
              </span>
            </div>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#181310] border border-[#DAA520]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#FFDF6D]"
            >
              {SUPPORTED_REGIONS.map((region) => (
                <option key={region} value={region}>
                  📍 {region}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Cards List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Mitra Jasa Antar Tersedia di {selectedArea}:
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {filteredPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="p-4 rounded-xl bg-[#1A1412] border border-[#DAA520]/20 hover:border-[#DAA520]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {platform.name}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#2A211B] text-[#FFDF6D] border border-[#DAA520]/30">
                        {platform.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#A39688]">
                      {platform.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {platform.features.map((f, i) => (
                        <span key={i} className="text-[10px] text-[#D1C7BD] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={platform.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2A211B] border border-[#DAA520]/40 text-[#FFDF6D] hover:bg-[#DAA520] hover:text-[#0A0807] transition-all font-bold text-xs flex items-center justify-center gap-2 shrink-0"
                  >
                    Buka App / Order
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Option Footer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E1713] to-[#2B211B] border border-[#DAA520]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-xs font-bold text-white">Ingin Pemesanan Langsung?</h5>
              <p className="text-[11px] text-[#A39688]">
                Bisa pesan via WhatsApp dengan kurir lokal / paket ekspedisi.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onSelectWhatsAppOrder();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFDF6D] text-[#0A0807] font-extrabold text-xs flex items-center justify-center gap-2 shrink-0 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              ORDER VIA WA ADMIN
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
