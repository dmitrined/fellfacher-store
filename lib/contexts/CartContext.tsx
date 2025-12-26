/**
 * Контекст корзины покупок.
 * Позволяет добавлять, удалять товары, изменять их количество и сохранять состояние в localStorage.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Интерфейс элемента корзины
export interface CartItem {
    id: string; // ID вина
    quantity: number; // Количество
}

// Типизация контекста корзины
interface CartContextType {
    cart: CartItem[]; // Массив товаров в корзине
    addToCart: (wineId: string) => void; // Добавить товар
    removeFromCart: (wineId: string) => void; // Удалить товар полностью
    updateQuantity: (wineId: string, delta: number) => void; // Изменить количество (+1 или -1)
    clearCart: () => void; // Очистить корзину
    isInCart: (wineId: string) => boolean; // Проверка наличия товара в корзине
    getCartCount: () => number; // Общее количество бутылок в корзине
}

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined);

// Провайдер корзины
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние корзины
    const [cart, setCart] = useState<CartItem[]>([]);
    const { isLoggedIn } = useAuth();

    // Эффект для загрузки данных корзины из localStorage при монтировании
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                setCart(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Реф для отслеживания предыдущего состояния входа, чтобы отличить логаут от начальной загрузки
    const prevIsLoggedIn = React.useRef(isLoggedIn);

    // Очистка корзины ТОЛЬКО при выходе из системы (переход из true в false)
    useEffect(() => {
        if (prevIsLoggedIn.current && !isLoggedIn) {
            setCart([]);
            localStorage.removeItem('cart');
        }
        prevIsLoggedIn.current = isLoggedIn;
    }, [isLoggedIn]);


    /**
     * Добавление товара в корзину.
     * Если товар уже есть, увеличивает его количество на 1.
     */
    const addToCart = (wineId: string) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === wineId);
            let next: CartItem[];

            if (existingItem) {
                // Увеличиваем количество существующего товара
                next = prev.map(item =>
                    item.id === wineId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Добавляем новый товар в список
                next = [...prev, { id: wineId, quantity: 1 }];
            }

            // Синхронизация с локальным хранилищем
            localStorage.setItem('cart', JSON.stringify(next));
            return next;
        });
    };

    /**
     * Удаление товара из корзины по ID.
     */
    const removeFromCart = (wineId: string) => {
        setCart(prev => {
            const next = prev.filter(item => item.id !== wineId);
            localStorage.setItem('cart', JSON.stringify(next));
            return next;
        });
    };

    /**
     * Обновление количества товара.
     * @param delta - значение изменения (+1 или -1)
     */
    const updateQuantity = (wineId: string, delta: number) => {
        setCart(prev => {
            const next = prev.map(item => {
                if (item.id === wineId) {
                    // Рассчитываем новое количество, не позволяя ему стать меньше 0
                    const newQuantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0); // Удаляем товары с нулевым количеством

            localStorage.setItem('cart', JSON.stringify(next));
            return next;
        });
    };

    /**
     * Очистка всей корзины (например, после оформления заказа).
     */
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    // Вспомогательная функция для проверки, добавлено ли вино в корзину
    const isInCart = (wineId: string) => cart.some(item => item.id === wineId);

    // Подсчет общего количества всех товаров в корзине
    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isInCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Хук для доступа к методам и состоянию корзины
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
