"use client";

/**
 * Компонент карточки вина.
 * Используется в списках товаров для отображения краткой информации, цены и кнопок действий (корзина, избранное).
 */

import React, { useState } from 'react';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { Wine } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuth } from '@/lib/contexts/AuthContext';

interface WineCardProps {
    wine: Wine;
}

const WineCard: React.FC<WineCardProps> = ({ wine }) => {
    const { t } = useTranslation();

    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const isInWishlist = useWishlistStore(state => state.isInWishlist);

    const cart = useCartStore(state => state.cart);
    const addToCart = useCartStore(state => state.addToCart);
    const isInCart = useCartStore(state => state.isInCart);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const [imageError, setImageError] = useState(false);

    const isFavorite = isInWishlist(wine.id);
    const inCart = isInCart(wine.id);
    const cartItem = cart.find(item => item.id === wine.id);

    return (
        <div className="group relative bg-white dark:bg-zinc-900 overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            {/* Image Section Wrapper */}
            <div className="relative h-64 w-full bg-zinc-50 dark:bg-zinc-800 transition-colors group-hover:bg-white dark:group-hover:bg-zinc-900">
                <Link href={`/shop/${wine.slug}`} className="block h-full w-full p-4">
                    {!imageError ? (
                        <div className="relative h-full w-full transform group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                            <img
                                src={wine.image}
                                alt={wine.name}
                                className="h-full w-full object-contain"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-3xl w-full h-full border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                            <span className="text-sm font-black text-wine-dark dark:text-white uppercase tracking-tighter serif italic break-words line-clamp-3">
                                {wine.name}
                            </span>
                            <div className="mt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                {t("image_not_available")}
                            </div>
                        </div>
                    )}
                </Link>

                {/* Wishlist Button - Overlay on Image */}
                <div className="absolute top-6 right-6 z-30">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isLoggedIn) {
                                toggleWishlist(wine.id);
                            } else {
                                setAuthModalOpen(true);
                            }
                        }}
                        className={`p-3 rounded-2xl transition-all duration-300 backdrop-blur-md ${isFavorite
                            ? 'bg-wine-gold text-white shadow-lg shadow-wine-gold/20 scale-110'
                            : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-400 hover:text-wine-gold'
                            }`}
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-wine-gold font-black mb-2">
                        {wine.grapeVariety}
                    </p>
                    <Link href={`/shop/${wine.slug}`}>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-3 group-hover:text-wine-gold transition-colors serif">
                            {wine.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                    <div className="flex flex-col mb-4">
                        <span className="text-3xl font-black text-zinc-900 dark:text-white italic serif">
                            {wine.price.toFixed(2).replace('.', ',')} €
                        </span>
                        <div className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-2 space-y-0.5">
                            <p>{t('product_tax_inc')}</p>
                            <p>
                                (€ {((wine.price) / parseFloat(wine.weight || '0.75')).toFixed(2).replace('.', ',')} {t('product_unit_price')})
                            </p>
                            <p>{t('product_shipping_extra')}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {t('product_delivery_time')}
                        </p>

                        <div className="flex items-center gap-2">
                            {inCart && (
                                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 border border-zinc-200 dark:border-zinc-700">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (isLoggedIn) {
                                                updateQuantity(wine.id, -1);
                                            } else {
                                                setAuthModalOpen(true);
                                            }
                                        }}
                                        className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-500"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-xs font-black w-4 text-center dark:text-white">{cartItem?.quantity}</span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (isLoggedIn) {
                                                updateQuantity(wine.id, 1);
                                            } else {
                                                setAuthModalOpen(true);
                                            }
                                        }}
                                        className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-500"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isLoggedIn) {
                                        addToCart(wine.id);
                                    } else {
                                        setAuthModalOpen(true);
                                    }
                                }}
                                className={`p-4 rounded-2xl transition-all duration-300 shadow-xl ${inCart
                                    ? 'bg-zinc-900 text-white'
                                    : 'bg-wine-gold hover:bg-zinc-900 text-white'
                                    }`}
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WineCard;
