"use client";

import Link from 'next/link';
import { wines } from '@/lib/data/wines';
import WineCard from './components/WineCard';
import { ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

/**
 * Главная страница приложения.
 * Содержит Hero-секцию, подборки вин по категориям, информацию о программе лояльности и событиях.
 */
export default function Home() {
  // Получаем функцию перевода из кастомного хука
  const { t } = useTranslation();

  // Выбираем первые 4 вина для отображения (если нужно для других секций)
  const featuredWines = wines.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* Главная секция (Hero) - Приветственный баннер */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Декоративный градиент на фоне */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-wine-gold/10 via-transparent to-transparent opacity-50" />
        {/* Фоновое изображение с затемнением */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://fellbacher-weine.de/wp-content/uploads/2023/10/Hero_Startseite.jpg')] bg-cover bg-center grayscale-[0.2] brightness-[0.4] scale-105" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            {/* Анимированный заголовок с использованием шрифта serif */}
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight serif">
              {t("hero_title_1")} <br />
              <span className="text-wine-gold">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-xl">
              {t("hero_subtitle")}
            </p>
            {/* Кнопки призыва к действию (CTA) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-wine-gold hover:bg-white text-wine-dark font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-wine-gold/20 group text-sm md:text-base"
              >
                {t("hero_cta")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white text-white font-bold rounded-full transition-all duration-300 backdrop-blur-sm text-sm md:text-base">
                {t("hero_secondary_cta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Секция подборок вин по категориям (Красное, Белое и т.д.) */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black text-wine-dark dark:text-white mb-4 serif">{t("featured_title")}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">{t("featured_subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Итерация по списку категорий для отображения горизонтальных скроллов */}
        {[
          { type: 'Rotwein', title: t("type_red") },
          { type: 'Weißwein', title: t("type_white") },
          { type: 'Roséwein', title: t("type_rose") },
          { type: 'Sekt', title: t("type_sparkling") },
          { type: 'Alkoholfrei', title: t("type_alcohol_free") }
        ].map((category) => {
          // Фильтрация вин для конкретной категории
          const categoryWines = wines.filter(w => w.type === category.type);
          if (categoryWines.length === 0) return null;

          return (
            <div key={category.type} className="mb-16 last:mb-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-black text-wine-dark dark:text-white serif italic">
                    {category.title}
                  </h3>
                  {/* Ссылка на полный каталог с примененным фильтром */}
                  <Link
                    href={`/catalog?type=${category.type}`}
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-wine-gold transition-colors flex items-center gap-2 group"
                  >
                    {t("view_all")}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Горизонтальный скролл карточек (snap-scroll) */}
              <div className="relative">
                <div className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-[calc((100vw-80rem)/2+2rem)] pb-8 no-scrollbar snap-x snap-mandatory scroll-smooth">
                  {categoryWines.map((wine) => (
                    <div key={wine.id} className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
                      <WineCard wine={wine} />
                    </div>
                  ))}
                  {/* Пустой блок для корректного отступа в конце скролла */}
                  <div className="flex-shrink-0 w-4 md:w-8" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Секция эксклюзивной коллекции */}
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

            {/* Декоративное изображение сбоку */}
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] dark:opacity-[0.07] pointer-events-none group-hover:scale-105 transition-transform duration-1000 grayscale">
              <img
                src="https://images.unsplash.com/photo-1510850438481-863702bb1f90?q=80&w=1000&auto=format&fit=crop"
                alt="Grapevine decoration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Декоративное размытое пятно (glow effect) */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-wine-gold/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Секция промо блоков: Программа лояльности и События */}
      <section className="py-24 md:py-32 overflow-hidden bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Блок Программы лояльности */}
            <div className="relative group bg-wine-dark rounded-[3rem] p-10 md:p-16 text-white overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-wine-gold/10">
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">
                  {t("nav_loyalty")}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 serif italic leading-tight">
                  {t("loyalty_title")}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 fill-wine-gold text-wine-gold" />
                  <span className="text-sm font-bold">{t("premium_event")}</span>
                </div>
                <p className="text-lg text-zinc-400 mb-10 max-w-sm leading-relaxed">
                  {t("loyalty_subtitle")}
                </p>
                <div className="mt-auto">
                  <Link
                    href="/loyalty"
                    className="inline-flex items-center gap-4 text-wine-gold font-black uppercase tracking-widest text-sm group/link"
                  >
                    <span>{t("more_info")}</span>
                    <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
              {/* Фоновая иконка звезды */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-wine-gold">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            {/* Блок Событий и Винодельни */}
            <div className="relative group bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-10 md:p-16 overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl transition-all duration-700 hover:border-wine-gold/50">
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-6 block">
                  {t("nav_events")}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 serif italic leading-tight text-wine-dark dark:text-white">
                  {t("events_title")}
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm leading-relaxed">
                  {t("events_subtitle")}
                </p>
                <div className="mt-auto">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-4 text-wine-dark dark:text-wine-gold font-black uppercase tracking-widest text-sm group/link"
                  >
                    <span>{t("all_appointments")}</span>
                    <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
              {/* Фоновая иконка времени */}
              <div className="absolute right-12 top-12 opacity-5 dark:opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-wine-dark dark:text-wine-gold">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Сетка преимуществ (Features) */}
      <section className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Преимущество: Качество */}
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_quality_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_quality_desc")}</p>
            </div>
            {/* Преимущество: Кураторство */}
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_curation_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_curation_desc")}</p>
            </div>
            {/* Преимущество: Доставка */}
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
