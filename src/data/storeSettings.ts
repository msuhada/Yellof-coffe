export interface HeroSectionSettings {
  tagline: string;
  headline1: string;
  headlineHighlight: string;
  headline3: string;
  description: string;
  bgImage: string;
}

export interface AboutSectionSettings {
  badge: string;
  title: string;
  titleHighlight: string;
  image: string;
  locationTitle: string;
  locationSubtitle: string;
  description1: string;
  description2: string;
  features: string[];
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface KeunggulanCardItem {
  id: string;
  title: string;
  desc: string;
}

export interface KeunggulanSectionSettings {
  badge: string;
  title: string;
  titleHighlight: string;
  image: string;
  imageQuote: string;
  cards: KeunggulanCardItem[];
  checklist: string[];
}

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

  // Customizable Media & Site Content
  hero: HeroSectionSettings;
  about: AboutSectionSettings;
  gallery: GalleryPhotoItem[];
  keunggulan: KeunggulanSectionSettings;
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

  // Default Hero Settings
  hero: {
    tagline: "Nikmatnya Kopi Asli Pasaman",
    headline1: "KOPI NIKMAT,",
    headlineHighlight: "SEMANGAT",
    headline3: "BERLIPAT!",
    description: "Dibuat dari biji kopi robusta pilihan terbaik yang dipetik langsung dari perkebunan di Kabupaten Pasaman dengan aroma kuat, rasa mantap, dan kualitas premium di setiap tegukan.",
    bgImage: "/images/user_provided_bg.jpg",
  },

  // Default About Us Settings
  about: {
    badge: "TENTANG KAMI",
    title: "YELLOF COFFEE",
    titleHighlight: "KOPI ASLI NAGARI",
    image: "/images/pasaman_plantation.png",
    locationTitle: "Kabupaten Pasaman, Sumatera Barat",
    locationSubtitle: "Lahan Perkebunan Kopi Subur Ketinggian 800 - 1.200 MDPL",
    description1: "Kami berkomitmen menghadirkan kopi robusta berkualitas tinggi langsung dari perkebunan subur di Kabupaten Pasaman untuk Anda yang menghargai cita rasa kopi sesungguhnya.",
    description2: "Dipetik hanya saat buah kopi berwarna merah sempurna (Petik Merah), diproses secara higienis, dan disangrai secara terukur untuk memunculkan kombinasi aroma khas yang bold, rasa mantap tanpa ampas, dan tingkat keasaman yang aman di lambung.",
    features: [
      "100% Biji Robusta Pilihan",
      "Petik Merah Berkualitas",
      "Sangrai Terukur & Fresh",
      "Warisan Cita Rasa Nagari",
      "Tanpa Esens & Pengawet",
      "Sudah Teruji Di Gemari Penikmat Kopi",
    ],
  },

  // Default Gallery Photos (4 cards)
  gallery: [
    {
      id: "gal-1",
      src: "/images/grid_1_hot_ceramic.jpg",
      title: "Cangkir Ceramic Kopi Hitam",
      caption: "Aroma Mantap & Panas Khas Pasaman",
    },
    {
      id: "gal-2",
      src: "/images/grid_2_iced_coffee.jpg",
      title: "Es Kopi Robusta Segar",
      caption: "Dingin, Segar & Energik Seharian",
    },
    {
      id: "gal-3",
      src: "/images/grid_3_pouch_package.jpg",
      title: "Kemasan Pouch Zipper 100% Murni",
      caption: "Kedap Air & Udara (Fresh Roasted)",
    },
    {
      id: "gal-4",
      src: "/images/grid_4_hot_glass.jpg",
      title: "Glass Cup Hot Espresso Bold",
      caption: "Specialty Robusta High Altitude Pasaman",
    },
  ],

  // Default Keunggulan Settings
  keunggulan: {
    badge: "MENGAPA MEMILIH YELLOF COFFEE",
    title: "KEUNGGULAN KOPI",
    titleHighlight: "ROBUSTA PASAMAN",
    image: "/images/coffee_cherries.png",
    imageQuote: '"Hanya Buah Kopi Merah Pilihan Yang Diolah"',
    cards: [
      {
        id: "k-1",
        title: "Aroma Kuat & Khas Nagari",
        desc: "Menghadirkan wangi aroma khas kopi robusta asli pegunungan Pasaman yang menyerbak seketika diseduh.",
      },
      {
        id: "k-2",
        title: "Rasa Lebih Bold & Mantap",
        desc: "Tekstur kental dengan karakter bitter-sweet alami tanpa rasa asam menusuk di lidah.",
      },
      {
        id: "k-3",
        title: "Kandungan Kafein Alami Tinggi",
        desc: "Memberikan suntikan energi dan fokus ekstra untuk mendampingi produktivitas aktivitas Anda seharian.",
      },
      {
        id: "k-4",
        title: "Cocok Untuk Teman Aktivitas",
        desc: "Dapat dinikmati hitam murni, tubruk tradisional, maupun dicampur susu dan gula aren favorit Anda.",
      },
    ],
    checklist: [
      "Aroma kuat dan khas",
      "Rasa lebih bold & mantap",
      "Kafein alami tinggi",
      "Tanpa bahan kimia/esens",
    ],
  },
};

export function normalizeStoreSettings(raw?: Partial<StoreSettings> | null): StoreSettings {
  if (!raw || typeof raw !== "object") return DEFAULT_STORE_SETTINGS;

  return {
    ...DEFAULT_STORE_SETTINGS,
    ...raw,
    hero: {
      ...DEFAULT_STORE_SETTINGS.hero,
      ...(raw.hero || {}),
    },
    about: {
      ...DEFAULT_STORE_SETTINGS.about,
      ...(raw.about || {}),
      features:
        Array.isArray(raw.about?.features) && raw.about.features.length > 0
          ? raw.about.features
          : DEFAULT_STORE_SETTINGS.about.features,
    },
    gallery:
      Array.isArray(raw.gallery) && raw.gallery.length > 0
        ? raw.gallery.map((g, i) => ({
            ...DEFAULT_STORE_SETTINGS.gallery[i % DEFAULT_STORE_SETTINGS.gallery.length],
            ...g,
          }))
        : DEFAULT_STORE_SETTINGS.gallery,
    keunggulan: {
      ...DEFAULT_STORE_SETTINGS.keunggulan,
      ...(raw.keunggulan || {}),
      cards:
        Array.isArray(raw.keunggulan?.cards) && raw.keunggulan.cards.length > 0
          ? raw.keunggulan.cards.map((c, i) => ({
              ...DEFAULT_STORE_SETTINGS.keunggulan.cards[i % DEFAULT_STORE_SETTINGS.keunggulan.cards.length],
              ...c,
            }))
          : DEFAULT_STORE_SETTINGS.keunggulan.cards,
      checklist:
        Array.isArray(raw.keunggulan?.checklist) && raw.keunggulan.checklist.length > 0
          ? raw.keunggulan.checklist
          : DEFAULT_STORE_SETTINGS.keunggulan.checklist,
    },
    availableGrindOptions:
      Array.isArray(raw.availableGrindOptions) && raw.availableGrindOptions.length > 0
        ? raw.availableGrindOptions
        : DEFAULT_STORE_SETTINGS.availableGrindOptions,
  };
}

const STORE_SETTINGS_KEY = "yellof_store_settings";

export function getStoredStoreSettings(): StoreSettings {
  if (typeof window === "undefined") return DEFAULT_STORE_SETTINGS;
  try {
    const stored = localStorage.getItem(STORE_SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<StoreSettings>;
      return normalizeStoreSettings(parsed);
    }
  } catch {
    // fallback
  }
  return DEFAULT_STORE_SETTINGS;
}

export function saveStoreSettings(settings: StoreSettings): void {
  if (typeof window === "undefined") return;
  const normalized = normalizeStoreSettings(settings);
  localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(normalized));
}

export function resetStoreSettings(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORE_SETTINGS_KEY);
}
