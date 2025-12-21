"use client";

/**
 * Детальная страница вина.
 * Получает ID вина из параметров URL, находит соответствующее вино в базе данных
 * и отображает его характеристики, изображение и интерфейс покупки с помощью подкомпонентов.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { wines } from '@/lib/data/wines';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { WineDetailImage } from '@/app/components/Wine/WineDetailImage';
import { WineDetailHeader } from '@/app/components/Wine/WineDetailHeader';
import { WineDetailExperience } from '@/app/components/Wine/WineDetailExperience';
import { WineDetailStats } from '@/app/components/Wine/WineDetailStats';
import { WineDetailPurchase } from '@/app/components/Wine/WineDetailPurchase';
import { useTranslation } from '@/lib/i18n';
import { useWishlist } from '@/lib/WishlistContext';
import { useCart } from '@/lib/CartContext';

export default function WineDetailPage() {
    const { t } = useTranslation();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const params = useParams();
    const id = params.id as string;
    const wine = wines.find(w => w.id === id);

    const isFavorite = wine ? isInWishlist(wine.id) : false;

    if (!wine) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{t("no_wines_found")}</h2>
                    <Link href="/catalog" className="text-wine-gold font-bold hover:underline">{t("back_to_collection")}</Link>
                </div>
            </div>
        );
    }

    // Основной лейаут страницы детализации вина.
    // Main layout for the wine detail page.
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs / Back */}
                <Link
                    href="/catalog"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("back_to_collection")}</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Image Section */}
                    {/* Секция изображения */}
                    <WineDetailImage
                        image={wine.image}
                        name={wine.name}
                        year={wine.year}
                    />

                    {/* Details Section */}
                    <div className="flex flex-col">
                        {/* Header Section: Type, Title, Grape */}
                        {/* Секция заголовка: Тип, Название, Сорт */}
                        <WineDetailHeader
                            type={wine.type}
                            name={wine.name}
                            grapeVariety={wine.grapeVariety}
                        />

                        {/* Experience Description */}
                        {/* Описание и впечатления */}
                        <WineDetailExperience
                            title={t("experience_title")}
                            description={t("experience_desc")}
                        />

                        {/* Stats Grid */}
                        {/* Сетка характеристик */}
                        <WineDetailStats
                            alcoholLabel={t("stats_alcohol")}
                            acidityLabel={t("stats_acidity")}
                            sugarLabel={t("stats_sugar")}
                        />

                        {/* Purchase UI */}
                        {/* Интерфейс покупки */}
                        <WineDetailPurchase
                            wine={wine}
                            isFavorite={isFavorite}
                            onAddToCart={addToCart}
                            onToggleWishlist={toggleWishlist}
                            premiumPriceLabel={t("premium_price")}
                            addToCartLabel={t("add_to_cart")}
                            qualityGuaranteeLabel={t("quality_guarantee")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
