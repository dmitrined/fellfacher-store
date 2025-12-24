"use client";
/**
 * Поле поиска для каталога.
 * Позволяет фильтровать вина по вводимому тексту в реальном времени.
 */

import React from 'react';
import { Search } from 'lucide-react';

interface CatalogSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    t: (key: string) => string;
}

const CatalogSearch: React.FC<CatalogSearchProps> = ({ searchQuery, setSearchQuery, t }) => {
    return (
        <div className="relative w-full md:w-80 lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-400 group-focus-within:text-wine-gold transition-colors" />
            <input
                type="text"
                placeholder={t("search_input_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-wine-gold/20 focus:border-wine-gold transition-all text-sm md:text-base"
            />
        </div>
    );
};

export default CatalogSearch;
