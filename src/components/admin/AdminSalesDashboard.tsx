"use client";

import React, { useState, useMemo } from "react";
import { Order, OrderStatus, OrderPaymentMethod } from "@/data/orders";
import { ProductVariant } from "@/data/products";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Search,
  Plus,
  Printer,
  Download,
  RotateCcw,
  MessageSquare,
  Eye,
  Trash2,
  X,
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Layers,
  ChevronRight,
  Filter,
  Check,
  Send,
} from "lucide-react";

interface AdminSalesDashboardProps {
  orders: Order[];
  products: ProductVariant[];
  analytics: {
    totalOrders: number;
    completedOrdersCount: number;
    activeOrdersCount: number;
    pendingOrdersCount: number;
    processingOrdersCount: number;
    shippedOrdersCount: number;
    cancelledOrdersCount: number;
    totalRevenue: number;
    completedRevenue: number;
    totalGramsSold: number;
    totalKgSold: string;
    aov: number;
    topSellingProducts: { id: string; name: string; weight: string; quantity: number; revenue: number }[];
    salesTrend: { label: string; revenue: number; count: number }[];
  };
  onAddOrder: (order: Order) => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onDeleteOrder: (id: string) => void;
  onResetOrders: () => void;
}

export const AdminSalesDashboard: React.FC<AdminSalesDashboardProps> = ({
  orders,
  products,
  analytics,
  onAddOrder,
  onUpdateStatus,
  onDeleteOrder,
  onResetOrders,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  // Manual Order Form State
  const [newOrderCustomerName, setNewOrderCustomerName] = useState("");
  const [newOrderPhone, setNewOrderPhone] = useState("");
  const [newOrderAddress, setNewOrderAddress] = useState("");
  const [newOrderNotes, setNewOrderNotes] = useState("");
  const [newOrderProductId, setNewOrderProductId] = useState(products[0]?.id || "");
  const [newOrderQuantity, setNewOrderQuantity] = useState(1);
  const [newOrderGrind, setNewOrderGrind] = useState("Giling Halus (Tubruk / Espresso)");
  const [newOrderPayment, setNewOrderPayment] = useState<OrderPaymentMethod>("cash");
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus>("completed");

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status mapping colors & labels
  const statusConfig: { [key in OrderStatus]: { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> } } = {
    pending: {
      label: "Menunggu Konfirmasi",
      bg: "bg-amber-950/40",
      text: "text-amber-400",
      border: "border-amber-500/40",
      icon: Clock,
    },
    processing: {
      label: "Sedang Diproses",
      bg: "bg-blue-950/40",
      text: "text-blue-400",
      border: "border-blue-500/40",
      icon: Package,
    },
    shipped: {
      label: "Dalam Pengiriman",
      bg: "bg-purple-950/40",
      text: "text-purple-400",
      border: "border-purple-500/40",
      icon: Truck,
    },
    completed: {
      label: "Selesai / Lunas",
      bg: "bg-emerald-950/40",
      text: "text-emerald-400",
      border: "border-emerald-500/40",
      icon: CheckCircle2,
    },
    cancelled: {
      label: "Dibatalkan",
      bg: "bg-red-950/40",
      text: "text-red-400",
      border: "border-red-500/40",
      icon: XCircle,
    },
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery) ||
        (order.customerAddress && order.customerAddress.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatusFilter === "all" || order.status === selectedStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatusFilter]);

  // Max revenue for bar chart scaling
  const maxTrendRevenue = useMemo(() => {
    const max = Math.max(...analytics.salesTrend.map((t) => t.revenue), 100000);
    return max;
  }, [analytics.salesTrend]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["ID Pesanan", "Tanggal", "Nama Pelanggan", "No HP", "Alamat", "Item", "Total (Rp)", "Status", "Metode Bayar", "Sumber"];
    const rows = orders.map((o) => [
      o.id,
      `"${new Date(o.createdAt).toLocaleString("id-ID")}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${(o.customerAddress || "").replace(/"/g, '""')}"`,
      `"${o.items.map((i) => `${i.productName} (${i.weight}) x${i.quantity}`).join("; ")}"`,
      o.totalAmount,
      o.status,
      o.paymentMethod,
      o.source,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `yellof_sales_report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Manual Order Submission
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === newOrderProductId) || products[0];
    if (!prod) return;

    const subtotal = prod.price * newOrderQuantity;
    const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName: newOrderCustomerName,
      customerPhone: newOrderPhone,
      customerAddress: newOrderAddress,
      notes: newOrderNotes,
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          weight: prod.weight,
          weightGram: prod.weightGram,
          price: prod.price,
          quantity: newOrderQuantity,
          subtotal: subtotal,
          grindType: newOrderGrind,
        },
      ],
      totalAmount: subtotal,
      totalWeightGram: prod.weightGram * newOrderQuantity,
      status: newOrderStatus,
      paymentMethod: newOrderPayment,
      createdAt: new Date().toISOString(),
      source: "manual_admin",
    };

    onAddOrder(newOrder);
    setIsAddOrderModalOpen(false);

    // Reset Form
    setNewOrderCustomerName("");
    setNewOrderPhone("");
    setNewOrderAddress("");
    setNewOrderNotes("");
    setNewOrderQuantity(1);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 1. TOP STATS BAR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Omset */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1C1510] via-[#14100E] to-[#0A0807] border border-[#FFC72C]/40 shadow-[0_4px_20px_rgba(255,199,44,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC72C]/10 rounded-full blur-2xl group-hover:bg-[#FFC72C]/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">Total Pendapatan</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFC72C]/15 text-[#FFC72C] flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-base sm:text-2xl font-black text-[#FFC72C] tracking-tight">
            {formatRupiah(analytics.totalRevenue)}
          </div>
          <p className="text-[9px] sm:text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Lunas: {formatRupiah(analytics.completedRevenue)}
          </p>
        </div>

        {/* Total Transaksi */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1A1412] via-[#120E0C] to-[#0A0807] border border-[#DAA520]/25 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">Total Pesanan</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-base sm:text-2xl font-black text-white tracking-tight">
            {analytics.totalOrders} <span className="text-xs sm:text-sm font-normal text-[#A39688]">Transaksi</span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-amber-400 mt-1 flex items-center gap-1 font-medium">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {analytics.activeOrdersCount} Aktif / Dalam Proses
          </div>
        </div>

        {/* Kopi Terjual */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1A1412] via-[#120E0C] to-[#0A0807] border border-[#DAA520]/25 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">Kopi Terjual</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-base sm:text-2xl font-black text-white tracking-tight">
            {analytics.totalKgSold} <span className="text-xs sm:text-sm font-normal text-[#A39688]">Kg</span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#A39688] mt-1">
            Total {analytics.totalGramsSold.toLocaleString("id-ID")} Gram Robusta
          </p>
        </div>

        {/* Rata-rata Nilai Order (AOV) */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1A1412] via-[#120E0C] to-[#0A0807] border border-[#DAA520]/25 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">Rata-rata Order</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-base sm:text-2xl font-black text-white tracking-tight">
            {formatRupiah(analytics.aov)}
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#A39688] mt-1">
            Nilai Belanja Per Pelanggan
          </p>
        </div>

      </div>

      {/* 2. SALES TRENDS & TOP SELLING PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Trend Bar Chart */}
        <div className="lg:col-span-7 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#120E0C] border border-[#DAA520]/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FFC72C]" />
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Tren Penjualan (7 Hari Terakhir)</h3>
            </div>
            <span className="text-[10px] text-[#A39688]">Statistik Harian</span>
          </div>

          <div className="h-44 sm:h-52 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-[#2A211B]">
            {analytics.salesTrend.map((day, idx) => {
              const heightPercent = Math.max(8, Math.round((day.revenue / maxTrendRevenue) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[9px] font-bold text-[#FFC72C] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.revenue > 0 ? `${Math.round(day.revenue / 1000)}k` : "0"}
                  </div>
                  <div className="w-full max-w-[36px] bg-[#1F1814] rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#E6AF2E] via-[#FFC72C] to-[#FFD034] rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#A39688] font-medium truncate w-full text-center">
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#A39688]">
            <span>💡 Data pesanan langsung diperbarui saat ada transaksi baru</span>
            <span className="font-semibold text-[#FFC72C]">Real-time Analytics</span>
          </div>
        </div>

        {/* Top Selling Products Leaderboard */}
        <div className="lg:col-span-5 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#120E0C] border border-[#DAA520]/20 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#FFC72C]" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Varian Terlaris</h3>
              </div>
              <span className="text-[10px] text-[#A39688]">Ranking Produk</span>
            </div>

            <div className="space-y-3">
              {analytics.topSellingProducts.length === 0 ? (
                <p className="text-xs text-[#A39688] text-center py-6">Belum ada data penjualan produk</p>
              ) : (
                analytics.topSellingProducts.map((p, idx) => {
                  const maxQty = Math.max(...analytics.topSellingProducts.map((item) => item.quantity), 1);
                  const progress = Math.round((p.quantity / maxQty) * 100);

                  return (
                    <div key={p.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                            idx === 0 ? "bg-[#FFC72C] text-[#0A0807]" : "bg-[#2A211B] text-[#A39688]"
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-white">{p.weight}</span>
                        </div>
                        <span className="font-bold text-[#FFC72C]">{p.quantity} Pcs ({formatRupiah(p.revenue)})</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1F1814] rounded-full overflow-hidden">
                        <div
                          style={{ width: `${progress}%` }}
                          className={`h-full rounded-full ${
                            idx === 0 ? "bg-gradient-to-r from-[#FFD034] to-[#FFC72C]" : "bg-[#A39688]"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#2A211B] flex items-center justify-between text-[10px] text-[#A39688]">
            <span>Total Varian Aktif: {products.length}</span>
            <span className="text-emerald-400 font-semibold">100% Robusta Pasaman</span>
          </div>
        </div>

      </div>

      {/* 3. ORDER MANAGEMENT & TRANSACTION LIST */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#120E0C] border border-[#DAA520]/20 space-y-4">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#2A211B]">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#FFC72C]" />
              Manajemen Pesanan & Transaksi
            </h3>
            <p className="text-[10px] sm:text-xs text-[#A39688]">
              Kelola status pesanan dari website & WhatsApp secara mudah
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAddOrderModalOpen(true)}
              className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFD034] to-[#E6AF2E] text-[#0A0807] font-black text-[10px] sm:text-xs flex items-center gap-1.5 shadow hover:scale-[1.02] transition-transform"
            >
              <Plus className="w-3.5 h-3.5" />
              + Catat Pesanan Manual
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg bg-[#1A1412] border border-[#DAA520]/30 text-[#FFC72C] hover:bg-[#2A211B] text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Ekspor CSV
            </button>
            <button
              onClick={() => {
                if (confirm("Reset riwayat pesanan ke data awal?")) {
                  onResetOrders();
                }
              }}
              title="Reset Pesanan"
              className="p-2 rounded-lg bg-[#1A1412] border border-red-500/30 text-red-400 hover:bg-red-950/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A39688] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID, nama pelanggan, no WA, atau alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/30 text-white text-xs placeholder:text-[#6B5D4F] focus:outline-none focus:border-[#FFC72C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A39688] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: "all", label: "Semua" },
              { id: "pending", label: "Menunggu" },
              { id: "processing", label: "Diproses" },
              { id: "shipped", label: "Dikirim" },
              { id: "completed", label: "Selesai" },
              { id: "cancelled", label: "Batal" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusFilter(tab.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedStatusFilter === tab.id
                    ? "bg-[#FFC72C] text-[#0A0807] font-bold"
                    : "bg-[#0A0807] text-[#A39688] hover:text-white border border-[#2A211B]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto border border-[#2A211B] rounded-xl bg-[#0A0807]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#14100E] border-b border-[#2A211B] text-[#A39688] uppercase text-[9px] sm:text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3">ID & Tanggal</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Pesanan Produk</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1412]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#A39688]">
                    <Package className="w-8 h-8 mx-auto text-[#4A3F35] mb-2" />
                    Tidak ada transaksi yang cocok dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const statusInfo = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = statusInfo.icon;
                  const waUrl = `https://wa.me/${order.customerPhone.replace(/\D/g, "")}?text=Halo%20kak%20${encodeURIComponent(order.customerName)},%20kami%20dari%20Admin%20Yellof%20Coffee%20mengenai%20pesanan%20${order.id}`;

                  return (
                    <tr key={order.id} className="hover:bg-[#120E0C]/80 transition-colors">
                      
                      {/* ID & Date */}
                      <td className="p-3">
                        <div className="font-bold text-white font-mono text-[11px] sm:text-xs">
                          {order.id}
                        </div>
                        <div className="text-[10px] text-[#A39688] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-2.5 h-2.5" />
                          {formatDate(order.createdAt)}
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="p-3">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <User className="w-3 h-3 text-[#FFC72C]" />
                          {order.customerName}
                        </div>
                        <div className="text-[10px] text-[#A39688] flex items-center gap-1 mt-0.5">
                          <Phone className="w-2.5 h-2.5" />
                          {order.customerPhone}
                        </div>
                        {order.customerAddress && (
                          <div className="text-[9px] text-[#6B5D4F] truncate max-w-[180px] mt-0.5">
                            {order.customerAddress}
                          </div>
                        )}
                      </td>

                      {/* Items */}
                      <td className="p-3 max-w-xs">
                        <div className="space-y-0.5">
                          {order.items.map((it, i) => (
                            <div key={i} className="text-[11px] text-white">
                              <span className="font-bold text-[#FFC72C]">{it.quantity}x</span> {it.weight}
                              <span className="text-[10px] text-[#A39688] block italic">{it.grindType.split("(")[0]}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="p-3">
                        <div className="font-black text-[#FFC72C] text-xs sm:text-sm">
                          {formatRupiah(order.totalAmount)}
                        </div>
                        <div className="text-[9px] text-[#A39688] uppercase font-semibold">
                          {order.paymentMethod}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-3">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                            className={`px-2 py-1 rounded-md text-[10px] font-bold border focus:outline-none appearance-none pr-6 cursor-pointer ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                          >
                            <option value="pending" className="bg-[#14100E] text-amber-400">Menunggu Konfirmasi</option>
                            <option value="processing" className="bg-[#14100E] text-blue-400">Sedang Diproses</option>
                            <option value="shipped" className="bg-[#14100E] text-purple-400">Dalam Pengiriman</option>
                            <option value="completed" className="bg-[#14100E] text-emerald-400">Selesai / Lunas</option>
                            <option value="cancelled" className="bg-[#14100E] text-red-400">Dibatalkan</option>
                          </select>
                          <StatusIcon className={`w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none ${statusInfo.text}`} />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* WhatsApp Chat Button */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat WhatsApp Pelanggan"
                            className="p-1.5 rounded-md bg-[#14100E] text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          {/* View Invoice */}
                          <button
                            onClick={() => setSelectedOrderForInvoice(order)}
                            title="Lihat Struk / Invoice"
                            className="p-1.5 rounded-md bg-[#14100E] text-[#FFC72C] hover:bg-[#FFC72C]/20 border border-[#DAA520]/30 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setOrderToDelete(order)}
                            title="Hapus Pesanan"
                            className="p-1.5 rounded-md bg-[#14100E] text-red-400 hover:bg-red-950/40 border border-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. MODAL: INVOICE / RECEIPT PREVIEW */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#14100E] border-2 border-[#DAA520] rounded-2xl shadow-[0_0_50px_rgba(218,165,32,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="p-4 bg-gradient-to-r from-[#1F1814] via-[#2A211B] to-[#1F1814] border-b border-[#DAA520]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-[#FFC72C]" />
                <h3 className="font-serif text-sm sm:text-base font-bold text-white">
                  Struk / Invoice Pesanan Resmi
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="w-7 h-7 rounded-full bg-[#14100E] text-[#A39688] hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Invoice Content — Printable */}
            <div id="printable-invoice" className="p-5 sm:p-6 space-y-4 overflow-y-auto bg-[#0A0807] text-[#F5EFE6]">
              
              {/* Brand Header */}
              <div className="text-center border-b border-[#2A211B] pb-4 space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded bg-[#FFC72C] text-[#0A0807] text-[10px] font-black uppercase tracking-widest">
                  YELLOF COFFEE
                </div>
                <h2 className="font-serif text-lg font-bold text-white">Kopi Robusta Pasaman</h2>
                <p className="text-[10px] text-[#A39688]">Kabupaten Pasaman, Sumatera Barat | 0821 7103 2691</p>
                <div className="text-[11px] font-mono text-[#FFC72C] font-bold pt-1">
                  INVOICE: {selectedOrderForInvoice.id}
                </div>
              </div>

              {/* Order Info & Customer */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#120E0C] p-3 rounded-lg border border-[#2A211B]">
                <div>
                  <span className="text-[9px] text-[#A39688] uppercase block font-bold">PEMESAN:</span>
                  <p className="font-bold text-white">{selectedOrderForInvoice.customerName}</p>
                  <p className="text-[11px] text-[#D1C7BD]">{selectedOrderForInvoice.customerPhone}</p>
                  <p className="text-[10px] text-[#A39688] mt-1">{selectedOrderForInvoice.customerAddress || "-"}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#A39688] uppercase block font-bold">DETAIL TRANSAKSI:</span>
                  <p className="text-[11px] text-[#D1C7BD]">{formatDate(selectedOrderForInvoice.createdAt)}</p>
                  <p className="text-[10px] text-[#A39688] uppercase mt-0.5">Bayar: {selectedOrderForInvoice.paymentMethod}</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold mt-1 uppercase ${statusConfig[selectedOrderForInvoice.status]?.bg} ${statusConfig[selectedOrderForInvoice.status]?.text}`}>
                    {statusConfig[selectedOrderForInvoice.status]?.label}
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-[#A39688] uppercase tracking-wider">Item Dipesan:</div>
                <div className="divide-y divide-[#1A1412] border border-[#2A211B] rounded-lg overflow-hidden bg-[#120E0C]">
                  {selectedOrderForInvoice.items.map((item, idx) => (
                    <div key={idx} className="p-2.5 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{item.productName} ({item.weight})</p>
                        <p className="text-[10px] text-[#A39688]">{item.grindType} • {item.quantity} x {formatRupiah(item.price)}</p>
                      </div>
                      <span className="font-bold text-[#FFC72C]">{formatRupiah(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-3 rounded-lg bg-[#1A1412] border border-[#FFC72C]/40 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#A39688] uppercase block font-bold">TOTAL TAGIHAN:</span>
                  <span className="font-serif text-xl font-black text-[#FFC72C]">
                    {formatRupiah(selectedOrderForInvoice.totalAmount)}
                  </span>
                </div>
                <div className="text-right text-[10px] text-emerald-400 font-semibold">
                  ✓ Transaksi Resmi Yellof Coffee
                </div>
              </div>

              {selectedOrderForInvoice.notes && (
                <div className="p-2.5 rounded bg-[#120E0C] border border-[#2A211B] text-[11px] text-[#A39688]">
                  <span className="font-bold text-[#FFC72C] block text-[9px] uppercase">Catatan:</span>
                  {selectedOrderForInvoice.notes}
                </div>
              )}

              <div className="text-center pt-2 text-[9px] text-[#6B5D4F]">
                Terima kasih telah mempercayai cita rasa asli Kopi Robusta Pasaman!
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-3 bg-[#14100E] border-t border-[#2A211B] flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="px-3 py-1.5 rounded-lg bg-[#1A1412] text-xs text-[#A39688] hover:text-white"
              >
                Tutup
              </button>
              <button
                onClick={handlePrintInvoice}
                className="px-4 py-1.5 rounded-lg bg-[#FFC72C] text-[#0A0807] text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak Struk
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. MODAL: ADD MANUAL ORDER */}
      {isAddOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#14100E] border-2 border-[#DAA520] rounded-2xl shadow-[0_0_50px_rgba(218,165,32,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 bg-gradient-to-r from-[#1F1814] via-[#2A211B] to-[#1F1814] border-b border-[#DAA520]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#FFC72C]" />
                <h3 className="font-serif text-sm sm:text-base font-bold text-white">
                  Catat Pesanan Manual / Offline
                </h3>
              </div>
              <button
                onClick={() => setIsAddOrderModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#14100E] text-[#A39688] hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="p-4 sm:p-6 space-y-3.5 overflow-y-auto">
              
              {/* Product Selection */}
              <div className="space-y-1">
                <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider block">
                  Pilih Produk & Varian:
                </label>
                <select
                  value={newOrderProductId}
                  onChange={(e) => setNewOrderProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs font-semibold focus:outline-none focus:border-[#FFC72C]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - {p.weight} ({formatRupiah(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Qty & Grind */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Jumlah (Pcs):
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newOrderQuantity}
                    onChange={(e) => setNewOrderQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Opsi Gilingan:
                  </label>
                  <select
                    value={newOrderGrind}
                    onChange={(e) => setNewOrderGrind(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  >
                    <option value="Biji Utuh (Roasted Beans)">Biji Utuh</option>
                    <option value="Giling Halus (Tubruk / Espresso)">Giling Halus</option>
                    <option value="Giling Sedang (V60 / Drip Filter)">Giling Sedang</option>
                    <option value="Giling Kasar (French Press / Cold Brew)">Giling Kasar</option>
                  </select>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Nama Pelanggan:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap"
                    value={newOrderCustomerName}
                    onChange={(e) => setNewOrderCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    No. WhatsApp / HP:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812..."
                    value={newOrderPhone}
                    onChange={(e) => setNewOrderPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                  Alamat Pengiriman (Opsional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Alamat lengkap atau catatan lokasi"
                  value={newOrderAddress}
                  onChange={(e) => setNewOrderAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                />
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Metode Pembayaran:
                  </label>
                  <select
                    value={newOrderPayment}
                    onChange={(e) => setNewOrderPayment(e.target.value as OrderPaymentMethod)}
                    className="w-full px-2.5 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  >
                    <option value="cash">Tunai / Cash</option>
                    <option value="transfer">Transfer Bank</option>
                    <option value="qris">QRIS</option>
                    <option value="cod">COD (Bayar di Tempat)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase block">
                    Status Pesanan:
                  </label>
                  <select
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value as OrderStatus)}
                    className="w-full px-2.5 py-2 rounded-lg bg-[#0A0807] border border-[#DAA520]/40 text-white text-xs focus:outline-none focus:border-[#FFC72C]"
                  >
                    <option value="completed">Selesai / Lunas</option>
                    <option value="processing">Sedang Diproses</option>
                    <option value="shipped">Dalam Pengiriman</option>
                    <option value="pending">Menunggu Pembayaran</option>
                  </select>
                </div>
              </div>

              {/* Subtotal Preview */}
              <div className="p-3 rounded-lg bg-[#0A0807] border border-[#FFC72C]/40 flex items-center justify-between">
                <span className="text-xs text-[#A39688] font-bold">TOTAL ESTIMASI:</span>
                <span className="text-base font-black text-[#FFC72C]">
                  {formatRupiah(((products.find((p) => p.id === newOrderProductId) || products[0])?.price || 0) * newOrderQuantity)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOrderModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1A1412] text-xs text-[#A39688] hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#FFC72C] text-[#0A0807] text-xs font-black shadow hover:scale-[1.02] transition-transform"
                >
                  Simpan Pesanan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: DELETE CONFIRMATION */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-[#14100E] border border-red-500/50 rounded-2xl p-5 space-y-4 text-center shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">Hapus Pesanan Ini?</h3>
              <p className="text-xs text-[#A39688]">
                ID: <span className="font-mono text-white font-bold">{orderToDelete.id}</span> ({orderToDelete.customerName})
              </p>
              <p className="text-[10px] text-red-400/80">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2 rounded-lg bg-[#1A1412] text-xs text-[#A39688] hover:text-white font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteOrder(orderToDelete.id);
                  setOrderToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
