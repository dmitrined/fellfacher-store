/**
 * Назначение: Глобальное состояние списка желаемого (Wishlist State).
 * Зависимости: Zustand, Persist middleware.
 * Особенности:
 * - Клиентский стор с сохранением в LocalStorage ('wishlist-storage').
 * - Хранит массив ID понравившихся вин.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Интерфейс состояния списка желаемого
interface WishlistState {
    wishlist: string[]; // Массив ID вин
    toggleWishlist: (wineId: string) => void; // Переключить состояние (добавить/удалить)
    isInWishlist: (wineId: string) => boolean; // Проверить наличие
    clearWishlist: () => void; // Очистить список
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            wishlist: [],

            // Переключение состояния избранного
            toggleWishlist: (wineId: string) => {
                set((state) => {
                    const exists = state.wishlist.includes(wineId);
                    return {
                        wishlist: exists
                            ? state.wishlist.filter((id) => id !== wineId) // Удаляем
                            : [...state.wishlist, wineId], // Добавляем
                    };
                });
            },

            // Проверка, находится ли вино в избранном
            isInWishlist: (wineId: string) => {
                return get().wishlist.includes(wineId);
            },

            // Очистка списка (например, при выходе из аккаунта)
            clearWishlist: () => set({ wishlist: [] }),
        }),
        {
            name: 'wishlist-storage', // Ключ в LocalStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);
