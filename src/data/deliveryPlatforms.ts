export interface DeliveryPlatform {
  id: string;
  name: string;
  category: 'ojol' | 'courier';
  logoColor: string;
  iconName: string;
  badge: string;
  description: string;
  directUrl: string;
  supportedAreas: string[];
  features: string[];
}

export const DELIVERY_PLATFORMS: DeliveryPlatform[] = [
  {
    id: "gofood",
    name: "GoFood (Gojek)",
    category: "ojol",
    logoColor: "from-green-600 to-emerald-500",
    iconName: "ShoppingBag",
    badge: "Instan 30-45 Mnt",
    description: "Pesan cepat langsung sampai melalui outlet resmi GoFood Yellof Coffee.",
    directUrl: "https://gofood.link/yellof-coffee-pasaman", // Dynamic redirect link / WhatsApp integration backup
    supportedAreas: ["Kabupaten Pasaman", "Lubuk Sikaping", "Bukittinggi", "Padang", "Pekanbaru"],
    features: ["Promo Diskon Ongkir GoPay", "Layanan GoSend Sameday", "Lacak Driver Real-time"]
  },
  {
    id: "shopeefood",
    name: "ShopeeFood",
    category: "ojol",
    logoColor: "from-orange-600 to-amber-500",
    iconName: "Store",
    badge: "Banyak Voucher",
    description: "Nikmati gratis ongkir dan promo cashback ShopeePay untuk pemesanan Yellof Coffee.",
    directUrl: "https://shopee.co.id/universal-link/now-food/shop/yellof-coffee",
    supportedAreas: ["Kabupaten Pasaman", "Lubuk Sikaping", "Padang", "Bukittinggi"],
    features: ["Voucher Potongan s/d 50%", "Bisa Pakai Koin Shopee", "Pengiriman Cepat Instan"]
  },
  {
    id: "grabfood",
    name: "GrabFood",
    category: "ojol",
    logoColor: "from-emerald-700 to-green-500",
    iconName: "Truck",
    badge: "GrabUnlimited",
    description: "Order Yellof Coffee favoritmu dengan aman dan cepat via GrabExpress & GrabFood.",
    directUrl: "https://food.grab.com/id/en/restaurant/yellof-coffee-pasaman",
    supportedAreas: ["Kabupaten Pasaman", "Lubuk Sikaping", "Padang", "Pekanbaru"],
    features: ["Diskon Member GrabUnlimited", "Jaminan Tepat Waktu", "Opsi Kirim Paket Instan"]
  },
  {
    id: "maxim",
    name: "Maxim Food & Goods",
    category: "ojol",
    logoColor: "from-yellow-500 to-amber-400",
    iconName: "Zap",
    badge: "Ongkir Terhemat",
    description: "Layanan kirim super hemat Maxim Delivery untuk area Pasaman & Sumatera Barat.",
    directUrl: "https://taximaxim.com/order/yellof-coffee",
    supportedAreas: ["Kabupaten Pasaman", "Lubuk Sikaping", "Bukittinggi", "Padang"],
    features: ["Tarif Ongkir Paling Ekonomis", "Layanan Antar Jemput Langsung", "Tersedia 24 Jam"]
  },
  {
    id: "courier-expedisi",
    name: "Pengiriman Kurir Ekspedisi (JNE / J&T / SiCepat / POS)",
    category: "courier",
    logoColor: "from-amber-700 to-yellow-600",
    iconName: "Package",
    badge: "Seluruh Indonesia",
    description: "Pengiriman paket kopi sangrai ke seluruh kota & pelosok Indonesia dengan kemasan bubble wrap tebal.",
    directUrl: "https://wa.me/6282171032691?text=Halo%20Admin%20Yellof%20Coffee,%20saya%20ingin%20pesan%20kopi%20dengan%20pengiriman%20ekspedisi%20ke%20kota%20saya.",
    supportedAreas: ["Seluruh Indonesia", "Sumatera", "Jawa", "Kalimantan", "Sulawesi", "Bali & Nusa Tenggara", "Papua"],
    features: ["Packing Dus & Bubble Wrap Gratis", "Garansi Ganti Baru Jika Rusak", "Bisa COD (Bayar di Tempat)"]
  }
];

export const SUPPORTED_REGIONS = [
  "Kabupaten Pasaman",
  "Lubuk Sikaping",
  "Bukittinggi",
  "Padang",
  "Pekanbaru",
  "Medan",
  "Jakarta & Jabodetabek",
  "Kota Lainnya (Pengiriman Ekspedisi)"
];
