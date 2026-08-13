import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yellof Coffee | Kopi Robusta Premium Asli Kabupaten Pasaman",
  description: "Nikmati cita rasa Kopi Robusta murni kualitas premium asli dari Nagari Kabupaten Pasaman. Aroma kuat, rasa mantap, bitter-sweet seimbang tanpa ampas.",
  keywords: ["Yellof Coffee", "Kopi Robusta Pasaman", "Kopi Asli Nagari", "Kopi Robusta Premium", "Kopi Sumatera Barat", "Biji Kopi Murni"],
  authors: [{ name: "Yellof Coffee Pasaman" }],
  openGraph: {
    title: "Yellof Coffee | Kopi Robusta Premium Asli Pasaman",
    description: "Nikmatnya Kopi Berkualitas, Semangat Berlipat! Order via WhatsApp & Ojek Online.",
    images: ["/images/hero_coffee_pack.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-[#0A0807] text-[#F5EFE6] antialiased selection:bg-[#E6B800] selection:text-[#0A0807]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
