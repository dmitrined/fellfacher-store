"use client";

import React from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CatalogFiltersProps {
    selectedType: string;
    setSelectedType: (type: string) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    wineTypes: string[];
    t: (key: string, params?: any) => string;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    wineTypes,
    t
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="w-full overflow-hidden relative">
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-3 md:px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar scroll-smooth">
                    <Filter className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400 flex-shrink-0" />
                    {wineTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${selectedType === type
                                ? 'bg-wine-dark text-white ring-2 ring-wine-gold/30'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                }`}
                        >
                            {type === 'All' ? t("wine_type_all") :
                                type === 'Rotwein' ? t("nav_red_wines") :
                                    type === 'Weißwein' ? t("nav_white_wines") :
                                        type === 'Roséwein' ? t("wine_type_rose") :
                                            type === 'Sekt' ? t("wine_type_sparkling") :
                                                type === 'Alkoholfrei' ? t("wine_type_alcohol_free") : type}
                        </button>
                    ))}
                </div>
                {/* Gradient Fade for scroll indicators */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-900 pointer-events-none md:hidden" />
            </div>

            <div className="relative group flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 cursor-pointer w-full sm:w-auto overflow-hidden">
                <SlidersHorizontal className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs md:text-sm font-bold focus:outline-none appearance-none pr-6 dark:text-white uppercase tracking-tight flex-grow"
                >
                    <option value="year">{t("sort_newest")}</option>
                    <option value="price-asc">{t("sort_price_low")}</option>
                    <option value="price-desc">{t("sort_price_high")}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 pointer-events-none" />
            </div>
        </div>
    );
};

export default CatalogFilters;
