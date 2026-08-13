export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  weightGram: number;
  price: number;
  originalPrice?: number;
  badge?: string;
  isBestSeller?: boolean;
  description: string;
  features: string[];
}

export const YELLOF_PRODUCTS: ProductVariant[] = [
  {
    id: "yellof-100g",
    name: "Yellof Coffee Robusta Premium",
    weight: "100 Gram",
    weightGram: 100,
    price: 15000,
    originalPrice: 18000,
    badge: "Cocok Untuk Pemula",
    description: "Ukuran praktis untuk menikmati keaslian aroma robusta Pasaman setiap hari.",
    features: [
      "100% Biji Robusta Murni Pasaman",
      "Sangrai Medium Dark Optimal",
      "Kemasan Pouch Aluminium Foil Zipper",
      "Tanpa Bahan Pengawet & Campuran"
    ]
  },
  {
    id: "yellof-250g",
    name: "Yellof Coffee Robusta Premium",
    weight: "250 Gram",
    weightGram: 250,
    price: 27000,
    originalPrice: 35000,
    badge: "BEST SELLER",
    isBestSeller: true,
    description: "Pilihan paling favorit! Ukuran pas, lebih hemat, dan aroma lebih terjaga.",
    features: [
      "100% Biji Robusta Pilihan Perkebunan Pasaman",
      "Sensasi Bitter-Sweet Khas Nagari",
      "Kemasan Pouch Zipper Kedap Air & Udara",
      "Gula Terpisah (Kopi Murni 100%)"
    ]
  },
  {
    id: "yellof-500g",
    name: "Yellof Coffee Robusta Premium",
    weight: "500 Gram",
    weightGram: 500,
    price: 50000,
    originalPrice: 65000,
    badge: "Lebih Hemat",
    description: "Cocok untuk penikmat kopi rutin, kedai kecil, atau stok mingguan keluarga.",
    features: [
      "Ekstra Cita Rasa Bold & Mantap",
      "Kandungan Kafein Alami Tinggi",
      "Sangrai Segar Freshly Roasted",
      "Gratis Konsultasi Seduh via WA"
    ]
  },
  {
    id: "yellof-1kg",
    name: "Yellof Coffee Robusta Premium - Bundle Jumbo",
    weight: "1.000 Gram (1 Kg)",
    weightGram: 1000,
    price: 95000,
    originalPrice: 120000,
    badge: "Hemat Maksimal",
    description: "Paket jumbo harga grosir terhemat untuk penikmat sejati dan cafe.",
    features: [
      "Harga Grosir Terjangkau",
      "Freshly Packed Langsung dari Pasaman",
      "Bonus Sendok Takar Eksklusif",
      "Bisa Request Gilingan (Halus/Sedang/Kasar)"
    ]
  }
];

export const YELLOF_CONTACT = {
  whatsapp: "6282171032691",
  whatsappFormatted: "0821 7103 2691",
  instagram: "@uni.yellof",
  address: "Kabupaten Pasaman, Sumatera Barat, Indonesia",
  tagline: "Nikmatnya Kopi Berkualitas, Semangat Berlipat!"
};
