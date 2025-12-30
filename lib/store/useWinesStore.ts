/**
 * Назначение: Магазин состояний (Zustand) для управления списком вин и продуктов.
 * Зависимости: WooCommerce API (через /api/products)
 * Функции: Загрузка данных, фильтрация, поиск по ID.
 */

import { create } from 'zustand';
import { Wine } from '@/lib/types';
import { UnifiedProduct } from '@/lib/utils/map-product';
import { wines as mockWines } from '@/lib/data/wines';

interface WinesState {
    wines: Wine[];
    products: UnifiedProduct[];
    isLoading: boolean;
    error: string | null;

    // Действия
    fetchProducts: () => Promise<void>;
    getWineById: (id: string) => Wine | undefined;
    getProductById: (id: string) => UnifiedProduct | undefined;
}

export const useWinesStore = create<WinesState>((set, get) => ({
    wines: [],
    products: [],
    isLoading: false,
    error: null,

    /**
     * Загрузка списка продуктов с сервера.
     * При ошибке или пустом ответе используются моковые данные.
     */
    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    const wines = data.filter((p: UnifiedProduct): p is Wine => (p as any).grapeVariety !== undefined);
                    console.log(`Successfully loaded ${data.length} products from API.`);
                    set({ products: data, wines, isLoading: false });
                } else {
                    console.warn('API returned empty list or unexpected data format, falling back to mock wines.');
                    const mockUnified = mockWines as unknown as UnifiedProduct[];
                    set({ products: mockUnified, wines: mockWines, isLoading: false });
                }
            } else {
                const errorBody = await response.text().catch(() => 'No body');
                console.error(`API Error: ${response.status} ${response.statusText}, Body: ${errorBody}`);
                throw new Error(`Server returned error: ${response.status}`);
            }
        } catch (err) {
            console.error('Error loading products from API:', err);
            const mockUnified = mockWines as unknown as UnifiedProduct[];
            set({
                error: 'Failed to load real products.',
                products: mockUnified,
                wines: mockWines,
                isLoading: false
            });
        }
    },

    /**
     * Поиск вина по ID или СЛАГУ.
     */
    getWineById: (id: string) => {
        return get().wines.find(w => w.id === id || w.slug === id);
    },

    /**
     * Поиск любого продукта по ID или СЛАГУ.
     */
    getProductById: (id: string) => {
        return get().products.find(p => p.id === id || (p as any).slug === id);
    },
}));
