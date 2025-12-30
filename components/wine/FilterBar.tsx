/**
 * Назначение файла: Панель фильтрации каталога (Filter Bar).
 * Зависимости: Zustand (UIStore), Next Navigation, i18n.
 * Особенности:
 * - Генерирует опции динамически на основе доступных вин.
 * - Управляет URL-параметрами (категория, сорт, год).
 * - Адаптивность: Drawer на мобильных устройствах, Sidebar на десктопе.
 */

"use client";

import React, { useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X, ChevronDown, Check, Filter as FilterIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from '@/lib/i18n';
import { useUIStore } from '@/lib/store/useUIStore';
import { Wine } from '@/lib/types/wine';
import { ActiveFilters } from './ActiveFilters';

interface FilterBarProps {
    wines: Wine[];
}

/**
 * Панель фильтров для страницы вин.
 */
export const FilterBar: React.FC<FilterBarProps> = ({ wines }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // UI Store для управления видимостью мобильных фильтров
    const isFilterOpen = useUIStore((state) => state.isFilterOpen);
    const toggleFilter = useUIStore((state) => state.toggleFilter);
    const setFilterOpen = useUIStore((state) => state.setFilterOpen);

    const closeFilter = () => setFilterOpen(false);

    // --- 1. Извлечение уникальных опций из данных (Dynamic Options) ---
    const options = useMemo(() => {
        // Категории
        const categories = Array.from(new Set(
            wines.flatMap(w => w.categories.map(c => JSON.stringify({ name: c.name, slug: c.slug })))
        )).map(s => JSON.parse(s) as { name: string, slug: string });

        // Сорта (из атрибутов)
        const grapes = Array.from(new Set(
            wines.flatMap(w => w.attributes.find(a => a.name.toLowerCase() === 'rebsorte')?.options || [])
        )).sort();

        // Годы
        const years = Array.from(new Set(wines.map(w => w.year))).sort((a, b) => b - a);

        return { categories, grapes, years };
    }, [wines]);

    // --- 2. Управление состоянием через URL ---
    const currentCategory = searchParams.get('category');

    /**
     * Обновление параметров в URL.
     */
    const updateParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === null) {
            params.delete(key);
        } else {
            // Множественный выбор для сортов и годов через запятую
            if (key === 'grape' || key === 'year') {
                const current = params.get(key)?.split(',') || [];
                if (current.includes(value.toString())) {
                    const next = current.filter(v => v !== value.toString());
                    if (next.length > 0) params.set(key, next.join(','));
                    else params.delete(key);
                } else {
                    current.push(value.toString());
                    params.set(key, current.join(','));
                }
            } else {
                // Одиночный выбор для категорий
                if (params.get(key) === value) params.delete(key);
                else params.set(key, value);
            }
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    /**
     * Сброс всех фильтров.
     */
    const clearAll = () => {
        router.push(pathname, { scroll: false });
        closeFilter();
    };

    // Подготовка списка активных фильтров для компонента ActiveFilters
    const activeFiltersList = useMemo(() => {
        const list: { key: string, label: string, value: string, displayValue: string }[] = [];

        if (currentCategory) {
            const catName = options.categories.find(c => c.slug === currentCategory)?.name || currentCategory;
            list.push({ key: 'category', label: t('filter_category'), value: currentCategory, displayValue: catName });
        }

        const grapesParam = searchParams.get('grape');
        if (grapesParam) {
            grapesParam.split(',').forEach(g => {
                list.push({ key: 'grape', label: t('filter_grape'), value: g, displayValue: g });
            });
        }

        const yearsParam = searchParams.get('year');
        if (yearsParam) {
            yearsParam.split(',').forEach(y => {
                list.push({ key: 'year', label: t('filter_year'), value: y, displayValue: y });
            });
        }

        return list;
    }, [searchParams, options, t, currentCategory]);

    // --- 3. Вспомогательные компоненты рендеринга ---
    const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0">
            <h3 className="text-sm font-bold text-wine-dark dark:text-white uppercase tracking-wider mb-4">
                {title}
            </h3>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );

    const FilterOption = ({
        label,
        isSelected,
        onClick,
        count
    }: {
        label: string,
        isSelected: boolean,
        onClick: () => void,
        count?: number
    }) => (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center justify-between text-left py-2 px-3 rounded-lg text-sm transition-all
                ${isSelected
                    ? 'bg-wine-gold text-white font-bold shadow-md shadow-wine-gold/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }
            `}
        >
            <span>{label}</span>
            {isSelected && <Check className="w-4 h-4" />}
            {!isSelected && count !== undefined && (
                <span className="text-xs text-zinc-400 font-normal">{count}</span>
            )}
        </button>
    );

    // --- 4. Основной рендер ---
    const FilterContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-1">
                {/* Категории */}
                <FilterSection title={t('filter_category')}>
                    {options.categories.map(cat => (
                        <FilterOption
                            key={cat.slug}
                            label={cat.name}
                            isSelected={currentCategory === cat.slug}
                            onClick={() => updateParams('category', cat.slug)}
                        />
                    ))}
                </FilterSection>

                {/* Сорта */}
                <FilterSection title={t('filter_grape')}>
                    {options.grapes.map(grape => {
                        const isSelected = (searchParams.get('grape')?.split(',') || []).includes(grape);
                        return (
                            <FilterOption
                                key={grape}
                                label={grape}
                                isSelected={isSelected}
                                onClick={() => updateParams('grape', grape)}
                            />
                        );
                    })}
                </FilterSection>

                {/* Годы */}
                <FilterSection title={t('filter_year')}>
                    {options.years.map(year => {
                        const yStr = year.toString();
                        const isSelected = (searchParams.get('year')?.split(',') || []).includes(yStr);
                        return (
                            <FilterOption
                                key={yStr}
                                label={yStr}
                                isSelected={isSelected}
                                onClick={() => updateParams('year', yStr)}
                            />
                        );
                    })}
                </FilterSection>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 sticky bottom-0 bg-white dark:bg-zinc-900 pb-20 md:pb-0">
                <button
                    onClick={clearAll}
                    className="w-full py-3 text-sm font-bold text-zinc-500 hover:text-wine-dark dark:hover:text-white transition-colors border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl hover:border-wine-dark dark:hover:border-white"
                >
                    {t('clear_all')}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Боковая панель для десктопа */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-hide">
                    <FilterContent />
                </div>
            </div>

            {/* Выезжающая панель для мобильных */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeFilter}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-zinc-900 z-50 shadow-2xl flex flex-col lg:hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
                                <h2 className="text-xl font-serif font-bold text-wine-dark dark:text-white">
                                    {t('filters_title')}
                                </h2>
                                <button
                                    onClick={closeFilter}
                                    className="p-2 -mr-2 text-zinc-400 hover:text-wine-dark transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <FilterContent />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
