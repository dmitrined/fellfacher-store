/**
 * Назначение: Глобальное состояние корзины (Global Cart State).
 * Зависимости: Zustand, Persist middleware.
 * Особенности:
 * - Клиентский стор с сохранением в LocalStorage ('cart-storage').
 * - Управление товарами: добавление, удаление, изменение количества.
 * - Расчет общего количества товаров.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Интерфейс элемента корзины
export interface CartItem {
    id: string; // ID вина
    quantity: number; // Количество
}

// Интерфейс состояния корзины
interface CartState {
    cart: CartItem[]; // Массив товаров
    addToCart: (wineId: string) => void; // Добавить товар
    removeFromCart: (wineId: string) => void; // Удалить товар полностью
    updateQuantity: (wineId: string, delta: number) => void; // Изменить количество
    clearCart: () => void; // Очистить корзину повністю
    isInCart: (wineId: string) => boolean; // Проверка наличия
    getCartCount: () => number; // Получить общее количество
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            // Добавление товара в корзину
            addToCart: (wineId: string) => {
                set((state) => {
                    const existingItem = state.cart.find((item) => item.id === wineId);
                    if (existingItem) {
                        // Если товар уже есть, увеличиваем количество
                        return {
                            cart: state.cart.map((item) =>
                                item.id === wineId ? { ...item, quantity: item.quantity + 1 } : item
                            ),
                        };
                    } else {
                        // Иначе добавляем новый
                        return { cart: [...state.cart, { id: wineId, quantity: 1 }] };
                    }
                });
            },

            // Удаление товара из корзины
            removeFromCart: (wineId: string) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== wineId),
                }));
            },

            // Обновление количества товара (+/-)
            updateQuantity: (wineId: string, delta: number) => {
                set((state) => {
                    const newCart = state.cart
                        .map((item) => {
                            if (item.id === wineId) {
                                const newQuantity = Math.max(0, item.quantity + delta);
                                return { ...item, quantity: newQuantity };
                            }
                            return item;
                        })
                        .filter((item) => item.quantity > 0); // Удаляем, если количество стало 0

                    return { cart: newCart };
                });
            },

            // Полная очистка корзины
            clearCart: () => set({ cart: [] }),

            // Проверка наличия товара
            isInCart: (wineId: string) => {
                return get().cart.some((item) => item.id === wineId);
            },

            // Подсчет общего количества товаров
            getCartCount: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage', // Имя ключа в LocalStorage
            storage: createJSONStorage(() => localStorage), // Явное указание хранилища
        }
    )
);
