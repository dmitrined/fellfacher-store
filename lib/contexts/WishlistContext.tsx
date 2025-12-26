"use client";

/**
 * Контекст списка желаемого (избранное).
 * Управляет списком ID вин, которые пользователь пометил как понравившиеся.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Типизация контекста списка желаемого
interface WishlistContextType {
    wishlist: string[]; // Массив ID вин
    toggleWishlist: (wineId: string) => void; // Добавить или удалить из избранного
    isInWishlist: (wineId: string) => boolean; // Проверка наличия в списке
    clearWishlist: () => void; // Очистить весь список
}

// Создание контекста с дефолтным неопределенным значением
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Провайдер списка желаемого
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние списка (массив строк-идентификаторов)
    const [wishlist, setWishlist] = useState<string[]>([]);
    const { isLoggedIn } = useAuth();

    // Эффект для загрузки избранных товаров из localStorage при запуске
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Очистка избранного при выходе из системы
    useEffect(() => {
        if (!isLoggedIn) {
            setWishlist([]);
            localStorage.removeItem('wishlist');
        }
    }, [isLoggedIn]);

    /**
     * Переключение состояния "избранное" для конкретного вина.
     * Если оно уже в списке — удаляет, если нет — добавляет.
     */
    const toggleWishlist = (wineId: string) => {
        setWishlist(prev => {
            const next = prev.includes(wineId)
                ? prev.filter(id => id !== wineId)
                : [...prev, wineId];

            // Синхронизация с локальным хранилищем браузера
            localStorage.setItem('wishlist', JSON.stringify(next));
            return next;
        });
    };

    /**
     * Очистка всего списка избранного.
     */
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem('wishlist');
    };

    /**
     * Вспомогательная функция для проверки, помечено ли вино как избранное.
     */
    const isInWishlist = (wineId: string) => wishlist.includes(wineId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Кастомный хук для использования данных и функций списка желаемого в компонентах
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
