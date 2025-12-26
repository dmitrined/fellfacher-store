"use client";

/**
 * Страница события "Weintreff" (Винные встречи).
 * Информационная страница о регулярных неформальных встречах любителей вина.
 * 
 * Зависимости:
 * - Next.js (Link)
 * - lucide-react (Иконки)
 * - i18n (Локализация)
 * - Tailwind CSS (Стилизация, Mobile First)
 * 
 * Особенности:
 * - Чистый, привлекательный дизайн
 * - Акцент на социальную составляющую и доступность (вход свободный)
 */

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Users, Wine, Clock, MapPin, Sparkles, Coffee, Phone, Mail } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/constants/contact";

export default function WeintreffPage() {
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
                    {/* Левая колонка: Описание */}
                    <div className="flex flex-col justify-center">
                        <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                            {t("premium_event")}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif italic leading-tight">
                            {t("weintreff_title")}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weintreff_subtitle")}
                        </p>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weintreff_description")}
                        </p>
                    </div>

                    {/* Правая колонка: Изображение */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-wine-dark to-zinc-800 relative">
                            {/* Фото атмосферы встречи */}
                            <img
                                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop"
                                alt="Weintreff"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent flex items-end p-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white serif uppercase tracking-wider">
                                    Social
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlights (Что ожидать) */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 mb-16 border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-3xl md:text-4xl font-black text-wine-dark dark:text-white mb-8 serif italic">
                        {t("kellerblicke_what_included")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Социальное */}
                        <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-wine-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weintreff_highlight_social")}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weintreff_highlight_social_desc")}</p>
                        </div>

                        {/* Вина */}
                        <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mb-6">
                                <Wine className="w-8 h-8 text-wine-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weintreff_highlight_selection")}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weintreff_highlight_selection_desc")}</p>
                        </div>

                        {/* Атмосфера */}
                        <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-8 h-8 text-wine-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weintreff_highlight_atmosphere")}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weintreff_highlight_atmosphere_desc")}</p>
                        </div>
                    </div>
                </div>

                {/* Инфо (Время и место) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-4">
                            <Clock className="w-6 h-6 text-wine-gold" />
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">{t("weintreff_schedule_label")}</h3>
                        </div>
                        <p className="text-base font-medium text-zinc-600 dark:text-zinc-300">
                            {t("weintreff_schedule_value")}
                        </p>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-4">
                            <MapPin className="w-6 h-6 text-wine-gold" />
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">{t("weinfeste_location_label")}</h3>
                        </div>
                        <p className="text-base font-medium text-zinc-600 dark:text-zinc-300">
                            {t("weintreff_location_value")}
                        </p>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-4">
                            <Coffee className="w-6 h-6 text-wine-gold" />
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">{t("weintreff_entry_label")}</h3>
                        </div>
                        <p className="text-base font-medium text-zinc-600 dark:text-zinc-300">
                            {t("weintreff_entry_value")}
                        </p>
                    </div>
                </div>

                {/* Контакты / Футер страницы */}
                <div className="bg-wine-dark rounded-3xl p-8 md:p-12 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 serif italic">
                            {t("weintreff_contact_text")}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-wine-gold" />
                                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-lg hover:text-wine-gold transition-colors">
                                    {CONTACT_PHONE}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-wine-gold" />
                                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg hover:text-wine-gold transition-colors">
                                    {CONTACT_EMAIL}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
