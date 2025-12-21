/**
 * Компонент с интерфейсом покупки вина.
 * Отображает цену, кнопку добавления в корзину, кнопку добавления в избранное
 * и информацию о гарантии качества.
 */
import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { Wine } from '@/lib/data/wines';

// Интерфейс для блока покупки
interface WineDetailPurchaseProps {
    wine: Wine;
    isFavorite: boolean;
    onAddToCart: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    premiumPriceLabel: string;
    addToCartLabel: string;
    qualityGuaranteeLabel: string;
}

// Компонент отвечает за действия покупки (цена, корзина, избранное) и гарантию качества
// Component responsible for purchase actions (price, cart, wishlist) and quality guarantee
export const WineDetailPurchase: React.FC<WineDetailPurchaseProps> = ({
    wine,
    isFavorite,
    onAddToCart,
    onToggleWishlist,
    premiumPriceLabel,
    addToCartLabel,
    qualityGuaranteeLabel
}) => {
    return (
        <div className="mt-auto bg-zinc-900 dark:bg-wine-dark p-6 md:p-8 rounded-[2rem] text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <span className="text-wine-gold text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">{premiumPriceLabel}</span>
                    <span className="text-4xl md:text-5xl font-black serif italic">{wine.price.toFixed(2)} €</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onAddToCart(wine.id)}
                        className="flex-grow sm:flex-grow-0 bg-wine-gold hover:bg-white text-wine-dark font-black px-8 md:px-12 py-4 md:py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-wine-gold/20 text-sm md:text-base"
                    >
                        {addToCartLabel}
                    </button>
                    <button
                        onClick={() => onToggleWishlist(wine.id)}
                        className={`p-4 md:p-5 rounded-2xl transition-all ${isFavorite
                            ? 'bg-wine-gold text-white shadow-lg shadow-wine-gold/20'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                    >
                        <Heart className={`w-5 h-5 md:w-6 md:h-6 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 flex items-center gap-4 text-white/40">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">
                    {qualityGuaranteeLabel}
                </span>
            </div>
        </div>
    );
};
