"use client";

/**
 * Страница каталога вин.
 * Позволяет фильтровать вина по типу, искать по названию и сортировать результаты по цене или году.
 */

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import WineCard from '@/components/wine/WineCard';
import CatalogSearch from '@/components/wine/CatalogSearch';
import CatalogFilters from '@/components/wine/CatalogFilters';
import { useTranslation } from '@/lib/i18n';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useWines } from '@/lib/contexts/WinesContext';

function CatalogContent() {
    const { t } = useTranslation();
    const { wines: displayWines, isLoading } = useWines();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('year');

    useEffect(() => {
        const typeParam = searchParams.get('type');
        const searchParam = searchParams.get('search');

        if (typeParam) {
            setSelectedType(typeParam);
        } else {
            setSelectedType('All');
        }

        if (searchParam) {
            setSearchQuery(decodeURIComponent(searchParam));
        }
    }, [searchParams]);

    // Фильтрация применяется к displayWines (либо реальные из API, либо моковые в случае ошибки)
    const filteredWines = useMemo(() => {
        return displayWines
            .filter(wine => {
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch = wine.name.toLowerCase().includes(searchLower) ||
                    wine.grapeVariety.toLowerCase().includes(searchLower) ||
                    wine.type.toLowerCase().includes(searchLower) ||
                    (wine.description && wine.description.toLowerCase().includes(searchLower));
                const matchesType = selectedType === 'All' || wine.type === selectedType;
                return matchesSearch && matchesType;
            })
            .sort((a, b) => {
                if (sortBy === 'price-asc') return a.price - b.price;
                if (sortBy === 'price-desc') return b.price - a.price;
                if (sortBy === 'year') return b.year - a.year;
                return 0;
            });
    }, [displayWines, searchQuery, selectedType, sortBy]);

    const wineTypes = ['All', ...new Set(displayWines.map(w => w.type))];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Индикация статуса загрузки из внешнего API WooCommerce */}
                {isLoading && (
                    <div className="mb-4 flex items-center gap-2 text-wine-gold animate-pulse">
                        <div className="w-2 h-2 bg-wine-gold rounded-full"></div>
                        <span className="text-xs font-medium uppercase tracking-wider">{t("loading_real_data") || "Synchronisierung mit Katalog..."}</span>
                    </div>
                )}

                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-wine-dark dark:text-white mb-4">
                        {t("catalog_title")}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
                        {t("catalog_subtitle")}
                    </p>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 items-center justify-between sticky top-[64px] md:top-24 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md py-4 md:py-6 -mx-4 px-4 rounded-b-xl border-b border-zinc-200/50 dark:border-zinc-800/50 transition-all">
                    <CatalogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} t={t} />
                    <CatalogFilters
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        wineTypes={wineTypes}
                        t={t}
                    />
                </div>

                {/* Results Info */}
                <div className="mb-8 flex items-center justify-between">
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {t("showing_wines", { count: filteredWines.length })}
                    </p>
                </div>

                {/* Grid */}
                {filteredWines.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredWines.map((wine) => (
                            <WineCard key={wine.id} wine={wine} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-full mb-6">
                            <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
                        </div>
                        <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-2">{t("no_wines_found")}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">{t("adjust_filters")}</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
                            className="mt-6 text-wine-gold font-bold hover:underline"
                        >
                            {t("clear_filters")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wine-dark"></div></div>}>
            <CatalogContent />
        </Suspense>
    );
}
