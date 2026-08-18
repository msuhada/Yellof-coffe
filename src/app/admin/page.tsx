"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSalesDashboard } from "@/components/admin/AdminSalesDashboard";
import { AdminProductMaster } from "@/components/admin/AdminProductMaster";
import { AdminMasterSettings } from "@/components/admin/AdminMasterSettings";
import { AdminContactEditor } from "@/components/admin/AdminContactEditor";
import { useProducts } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import { ProductVariant, YellofContact, saveProducts, saveContact } from "@/data/products";
import { Order, OrderStatus, saveOrders } from "@/data/orders";
import { StoreSettings, saveStoreSettings } from "@/data/storeSettings";
import {
  Coffee,
  LogOut,
  Package,
  Phone,
  LayoutDashboard,
  TrendingUp,
  Settings,
  ExternalLink,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"sales" | "products" | "settings" | "contact">("sales");
  const [toast, setToast] = useState<string | null>(null);

  const { products, contact, isLoaded: isProductsLoaded, updateProducts, updateContact, resetToDefaults } = useProducts();
  const { orders, isLoaded: isOrdersLoaded, analytics, addOrder, updateOrderStatus, deleteOrder, resetOrders } = useOrders();
  const { settings, isLoaded: isSettingsLoaded, updateSettings, resetSettings } = useStoreSettings();

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

  const handleSaveProducts = (newProducts: ProductVariant[]) => {
    updateProducts(newProducts);
    showToast("✅ Konfigurasi produk berhasil diperbarui!");
  };

  const handleResetProducts = () => {
    resetToDefaults();
    showToast("🔄 Produk telah direset ke data default.");
  };

  const handleSaveSettings = (newSettings: StoreSettings) => {
    updateSettings(newSettings);
    showToast("✅ Pengaturan master toko berhasil disimpan!");
  };

  const handleResetSettings = () => {
    resetSettings();
    showToast("🔄 Pengaturan toko telah direset ke default.");
  };

  const handleSaveContact = (newContact: YellofContact) => {
    updateContact(newContact);
    showToast("✅ Data kontak & password berhasil disimpan!");
  };

  const handleRestoreAllData = (data: { products?: ProductVariant[]; orders?: Order[]; settings?: StoreSettings; contact?: YellofContact }) => {
    if (data.products) {
      updateProducts(data.products);
      saveProducts(data.products);
    }
    if (data.orders) {
      saveOrders(data.orders);
    }
    if (data.settings) {
      updateSettings(data.settings);
      saveStoreSettings(data.settings);
    }
    if (data.contact) {
      updateContact(data.contact);
      saveContact(data.contact);
    }
    showToast("✅ Seluruh data berhasil dipulihkan!");
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  if (!isProductsLoaded || !isOrdersLoaded || !isSettingsLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0807] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFC72C]/30 border-t-[#FFC72C] rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "sales" as const, label: "Dashboard Penjualan", icon: TrendingUp, badge: `${analytics.activeOrdersCount} Aktif` },
    { id: "products" as const, label: "Master Produk", icon: Package, badge: `${products.length} Varian` },
    { id: "settings" as const, label: "Master Setting", icon: Settings },
    { id: "contact" as const, label: "Kontak & Password", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#0A0807] text-[#F5EFE6]">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#14100E] border border-[#FFC72C]/50 text-white text-[11px] sm:text-xs font-semibold shadow-[0_0_30px_rgba(255,199,44,0.25)] animate-toast max-w-[90vw]">
          {toast}
        </div>
      )}

      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0807]/95 backdrop-blur-md border-b border-[#DAA520]/20">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] flex items-center justify-center shadow-md shadow-[#FFC72C]/20">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0807]" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC72C]" />
                ADMIN PANEL
                <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-full bg-[#FFC72C]/15 border border-[#FFC72C]/30 text-[#FFC72C] font-extrabold uppercase ml-1">
                  PRO
                </span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-[#A39688]">
                {settings.storeName || "Yellof Coffee Pasaman"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#A39688] hover:text-[#FFC72C] border border-[#2A211B] hover:border-[#DAA520]/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Website
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-[#1A1412] border border-red-500/30 text-red-400 hover:bg-red-950/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[56px] sm:top-[68px] z-30 bg-[#0D0A08] border-b border-[#1E1713]">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-3 sm:px-5 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "text-[#FFC72C] border-[#FFC72C] bg-[#14100E]/50"
                      : "text-[#A39688] border-transparent hover:text-white hover:border-[#A39688]/30"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-[#FFC72C]" : "text-[#A39688]"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? "bg-[#FFC72C] text-[#0A0807]" : "bg-[#1A1412] text-[#A39688] border border-[#2A211B]"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        
        {/* Tab 1: Sales Dashboard */}
        {activeTab === "sales" && (
          <AdminSalesDashboard
            orders={orders}
            products={products}
            analytics={analytics}
            onAddOrder={addOrder}
            onUpdateStatus={updateOrderStatus}
            onDeleteOrder={deleteOrder}
            onResetOrders={resetOrders}
          />
        )}

        {/* Tab 2: Master Product CRUD */}
        {activeTab === "products" && (
          <AdminProductMaster
            products={products}
            onSave={handleSaveProducts}
            onReset={handleResetProducts}
          />
        )}

        {/* Tab 3: Master Store Settings */}
        {activeTab === "settings" && (
          <AdminMasterSettings
            settings={settings}
            products={products}
            orders={orders}
            contact={contact}
            onSaveSettings={handleSaveSettings}
            onResetSettings={handleResetSettings}
            onRestoreAllData={handleRestoreAllData}
          />
        )}

        {/* Tab 4: Contact & Password */}
        {activeTab === "contact" && (
          <AdminContactEditor
            contact={contact}
            onSave={handleSaveContact}
          />
        )}

      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#1E1713] py-5 sm:py-6 mt-12 bg-[#080605]">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 text-xs text-[#A39688]">
            <Coffee className="w-4 h-4 text-[#FFC72C]" />
            <span className="font-bold text-white">Yellof Coffee Admin Panel PRO</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#6B5D4F]">
            Sistem terintegrasi otomatis dengan penyimpanan browser (localStorage & real-time sync)
          </p>
          <p className="text-[9px] text-[#4A3F35]">
            © {new Date().getFullYear()} Yellof Coffee Nagari Pasaman — All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
