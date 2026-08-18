export type OrderStatus = "pending" | "processing" | "shipped" | "completed" | "cancelled";
export type OrderPaymentMethod = "transfer" | "cod" | "qris" | "cash";
export type OrderSource = "website_whatsapp" | "manual_admin" | "walk_in";

export interface OrderItem {
  productId: string;
  productName: string;
  weight: string;
  weightGram: number;
  price: number;
  quantity: number;
  subtotal: number;
  grindType: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  notes?: string;
  items: OrderItem[];
  totalAmount: number;
  totalWeightGram: number;
  status: OrderStatus;
  paymentMethod: OrderPaymentMethod;
  createdAt: string; // ISO date string
  source: OrderSource;
}

export const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-20260818-7721",
    customerName: "Rian Saputra",
    customerPhone: "081267891234",
    customerAddress: "Jl. Sudirman No. 45, Lubuk Sikaping, Pasaman",
    notes: "Tolong gilingan agak halus untuk seduh espresso rumahan",
    items: [
      {
        productId: "yellof-250g",
        productName: "Yellof Coffee Robusta Premium",
        weight: "250 Gram",
        weightGram: 250,
        price: 27000,
        quantity: 2,
        subtotal: 54000,
        grindType: "Giling Halus (Tubruk / Espresso)",
      },
      {
        productId: "yellof-100g",
        productName: "Yellof Coffee Robusta Premium",
        weight: "100 Gram",
        weightGram: 100,
        price: 15000,
        quantity: 1,
        subtotal: 15000,
        grindType: "Giling Halus (Tubruk / Espresso)",
      },
    ],
    totalAmount: 69000,
    totalWeightGram: 600,
    status: "processing",
    paymentMethod: "transfer",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 minutes ago
    source: "website_whatsapp",
  },
  {
    id: "ORD-20260818-6540",
    customerName: "Dedi Kurniawan",
    customerPhone: "085278904561",
    customerAddress: "Komplek Perumahan Indah Blok C2, Bukittinggi",
    notes: "Minta packing kardus tebal",
    items: [
      {
        productId: "yellof-1kg",
        productName: "Yellof Coffee Robusta Premium - Bundle Jumbo",
        weight: "1.000 Gram (1 Kg)",
        weightGram: 1000,
        price: 95000,
        quantity: 1,
        subtotal: 95000,
        grindType: "Biji Utuh (Roasted Beans)",
      },
    ],
    totalAmount: 95000,
    totalWeightGram: 1000,
    status: "shipped",
    paymentMethod: "qris",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    source: "website_whatsapp",
  },
  {
    id: "ORD-20260817-9012",
    customerName: "Siti Rahmawati",
    customerPhone: "081398765432",
    customerAddress: "Jl. Khatib Sulaiman No. 12, Padang Barat, Padang",
    notes: "Kopi untuk stok cafe kecil",
    items: [
      {
        productId: "yellof-500g",
        productName: "Yellof Coffee Robusta Premium",
        weight: "500 Gram",
        weightGram: 500,
        price: 50000,
        quantity: 3,
        subtotal: 150000,
        grindType: "Giling Sedang (V60 / Drip Filter)",
      },
    ],
    totalAmount: 150000,
    totalWeightGram: 1500,
    status: "completed",
    paymentMethod: "transfer",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // yesterday
    source: "website_whatsapp",
  },
  {
    id: "ORD-20260817-4481",
    customerName: "Ahmad Fauzi",
    customerPhone: "082155443322",
    customerAddress: "Pasar Benteng, Rao, Kabupaten Pasaman",
    notes: "Ambil langsung di tempat / COD",
    items: [
      {
        productId: "yellof-250g",
        productName: "Yellof Coffee Robusta Premium",
        weight: "250 Gram",
        weightGram: 250,
        price: 27000,
        quantity: 4,
        subtotal: 108000,
        grindType: "Giling Kasar (French Press / Cold Brew)",
      },
    ],
    totalAmount: 108000,
    totalWeightGram: 1000,
    status: "completed",
    paymentMethod: "cash",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // yesterday
    source: "walk_in",
  },
  {
    id: "ORD-20260816-1192",
    customerName: "Maya Indriani",
    customerPhone: "087811223344",
    customerAddress: "Jl. Veteran No. 8, Payakumbuh",
    items: [
      {
        productId: "yellof-100g",
        productName: "Yellof Coffee Robusta Premium",
        weight: "100 Gram",
        weightGram: 100,
        price: 15000,
        quantity: 2,
        subtotal: 30000,
        grindType: "Giling Halus (Tubruk / Espresso)",
      },
      {
        productId: "yellof-250g",
        productName: "Yellof Coffee Robusta Premium",
        weight: "250 Gram",
        weightGram: 250,
        price: 27000,
        quantity: 1,
        subtotal: 27000,
        grindType: "Giling Halus (Tubruk / Espresso)",
      },
    ],
    totalAmount: 57000,
    totalWeightGram: 450,
    status: "completed",
    paymentMethod: "transfer",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    source: "website_whatsapp",
  },
  {
    id: "ORD-20260816-0831",
    customerName: "Bambang Hermanto",
    customerPhone: "081299887766",
    customerAddress: "Jl. Pemuda No. 10, Pariaman",
    items: [
      {
        productId: "yellof-1kg",
        productName: "Yellof Coffee Robusta Premium - Bundle Jumbo",
        weight: "1.000 Gram (1 Kg)",
        weightGram: 1000,
        price: 95000,
        quantity: 2,
        subtotal: 190000,
        grindType: "Biji Utuh (Roasted Beans)",
      },
    ],
    totalAmount: 190000,
    totalWeightGram: 2000,
    status: "completed",
    paymentMethod: "transfer",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 55).toISOString(),
    source: "website_whatsapp",
  },
];

const ORDERS_STORAGE_KEY = "yellof_orders";

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_SAMPLE_ORDERS;
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Order[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  // Initialize with sample orders if empty
  saveOrders(INITIAL_SAMPLE_ORDERS);
  return INITIAL_SAMPLE_ORDERS;
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function addStoredOrder(order: Order): void {
  const current = getStoredOrders();
  const updated = [order, ...current];
  saveOrders(updated);
}

export function updateStoredOrder(id: string, updates: Partial<Order>): void {
  const current = getStoredOrders();
  const updated = current.map((ord) => (ord.id === id ? { ...ord, ...updates } : ord));
  saveOrders(updated);
}

export function deleteStoredOrder(id: string): void {
  const current = getStoredOrders();
  const updated = current.filter((ord) => ord.id !== id);
  saveOrders(updated);
}

export function resetStoredOrders(): void {
  if (typeof window === "undefined") return;
  saveOrders(INITIAL_SAMPLE_ORDERS);
}
