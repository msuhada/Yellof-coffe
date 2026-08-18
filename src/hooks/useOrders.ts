"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Order,
  OrderStatus,
  getStoredOrders,
  saveOrders,
  addStoredOrder,
  updateStoredOrder,
  deleteStoredOrder,
  resetStoredOrders,
  INITIAL_SAMPLE_ORDERS,
} from "@/data/orders";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_SAMPLE_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setOrders(getStoredOrders());
    setIsLoaded(true);
  }, []);

  // Listen for storage changes from other tabs or customer orders
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "yellof_orders") {
        setOrders(getStoredOrders());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      saveOrders(updated);
      return updated;
    });
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === id ? { ...ord, status } : ord));
      saveOrders(updated);
      return updated;
    });
  }, []);

  const updateOrder = useCallback((id: string, updates: Partial<Order>) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === id ? { ...ord, ...updates } : ord));
      saveOrders(updated);
      return updated;
    });
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => {
      const updated = prev.filter((ord) => ord.id !== id);
      saveOrders(updated);
      return updated;
    });
  }, []);

  const resetOrders = useCallback(() => {
    resetStoredOrders();
    setOrders(INITIAL_SAMPLE_ORDERS);
  }, []);

  // Analytics calculation
  const analytics = useMemo(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter((o) => o.status === "completed");
    const activeOrders = orders.filter((o) => o.status === "pending" || o.status === "processing" || o.status === "shipped");
    const pendingOrders = orders.filter((o) => o.status === "pending");
    const processingOrders = orders.filter((o) => o.status === "processing");
    const shippedOrders = orders.filter((o) => o.status === "shipped");
    const cancelledOrders = orders.filter((o) => o.status === "cancelled");

    // Total Revenue from valid (non-cancelled) orders
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const completedRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Total grams sold
    const totalGramsSold = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.totalWeightGram || 0), 0);

    // Average Order Value
    const validOrdersCount = orders.filter((o) => o.status !== "cancelled").length;
    const aov = validOrdersCount > 0 ? Math.round(totalRevenue / validOrdersCount) : 0;

    // Best Selling Products breakdown
    const productSalesMap: { [id: string]: { name: string; weight: string; quantity: number; revenue: number } } = {};
    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((order) => {
        order.items.forEach((item) => {
          if (!productSalesMap[item.productId]) {
            productSalesMap[item.productId] = {
              name: item.productName,
              weight: item.weight,
              quantity: 0,
              revenue: 0,
            };
          }
          productSalesMap[item.productId].quantity += item.quantity;
          productSalesMap[item.productId].revenue += item.subtotal;
        });
      });

    const topSellingProducts = Object.entries(productSalesMap)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity);

    // Daily trends for the last 7 days
    const days: { [dateStr: string]: { label: string; revenue: number; count: number } } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" });
      days[dateKey] = { label: dayName, revenue: 0, count: 0 };
    }

    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((order) => {
        const orderDateKey = new Date(order.createdAt).toISOString().split("T")[0];
        if (days[orderDateKey]) {
          days[orderDateKey].revenue += order.totalAmount;
          days[orderDateKey].count += 1;
        }
      });

    const salesTrend = Object.values(days);

    return {
      totalOrders,
      completedOrdersCount: completedOrders.length,
      activeOrdersCount: activeOrders.length,
      pendingOrdersCount: pendingOrders.length,
      processingOrdersCount: processingOrders.length,
      shippedOrdersCount: shippedOrders.length,
      cancelledOrdersCount: cancelledOrders.length,
      totalRevenue,
      completedRevenue,
      totalGramsSold,
      totalKgSold: (totalGramsSold / 1000).toFixed(1),
      aov,
      topSellingProducts,
      salesTrend,
    };
  }, [orders]);

  return {
    orders,
    isLoaded,
    analytics,
    addOrder,
    updateOrderStatus,
    updateOrder,
    deleteOrder,
    resetOrders,
  };
}
