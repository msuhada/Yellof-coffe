"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminProductEditor } from "@/components/admin/AdminProductEditor";
import { AdminContactEditor } from "@/components/admin/AdminContactEditor";
import { useProducts } from "@/hooks/useProducts";
import {
  Coffee,
  LogOut,
  Package,
  Phone,
  LayoutDashboard,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "contact">("products");
  const [toast, setToast] = useState<string | null>(null);

  const { products, contact, isLoaded, updateProducts, updateContact, resetToDefaults } = useProducts();

  // Check session on mount
  useEffect(() => {
    const session = sessionStorage.getItem("yellof_admin_session");
    if (session === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("yellof_admin_session");
    setIsLoggedIn(false);
  };

  const handleSaveProducts = (newProducts: typeof products) => {
    updateProducts(newProducts);
    showToast("✅ Produk berhasil disimpan! Perubahan langsung diterapkan.");
  };

  const handleResetProducts = () => {
    resetToDefaults();
    showToast("🔄 Semua data telah direset ke default.");
    // Force page reload to get fresh data
    window.location.reload();
  };

  const handleSaveContact = (newContact: typeof contact) => {
    updateContact(newContact);
    showToast("✅ Data kontak berhasil disimpan!");
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0807] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFC72C]/30 border-t-[#FFC72C] rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "products" as const, label: "Produk & Harga", icon: Package },
    { id: "contact" as const, label: "Kontak & Password", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#0A0807] text-[#F5EFE6]">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#14100E] border border-[#FFC72C]/50 text-white text-[11px] sm:text-xs font-semibold shadow-[0_0_30px_rgba(255,199,44,0.2)] animate-toast max-w-[90vw]">
          {toast}
        </div>
      )}

      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0807]/95 backdrop-blur-md border-b border-[#DAA520]/20">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FFD034] to-[#E6AF2E] flex items-center justify-center shadow-md">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0807]" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC72C]" />
                ADMIN PANEL
              </h1>
              <p className="text-[9px] sm:text-[10px] text-[#A39688]">Yellof Coffee Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs text-[#A39688] hover:text-[#FFC72C] border border-[#2A211B] hover:border-[#DAA520]/40 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Lihat Website
            </a>
            <button
              onClick={handleLogout}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#1A1412] border border-red-500/30 text-red-400 hover:bg-red-950/30 text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[52px] sm:top-[64px] z-30 bg-[#0D0A08] border-b border-[#1E1713]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-3 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "text-[#FFC72C] border-[#FFC72C]"
                      : "text-[#A39688] border-transparent hover:text-white hover:border-[#A39688]/30"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#14100E] border border-[#DAA520]/20 text-center space-y-0.5"
            >
              <span className="text-[9px] sm:text-[10px] text-[#A39688] font-bold uppercase">{p.weight}</span>
              <div className="text-xs sm:text-sm font-black text-[#FFC72C]">
                Rp {p.price.toLocaleString("id-ID")}
              </div>
              {p.isBestSeller && (
                <span className="text-[7px] sm:text-[8px] font-bold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded inline-block">
                  BEST SELLER
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        {activeTab === "products" && (
          <AdminProductEditor
            products={products}
            onSave={handleSaveProducts}
            onReset={handleResetProducts}
          />
        )}

        {activeTab === "contact" && (
          <AdminContactEditor
            contact={contact}
            onSave={handleSaveContact}
          />
        )}

      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#1E1713] py-4 sm:py-6 mt-8">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 text-center space-y-1">
          <p className="text-[10px] sm:text-[11px] text-[#6B5D4F]">
            Yellof Coffee Admin Panel — Perubahan disimpan di browser (localStorage)
          </p>
          <p className="text-[9px] sm:text-[10px] text-[#4A3F35]">
            © {new Date().getFullYear()} Yellof Coffee Pasaman
          </p>
        </div>
      </footer>
    </div>
  );
}
