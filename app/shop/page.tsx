/**
 * Назначение: Страница каталога вин (Shop).
 * Зависимости: HeroUI, Lucide React, i18n Context, Wines Context, FilterBar.
 * Особенности:
 * - Client Component (useSearchParams).
 * - "Умный поиск" (Fuzzy search).
 * - Динамическая фильтрация через URL.
 */

"use client";

import React, { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useWinesStore } from '@/lib/store/useWinesStore';
import { useUIStore } from '@/lib/store/useUIStore';

import ProductCard from '@/components/wine/ProductCard';
import WineCardSkeleton from '@/components/ui/Skeletons/WineCardSkeleton';
import { SidebarFilters } from '@/components/wine/SidebarFilters';
import { ActiveFilters } from '@/components/wine/ActiveFilters';

function CatalogContent() {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    // Zustand Store
    const { wines: allProducts, isLoading, fetchProducts } = useWinesStore();

    // Загрузка данных при монтировании, если они еще не загружены
    React.useEffect(() => {
        if (allProducts.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, allProducts.length]);

    const searchParams = useSearchParams();
    const toggleFilter = useUIStore((state) => state.toggleFilter);

    // --- 1. Parse URL Params ---
    const searchQuery = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const grape = searchParams.get('grape');
    const type = searchParams.get('type');
    const sortBy = searchParams.get('sort') || 'newest';

    const updateParams = (newParams: URLSearchParams) => {
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    };

    // --- 2. Filter & Sort Logic (Unified) ---
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // 2.1 Search (Name, Description, Grape)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                (p as any).name?.toLowerCase().includes(query) ||
                (p as any).title?.toLowerCase().includes(query) ||
                (p as any).description?.toLowerCase().includes(query) ||
                ((p as any).grapeVariety && (p as any).grapeVariety.toLowerCase().includes(query))
            );
        }

        // 2.2 Category
        if (category) {
            result = result.filter(p => {
                // Unified check: Check if any category slug matches
                if ((p as any).categories) {
                    return (p as any).categories.some((c: any) => c.slug === category);
                }
                // Fallback for flat category
                if ((p as any).category) {
                    return (p as any).category.toLowerCase().replace(/\s+/g, '-') === category;
                }
                return false;
            });
        }

        // 2.3 Tag
        if (tag) {
            result = result.filter(p => {
                if ((p as any).tags && Array.isArray((p as any).tags)) {
                    return (p as any).tags.some((t: any) => t.slug === tag);
                }
                return false;
            });
        }

        // 2.4 Type (Mapped type from determineType)
        if (type) {
            result = result.filter(p => (p as any).type === type);
        }

        // 2.5 Grape (Only for Wines)
        if (grape) {
            result = result.filter(p => (p as any).grapeVariety === grape);
        }

        // 2.5 Sort
        result.sort((a, b) => {
            // Get price helper
            const getPrice = (item: any) => typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
            // Get date helper (for newest) - Year or Date
            const getDate = (item: any) => item.year || (item.date ? new Date(item.date).getFullYear() : 0);

            switch (sortBy) {
                case 'price_asc': return getPrice(a) - getPrice(b);
                case 'price_desc': return getPrice(b) - getPrice(a);
                case 'newest': return getDate(b) - getDate(a);
                default: return 0;
            }
        });

        return result;
    }, [allProducts, searchQuery, category, type, grape, sortBy]);

    // --- 3. Active Filters Data ---
    const activeFiltersData = useMemo(() => {
        const list = [];
        if (category) list.push({ key: 'category', label: t('filter_category'), value: category, displayValue: category });
        if (tag) list.push({ key: 'tag', label: t('filter_tag'), value: tag, displayValue: tag });
        if (type) list.push({ key: 'type', label: t('product_type'), value: type, displayValue: type });
        if (grape) list.push({ key: 'grape', label: t('filter_grape'), value: grape, displayValue: grape });
        return list;
    }, [category, tag, type, grape, t]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-wine-dark dark:text-white mb-4">
                        {t("catalog_title")}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
                        {t("catalog_subtitle")}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters (Dynamic) */}
                    <SidebarFilters products={allProducts} />

                    {/* Main Content */}
                    <div className="flex-1">

                        {/* Mobile Filter Toggle & Sort & Search Bar */}
                        <div className="sticky top-20 z-20 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md py-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
                            {/* Mobile Toggle */}
                            <button
                                onClick={() => toggleFilter()}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-medium shadow-sm w-full sm:w-auto justify-center"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                {t('filters_title')}
                                {(activeFiltersData.length > 0) && (
                                    <span className="bg-wine-gold text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                        {activeFiltersData.length}
                                    </span>
                                )}
                            </button>

                            {/* Search Input */}
                            <div className="relative w-full sm:max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    defaultValue={searchQuery}
                                    placeholder={t('search_input_placeholder')}
                                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-wine-gold/50 text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value;
                                            const params = new URLSearchParams(searchParams.toString());
                                            if (val) params.set('search', val);
                                            else params.delete('search');
                                            updateParams(params);
                                        }
                                    }}
                                />
                            </div>

                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set('sort', e.target.value);
                                    updateParams(params);
                                }}
                                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-wine-gold/50 cursor-pointer"
                            >
                                <option value="newest">{t('sort_newest')}</option>
                                <option value="price_asc">{t('sort_price_asc')}</option>
                                <option value="price_desc">{t('sort_price_desc')}</option>
                            </select>
                        </div>

                        {/* Active Filters */}
                        <ActiveFilters
                            filters={activeFiltersData}
                            onRemove={(key, value) => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete(key);
                                updateParams(params);
                            }}
                            onClear={() => {
                                router.push(pathname, { scroll: false });
                            }}
                        />

                        {/* Grid */}
                        {isLoading && filteredProducts.length === 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <WineCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                                <Search className="w-12 h-12 text-zinc-300 mb-4" />
                                <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-2">
                                    {t("no_wines_found")}
                                </h3>
                                <p className="text-zinc-500">{t("adjust_filters")}</p>
                            </div>
                        )}
                    </div>
                </div>
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

