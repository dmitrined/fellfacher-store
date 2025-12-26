import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Корневой макет приложения.
 * Здесь определяются шрифты, метаданные и общая структура страницы (шапка, подвал, провайдеры).
 */

// Настройка современного шрифта без засечек Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Настройка моноширинного шрифта Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Настройка премиального шрифта с засечками Playfair Display для заголовков
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Глобальные метаданные для SEO и заголовка вкладки браузера
export const metadata: Metadata = {
  title: "Fellbacher Weine | Premium Wine Catalog",
  description: "Discover the finest wines from Fellbacher Weingärtner eG. Browse, rate, and find your perfect pair.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Обертка всеми контекст-провайдерами (Auth, Cart, Wishlist и т.д.) */}
        <Providers>
          {/* Глобальная навигационная панель */}
          <Header />
          {/* Основной контент страницы */}
          <main>
            {children}
          </main>
          {/* Глобальный футер с контактной информацией */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}