"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MainOverviewGrid } from "@/components/MainOverviewGrid";
import { AboutSection } from "@/components/AboutSection";
import { ProductCatalog } from "@/components/ProductCatalog";
import { KeunggulanSection } from "@/components/KeunggulanSection";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { Footer } from "@/components/Footer";
import { OrderModal } from "@/components/OrderModal";
import { DeliveryAppModal } from "@/components/DeliveryAppModal";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);

  // Dynamic product/contact data from localStorage (admin-editable)
  const { products, contact } = useProducts();

  const handleOpenOrderModal = (productId?: string) => {
    setSelectedProductId(productId);
    setIsOrderModalOpen(true);
  };

  const handleOpenDeliveryModal = () => {
    setIsDeliveryModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0807] text-[#F5EFE6] relative selection:bg-[#FFC72C] selection:text-[#0A0807]">
      {/* Fixed Luxury Header Navigation */}
      <Header
        onOpenOrderModal={handleOpenOrderModal}
        onOpenDeliveryModal={handleOpenDeliveryModal}
        contact={contact}
      />

      {/* HALAMAN 1: Hero Banner Widescreen Persis Gambar Referensi */}
      <Hero onOpenOrderModal={() => handleOpenOrderModal()} />

      {/* ROW 2: Overview Grid 3 Kolom Persis Gambar Referensi (Tentang Kami, Produk Kami, Keunggulan & WA QR) */}
      <MainOverviewGrid
        onOpenOrderModal={handleOpenOrderModal}
        onOpenDeliveryModal={handleOpenDeliveryModal}
        contact={contact}
      />

      {/* HALAMAN KE-2 DETAIL: Katalog Lengkap, Keunggulan Detail, Testimoni & Footer */}
      <div className="relative z-10">
        
        {/* Detail Story Section */}
        <AboutSection />

        {/* Full Interactive Product Catalog Varian (100g, 250g Best Seller, 500g, 1kg) */}
        <ProductCatalog
          onOpenOrderModal={handleOpenOrderModal}
          onOpenDeliveryModal={handleOpenDeliveryModal}
          products={products}
          contact={contact}
        />

        {/* Keunggulan Detail Section */}
        <KeunggulanSection />

        {/* Testimoni Pelanggan */}
        <Testimonials />

        {/* WhatsApp Banner & Guarantee */}
        <WhatsAppSection
          onOpenOrderModal={() => handleOpenOrderModal()}
          contact={contact}
        />

        {/* Footer & Bar Garansi Pengiriman */}
        <Footer contact={contact} />
      </div>

      {/* Interactive WhatsApp Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialProductId={selectedProductId}
        products={products}
        contact={contact}
      />

      {/* Interactive Delivery App Modal (Gojek / GoFood, ShopeeFood, GrabFood, Maxim) */}
      <DeliveryAppModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        onSelectWhatsAppOrder={() => handleOpenOrderModal()}
      />
    </main>
  );
}
