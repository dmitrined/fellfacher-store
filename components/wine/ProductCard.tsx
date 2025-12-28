/**
 * Назначение: Универсальная карточка продукта (Вино или Мероприятие).
 * Зависимости: i18n, next/image, next/link.
 * Описание: Меняет отображение в зависимости от типа сущности.
 */

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Calendar, ArrowRight, Heart } from 'lucide-react';
import { UnifiedProduct } from '@/lib/utils/map-product';
import { Wine } from '@/lib/types/wine';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuth } from '@/lib/contexts/AuthContext';

interface ProductCardProps {
    product: UnifiedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { t } = useTranslation();
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const isInWishlist = useWishlistStore(state => state.isInWishlist);
    const addToCart = useCartStore(state => state.addToCart);
    const { isLoggedIn, setAuthModalOpen } = useAuth();

    // Определяем тип: если есть 'grapeVariety', это вино. Если есть 'time'/'location', это Event.
    const isWineItem = (p: UnifiedProduct): p is Wine => {
        return (p as any).grapeVariety !== undefined;
    };

    const isWine = isWineItem(product);
    const isEvent = !isWine;

    const isFavorite = isInWishlist(product.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Link href={isWine ? `/shop/${(product as any).slug}` : `/events/${product.id}`} className="block h-full w-full">
                    <Image
                        src={product.image}
                        alt={isEvent ? (product as any).title : (product as any).name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Wishlist Button Overlay */}
                {isWine && (
                    <div className="absolute top-4 right-4 z-30">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isLoggedIn) {
                                    toggleWishlist(product.id);
                                } else {
                                    setAuthModalOpen(true);
                                }
                            }}
                            className={`p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md ${isFavorite
                                ? 'bg-wine-gold text-white shadow-lg shadow-wine-gold/20'
                                : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-400 hover:text-wine-gold'
                                }`}
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                )}


            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow gap-3">

                {/* Meta Line */}
                <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                    {isWine ? (
                        <span>{(product as any).grapeVariety}</span>
                    ) : (
                        <span className="flex items-center gap-1 text-wine-gold">
                            <Calendar className="w-3 h-3" />
                            {(product as any).date}
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link href={isWine ? `/shop/${(product as any).slug}` : `/events/${product.id}`} className="block">
                    <h3 className="text-lg font-bold text-wine-dark dark:text-white group-hover:text-wine-gold transition-colors line-clamp-2 serif">
                        {isEvent ? (product as any).title : (product as any).name}
                    </h3>
                </Link>

                {/* Description (Short) */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[2.5em] flex-grow">
                    {/* Event usually has nice 'title' but description might be long. Wine has short_description. */}
                    {isEvent ? '' : (product as any).short_description}
                </p>

                {/* Footer: Price & Action */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-col">
                            <div className="text-wine-dark dark:text-white font-black text-xl italic serif">
                                {typeof product.price === 'number'
                                    ? `€ ${product.price.toFixed(2).replace('.', ',')}`
                                    : product.price ? `€ ${parseFloat(product.price).toFixed(2).replace('.', ',')}` : '€ 0,00'}
                            </div>
                            {isWine && (
                                <div className="text-[10px] text-zinc-500 font-medium leading-tight mt-0.5">
                                    <p>{t('product_tax_inc')}</p>
                                    <p>
                                        (€ {((isWine ? (product as Wine).price : 0) / parseFloat((isWine ? (product as Wine).weight : '1') || '0.75')).toFixed(2).replace('.', ',')} {t('product_unit_price')})
                                    </p>
                                    <p>{t('product_shipping_extra')}</p>
                                </div>
                            )}
                        </div>

                        {isWine ? (
                            <button
                                className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-wine-dark dark:text-white hover:bg-wine-gold hover:text-white transition-all shadow-sm hover:shadow-wine-gold/20"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isLoggedIn) {
                                        addToCart(product.id);
                                    } else {
                                        setAuthModalOpen(true);
                                    }
                                }}
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        ) : (
                            <Link
                                href={`/events/${product.id}`}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wine-gold hover:text-wine-gold/80"
                            >
                                Tickets <ArrowRight className="w-3 h-3" />
                            </Link>
                        )}
                    </div>

                    {isWine && (
                        <div className="mt-2 pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
                            <p className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                {t('product_delivery_time')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
