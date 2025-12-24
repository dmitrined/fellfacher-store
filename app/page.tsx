"use client";

import Link from 'next/link';
import WineCard from './components/WineCard';
import { ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useWines } from '@/lib/WinesContext';

/**
 * Главная страница приложения.
 * Содержит Hero-секцию, подборки вин по категориям, информацию о программе лояльности и событиях.
 * Данные о винах подгружаются из WinesContext (умная загрузка: API + моки).
 */
export default function Home() {
  const { t } = useTranslation();
  const { wines: displayWines, isLoading } = useWines();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-wine-gold/10 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://fellbacher-weine.de/wp-content/uploads/2025/11/background-9086186_1920-e1764503149424.jpg')] bg-cover bg-center grayscale-[0.2] brightness-[0.4] scale-105" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight serif">
              {t("hero_title_1")} <br />
              <span className="text-wine-gold">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-xl">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-wine-gold hover:bg-white text-wine-dark font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-wine-gold/20 group text-sm md:text-base"
              >
                {t("hero_cta")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black text-wine-dark dark:text-white mb-4 serif">{t("featured_title")}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">{t("featured_subtitle")}</p>
            </div>
            {/* Статус загрузки реальных данных */}
            {isLoading && (
              <span className="text-[10px] text-wine-gold animate-pulse font-black uppercase tracking-widest">
                {t("syncing") || "Synchronisierung..."}
              </span>
            )}
          </div>
        </div>

      </section>

      {/* Остальные секции (Loyalty, Events и т.д.) */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-zinc-100 dark:border-zinc-800 group shadow-2xl transition-all duration-700 hover:shadow-wine-gold/5">
            <div className="relative z-10 max-w-2xl">
              <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">
                {t("exclusive_selection_title")}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-8 serif italic leading-tight">
                {t("exclusive_selection_subtitle")}
              </h2>
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                {t("exclusive_selection_desc")}
              </p>
              <div className="mt-12">
                <Link
                  href="/catalog?exclusive=true"
                  className="inline-flex items-center gap-4 text-wine-dark dark:text-wine-gold font-black uppercase tracking-widest text-sm group/link underline-offset-8 hover:underline decoration-2 transition-all"
                >
                  <span>{t("view_collection")}</span>
                  <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_quality_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_quality_desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_curation_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_curation_desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_delivery_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_delivery_desc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
