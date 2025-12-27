"use client";

/**
 * Компонент карточки вина.
 * Используется в списках товаров для отображения краткой информации, цены и кнопок действий (корзина, избранное).
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MessageSquare, Heart } from 'lucide-react';
import { ShoppingCart, Plus, Minus } from '@/app/icon-sets';
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

    // Migrated from WishlistContext
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const isInWishlist = useWishlistStore(state => state.isInWishlist);

    // Migrated from CartContext
    // Note: selecting specific actions to avoid unnecessary re-renders
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
            <div className="absolute top-6 right-6 z-20">
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

            <Link href={`/shop/${wine.id}`} className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative h-64 w-full bg-zinc-50 dark:bg-zinc-800 p-4 transition-colors group-hover:bg-white dark:group-hover:bg-zinc-900 flex items-center justify-center">
                    {!imageError ? (
                        <div className="relative h-full w-full transform group-hover:scale-110 transition-transform duration-700">
                            <img
                                src={wine.image}
                                alt={wine.name}
                                className="h-full w-full object-contain"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-3xl w-full h-full border-2 border-dashed border-zinc-200 dark:border-zinc-700 animate-in fade-in duration-500">
                            <span className="text-sm font-black text-wine-dark dark:text-white uppercase tracking-tighter serif italic break-words line-clamp-3">
                                {wine.name}
                            </span>
                            <div className="mt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                {t("image_not_available")}
                            </div>
                        </div>
                    )}

                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 bg-wine-dark text-white text-xs font-bold px-2 py-1 rounded">
                        {wine.year}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-medium mb-1">
                            {wine.grapeVariety}
                        </p>
                        <h3 className="text-lg font-bold text-wine-dark dark:text-white leading-tight mb-2 group-hover:text-wine-gold transition-colors">
                            {wine.name}
                        </h3>
                        <span className="bg-wine-gold/10 text-wine-gold px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">
                            {wine.type}
                        </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-wine-dark dark:text-white">
                                {wine.price.toFixed(2)} €
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {inCart && (
                                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 border border-zinc-200 dark:border-zinc-700 animate-in fade-in zoom-in duration-300">
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
                                        className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-500 hover:text-wine-dark dark:hover:text-white"
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
                                        className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-500 hover:text-wine-dark dark:hover:text-white"
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
                                className={`p-3 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg ${inCart
                                    ? 'bg-zinc-800 text-white shadow-zinc-800/20'
                                    : 'bg-wine-gold hover:bg-wine-dark text-white shadow-wine-gold/20'
                                    }`}
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default WineCard;
