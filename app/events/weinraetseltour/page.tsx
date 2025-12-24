"use client";

/**
 * Страница события "Wein(Rätsel)Tour" (Винный тур с загадками).
 * Информационная страница о туре с тележкой (Bollerwagen).
 * Содержит три варианта цен, маршруты и информацию о бронировании.
 * 
 * Зависимости:
 * - Next.js (Link)
 * - lucide-react (Иконки)
 * - i18n (Локализация)
 * - Tailwind CSS (Стилизация, Mobile First)
 * 
 * Особенности:
 * - Карточки с вариантами (S, M, L)
 * - Акцент на зимнюю опцию (Glühwein)
 * - Четкие условия бронирования
 */

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Map, Users, Clock, Euro, Phone, Mail, AlertCircle, Snowflake } from 'lucide-react';

export default function WeinRaetselTourPage() {
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
                        <h1 className="text-4xl md:text-5xl font-black text-wine-dark dark:text-white mb-6 serif italic leading-tight">
                            {t("weinraetsel_title")}
                        </h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                            {t("weinraetsel_subtitle")}
                        </p>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weinraetsel_description")}
                        </p>

                        {/* Зимняя опция */}
                        <div className="flex items-start gap-4 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-100 dark:border-sky-800">
                            <Snowflake className="w-6 h-6 text-sky-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-sky-900 dark:text-sky-300 mb-1">{t("weinraetsel_winter_special")}</h3>
                                <p className="text-sm text-sky-800 dark:text-sky-400">{t("weinraetsel_winter_desc")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Изображение */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-wine-dark to-zinc-800 relative">
                            {/* Фото тележки с вином в винограднике */}
                            <img
                                src="https://fellbacher-weine.de/wp-content/uploads/2025/08/DSC_0091-683x1024.jpg"
                                alt="Bollerwagen Tour"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent flex items-end p-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white serif uppercase tracking-wider">
                                    Adventure
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Варианты цен (Pricing Cards) */}
                <h2 className="text-3xl font-black text-wine-dark dark:text-white mb-8 text-center serif italic">
                    Wählen Sie Ihre Größe
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* S */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6 font-black text-lg text-wine-dark dark:text-white">S</div>
                        <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-2">{t("weinraetsel_variant_s_price")}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">{t("weinraetsel_variant_s_label")}</p>
                    </div>
                    {/* M */}
                    <div className="bg-wine-dark rounded-2xl p-8 border border-wine-dark shadow-xl text-center transform md:-translate-y-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wine-gold mb-6 font-black text-lg text-wine-dark">M</div>
                        <h3 className="text-xl font-bold text-white mb-2">{t("weinraetsel_variant_m_price")}</h3>
                        <p className="text-zinc-300">{t("weinraetsel_variant_m_label")}</p>
                    </div>
                    {/* L */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6 font-black text-lg text-wine-dark dark:text-white">L</div>
                        <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-2">{t("weinraetsel_variant_l_price")}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">{t("weinraetsel_variant_l_label")}</p>
                    </div>
                </div>

                {/* Информация и Маршруты */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Маршруты */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-6">
                            <Map className="w-8 h-8 text-wine-gold" />
                            <h3 className="text-2xl font-bold text-wine-dark dark:text-white">{t("weinraetsel_routes_title")}</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-lg text-zinc-700 dark:text-zinc-300 font-medium">{t("weinraetsel_route_blue")}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="text-lg text-zinc-700 dark:text-zinc-300 font-medium">{t("weinraetsel_route_yellow")}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="text-lg text-zinc-700 dark:text-zinc-300 font-medium">{t("weinraetsel_route_red")}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Условия */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-6">
                            <Clock className="w-8 h-8 text-wine-gold" />
                            <h3 className="text-2xl font-bold text-wine-dark dark:text-white">Info</h3>
                        </div>
                        <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                            <li className="flex gap-3">
                                <Clock className="w-5 h-5 flex-shrink-0 text-wine-gold" />
                                {t("weinraetsel_availability")}
                            </li>
                            <li className="flex gap-3">
                                <Euro className="w-5 h-5 flex-shrink-0 text-wine-gold" />
                                {t("weinraetsel_deposit")}
                            </li>
                            <li className="flex gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 text-wine-gold" />
                                {t("weinraetsel_booking_note")}
                            </li>
                        </ul>
                    </div>
                </div>


                {/* Контакты для брони */}
                <div className="bg-wine-dark rounded-3xl p-8 md:p-12 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-8 serif italic">
                        Jetzt buchen
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                        <a href="tel:+497115788030" className="flex flex-col items-center gap-3 group hover:text-wine-gold transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <Phone className="w-8 h-8" />
                            </div>
                            <span className="text-xl font-bold">{t("weinraetsel_contact_phone")}</span>
                        </a>
                        <a href="mailto:veranstaltungen@fellbacher-weine.de" className="flex flex-col items-center gap-3 group hover:text-wine-gold transition-colors">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <Mail className="w-8 h-8" />
                            </div>
                            <span className="text-xl font-bold break-all">{t("weinraetsel_contact_email")}</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
