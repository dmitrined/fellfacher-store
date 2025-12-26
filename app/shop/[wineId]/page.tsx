"use client";

/**
 * Детальная страница вина.
 * Получает ID вина из параметров URL, находит соответствующее вино в WinesContext
 * (которое может быть как реальным из API, так и моковым)
 * и отображает его характеристики.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { WineDetailImage } from '@/components/wine/WineDetailImage';
import { WineDetailHeader } from '@/components/wine/WineDetailHeader';
import { WineDetailExperience } from '@/components/wine/WineDetailExperience';
import { WineDetailStats } from '@/components/wine/WineDetailStats';
import { WineDetailPurchase } from '@/components/wine/WineDetailPurchase';
import { useTranslation } from '@/lib/i18n';
import { useWishlist } from '@/lib/contexts/WishlistContext';
import { useCart } from '@/lib/contexts/CartContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useWines } from '@/lib/contexts/WinesContext';

export default function WineDetailPage() {
    const { t } = useTranslation();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const { getWineById, isLoading } = useWines(); // Берем вино из глобального контекста

    const params = useParams();
    const wineId = params.wineId as string;
    const wine = getWineById(wineId);

    const isFavorite = wine ? isInWishlist(wine.id) : false;

    // Если данные еще грузятся, показываем скелетон или спиннер
    if (isLoading && !wine) {
        return (
            <div className="min-h-screen pt-32 flex justify-center bg-white dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wine-dark"></div>
            </div>
        );
    }

    if (!wine) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{t("no_wines_found")}</h2>
                    <Link href="/shop" className="text-wine-gold font-bold hover:underline">{t("back_to_collection")}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Навигация назад */}
                <Link
                    href="/shop"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("back_to_collection")}</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Секция изображения */}
                    <WineDetailImage
                        image={wine.image}
                        name={wine.name}
                        year={wine.year}
                    />

                    {/* Детали вина */}
                    <div className="flex flex-col">
                        <WineDetailHeader
                            type={wine.type}
                            name={wine.name}
                            grapeVariety={wine.grapeVariety}
                        />

                        <WineDetailExperience
                            title={t("experience_title")}
                            description={wine.description || t("experience_desc")}
                        />

                        <WineDetailStats
                            alcoholLabel={wine.alcohol || t("stats_alcohol")}
                            acidityLabel={wine.acidity || t("stats_acidity")}
                            sugarLabel={wine.sugar || t("stats_sugar")}
                        />

                        <WineDetailPurchase
                            wine={wine}
                            isFavorite={isFavorite}
                            onAddToCart={(id) => {
                                if (isLoggedIn) {
                                    addToCart(id);
                                } else {
                                    setAuthModalOpen(true);
                                }
                            }}
                            onToggleWishlist={(id) => {
                                if (isLoggedIn) {
                                    toggleWishlist(id);
                                } else {
                                    setAuthModalOpen(true);
                                }
                            }}
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
