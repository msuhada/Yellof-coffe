export interface StoreSettings {
  storeName: string;
  storeStatus: "open" | "busy" | "closed";
  statusNotice?: string;
  currencySymbol: string;
  minOrderQuantity: number;
  enablePromoBanner: boolean;
  promoBannerText: string;
  availableGrindOptions: string[];
  autoSyncOrders: boolean;
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "Yellof Coffee Pasaman",
  storeStatus: "open",
  statusNotice: "Menerima Pesanan Online & Pengiriman Seluruh Indonesia",
  currencySymbol: "Rp",
  minOrderQuantity: 1,
  enablePromoBanner: true,
  promoBannerText: "☕ PROMO SPESIAL: Freshly Roasted Robusta Pasaman! Pesan sekarang dikirim hari ini.",
  availableGrindOptions: [
    "Biji Utuh (Roasted Beans)",
    "Giling Halus (Tubruk / Espresso)",
    "Giling Sedang (V60 / Drip Filter)",
    "Giling Kasar (French Press / Cold Brew)",
  ],
  autoSyncOrders: true,
};

const STORE_SETTINGS_KEY = "yellof_store_settings";

export function getStoredStoreSettings(): StoreSettings {
  if (typeof window === "undefined") return DEFAULT_STORE_SETTINGS;
  try {
    const stored = localStorage.getItem(STORE_SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as StoreSettings;
      if (parsed && Array.isArray(parsed.availableGrindOptions)) {
        return { ...DEFAULT_STORE_SETTINGS, ...parsed };
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_STORE_SETTINGS;
}

export function saveStoreSettings(settings: StoreSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(settings));
}

export function resetStoreSettings(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORE_SETTINGS_KEY);
}
