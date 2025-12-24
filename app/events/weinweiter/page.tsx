"use client";

/**
 * Страница события "Wein & Weiter" (Вино и не только).
 * Информационная страница о постоянном открытом баре при винодельне.
 * Включает информацию о партнерстве с bwegtPlus и скидках.
 * 
 * Зависимости:
 * - Next.js (Link)
 * - lucide-react (Иконки)
 * - i18n (Локализация)
 * - Tailwind CSS (Стилизация, Mobile First)
 * 
 * Особенности:
 * - Блок партнера (bwegtPlus)
 * - Акцент на доступность и время работы
 */

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Clock, MapPin, Wine, Utensils, Train, Ticket, Sun } from 'lucide-react';

export default function WeinWeiterPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Навигация назад */}
                <Link
                    href="/events"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("nav_events")}</span>
                </Link>

                {/* Hero секция */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16">
                    {/* Текст */}
                    <div className="flex flex-col justify-center">
                        <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                            {t("premium_event")}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif italic leading-tight">
                            {t("weinweiter_title")}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weinweiter_subtitle")}
                        </p>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weinweiter_description")}
                        </p>
                    </div>

                    {/* Изображение */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-wine-dark to-zinc-800 relative">
                            {/* Фото открытой террасы или бокала вина */}
                            <img
                                src="https://fellbacher-weine.de/wp-content/uploads/2025/06/WeinWeiter_Instafeed1.jpg"
                                alt="Wein & Weiter"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent flex items-end p-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white serif uppercase tracking-wider">
                                    Open Bar
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Основные моменты (Highlights Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Сезонное меню */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-wine-gold transition-colors">
                        <Wine className="w-8 h-8 text-wine-gold mb-6" />
                        <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-4">{t("weinweiter_seasonal_wines")}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Genießen Sie Weine passend zur Jahreszeit, glas- oder flaschenweise.
                        </p>
                    </div>

                    {/* Открытый бар */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-wine-gold transition-colors">
                        <Sun className="w-8 h-8 text-wine-gold mb-6" />
                        <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-4">{t("weinweiter_open_bar")}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Direkt an der Neuen Kelter, mit Blick auf die Weinberge.
                        </p>
                    </div>

                    {/* Снэки */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-wine-gold transition-colors">
                        <Utensils className="w-8 h-8 text-wine-gold mb-6" />
                        <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-4">{t("weinweiter_snacks_label")}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Kleine Leckereien passend zu Ihrer Weinauswahl.
                        </p>
                    </div>
                </div>

                {/* Время работы и Локация (Info Box) */}
                <div className="bg-wine-dark rounded-3xl p-8 md:p-12 text-white mb-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black serif italic mb-4">
                                Öffnungszeiten & Ort
                            </h2>
                            <p className="text-lg text-zinc-300">
                                {t("weinweiter_location_time")}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Clock className="w-10 h-10 text-wine-gold" />
                            <MapPin className="w-10 h-10 text-wine-gold" />
                        </div>
                    </div>
                </div>

                {/* Партнерство bwegtPlus */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 mb-16 border border-zinc-200 dark:border-zinc-800 border-l-8 border-l-[#ffe600]"> {/* bwegt yellow color hint */}
                    <div className="flex items-center gap-4 mb-6">
                        <Train className="w-8 h-8 text-zinc-800 dark:text-zinc-200" />
                        <h2 className="text-2xl md:text-3xl font-black text-wine-dark dark:text-white serif">
                            {t("weinweiter_partner_title")}
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-4 font-bold">
                                {t("weinweiter_discount_desc")}
                            </p>
                            <div className="flex items-start gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <Ticket className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <p>{t("weinweiter_condition")}</p>
                            </div>
                        </div>
                        {/* Место для логотипа bwegtPlus, если бы он был, можно просто оставить пустым или стилизованным блоком */}
                    </div>
                </div>

            </div>
        </div>
    );
}
