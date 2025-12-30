/**
 * Назначение файла: Заголовок детальной страницы вина (Wine Detail Header).
 * Зависимости: React.
 * Особенности: Отображение названия, сорта винограда, артикула и категорий.
 */

import React from 'react';

interface WineDetailHeaderProps {
    type: string;
    name: string;
    grapeVariety: string;
    sku?: string;
    categories?: { id: number; name: string; slug: string }[];
    tags?: { id: number; name: string; slug: string }[];
    t: (key: string) => string;
}

/**
 * Компонент заголовка с названием и основной информацией.
 */
export const WineDetailHeader: React.FC<WineDetailHeaderProps> = ({
    name,
    grapeVariety,
    sku,
    categories,
    t
}) => {
    return (
        <div className="mb-6 md:mb-8">
            {/* Артикул */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                {sku && (
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        {t('product_sku')}: {sku}
                    </span>
                )}
            </div>

            {/* Название вина */}
            <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-3 md:mb-4 serif leading-tight">
                {name}
            </h1>

            {/* Сорт винограда */}
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium tracking-tight mb-4">
                {grapeVariety}
            </p>

            {/* Категории */}
            {categories && categories.length > 0 && (
                <div className="text-xs text-zinc-400 font-medium">
                    <span className="uppercase tracking-widest mr-2">{t('nav_shop')}:</span>
                    {categories.map((cat, idx) => (
                        <span key={cat.id}>
                            {cat.name}{idx < categories.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
