"use client";

/**
 * Страница события "Kellerblicke" (Взгляд в погреб).
 * Отображает информацию о еженедельных экскурсиях в винный погреб с дегустацией.
 * Включает описание, цены, расписание и форму бронирования.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Calendar, Clock, Users, Wine, CheckCircle, Mail, Phone } from 'lucide-react';

export default function KellerblickePage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Навигация назад к Events */}
                <Link
                    href="/events"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("nav_events")}</span>
                </Link>

                {/* Hero секция с изображением и заголовком */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16">

                    {/* Левая колонка: Текстовая информация */}
                    <div className="flex flex-col justify-center">
                        {/* Метка события */}
                        <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                            {t("premium_event")}
                        </span>

                        {/* Заголовок */}
                        <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif italic leading-tight">
                            {t("kellerblicke_title")}
                        </h1>

                        {/* Подзаголовок */}
                        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("kellerblicke_subtitle")}
                        </p>

                        {/* Основное описание */}
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("kellerblicke_description")}
                        </p>

                        {/* Примечание о регистрации */}
                        <p className="text-sm italic text-zinc-500 dark:text-zinc-500 mb-6">
                            {t("kellerblicke_registration_note")}
                        </p>
                    </div>

                    {/* Правая колонка: Изображение */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        {/* Фоновое изображение винных бочек */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-wine-dark to-zinc-800 relative">
                            <img
                                src="https://fellbacher-weine.de/wp-content/uploads/2017/08/Kellerblicke-2-2.jpg"
                                alt="Kellerblicke - Wine Cellar"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Оверлей с названием */}
                            <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent flex items-end p-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white serif uppercase tracking-wider">
                                    Kellerblicke
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Секция с ключевой информацией (Цена, Дата, Время) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

                    {/* Карточка: Цена */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-wine-gold transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-wine-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">Preis</h3>
                        </div>
                        <p className="text-2xl md:text-3xl font-black text-wine-dark dark:text-white mb-2">
                            {t("kellerblicke_price_per_person")}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {t("kellerblicke_duration")}
                        </p>
                    </div>

                    {/* Карточка: Период проведения */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-wine-gold transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-wine-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">Zeitraum</h3>
                        </div>
                        <p className="text-base md:text-lg font-bold text-wine-dark dark:text-white mb-2">
                            {t("kellerblicke_event_period")}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {t("kellerblicke_every_saturday")}
                        </p>
                    </div>

                    {/* Карточка: Время */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-wine-gold transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-wine-gold" />
                            </div>
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">Anmeldung</h3>
                        </div>
                        <p className="text-base md:text-lg font-bold text-wine-dark dark:text-white mb-2">
                            Bis 13:00 Uhr
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            am Veranstaltungstag
                        </p>
                    </div>
                </div>

                {/* Секция "Что входит в программу" */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 mb-16 border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-3xl md:text-4xl font-black text-wine-dark dark:text-white mb-8 serif italic">
                        {t("kellerblicke_what_included")}
                    </h2>

                    {/* Список включенных услуг */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Пункт 1: Экскурсия */}
                        <div className="flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-wine-gold flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">
                                    {t("kellerblicke_included_tour")}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Persönliche Führung durch unseren Weinkeller
                                </p>
                            </div>
                        </div>

                        {/* Пункт 2: Дегустация */}
                        <div className="flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-wine-gold flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">
                                    {t("kellerblicke_included_tasting")}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Verkostung von drei ausgewählten Weinen
                                </p>
                            </div>
                        </div>

                        {/* Пункт 3: Инсайты */}
                        <div className="flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-wine-gold flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">
                                    {t("kellerblicke_included_insights")}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Blick hinter die Kulissen der Weinherstellung
                                </p>
                            </div>
                        </div>

                        {/* Пункт 4: Q&A */}
                        <div className="flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-wine-gold flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">
                                    {t("kellerblicke_included_qa")}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Zeit für Ihre Fragen an den Kellermeister
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Секция контактов и бронирования */}
                <div className="bg-wine-dark rounded-3xl p-8 md:p-12 text-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                        {/* Левая колонка: Контактная информация */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6 serif italic">
                                {t("kellerblicke_contact_info")}
                            </h2>
                            <p className="text-lg text-zinc-300 mb-8">
                                Melden Sie sich telefonisch oder per E-Mail an. Wir freuen uns auf Ihren Besuch!
                            </p>

                            {/* Контактные данные */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-wine-gold" />
                                    <a href="tel:+4971157880330" className="text-lg hover:text-wine-gold transition-colors">
                                        +49 711 57 88 03-0
                                    </a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-wine-gold" />
                                    <a href="mailto:info@fellbacher-weine.de" className="text-lg hover:text-wine-gold transition-colors">
                                        info@fellbacher-weine.de
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка: Кнопка бронирования */}
                        <div className="flex flex-col justify-center items-start lg:items-end">
                            <div className="w-full lg:w-auto">
                                <p className="text-sm text-zinc-400 mb-4 lg:text-right">
                                    Sichern Sie sich Ihren Platz
                                </p>
                                <Link
                                    href="/events"
                                    className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 bg-wine-gold hover:bg-white text-wine-dark font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-wine-gold/20 group text-sm md:text-base"
                                >
                                    <Wine className="w-5 h-5 mr-2" />
                                    {t("kellerblicke_book_now")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
