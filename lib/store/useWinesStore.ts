/**
 * Назначение файла: Хранилище (Store) для управления каталогом вин и мероприятий.
 * Зависимости: Zustand, UnifiedProduct.
 * Особенности: Синхронизация данных через API-прокси, фильтрация по ID, управление состоянием загрузки.
 */

import { create } from 'zustand';
import { UnifiedProduct } from '@/lib/utils/map-product';
import { Wine } from '@/lib/types/wine';

// Интерфейс состояния хранилища
interface WinesState {
    wines: UnifiedProduct[]; // Список всех продуктов
    isLoading: boolean; // Флаг загрузки
    error: string | null; // Сообщение об ошибке
    lastFetched: number | null; // Штамп времени последнего обновления

    // Методы
    fetchProducts: (force?: boolean) => Promise<void>;
    getWineById: (id: string) => Wine | undefined;
    getEventById: (id: string) => any; // TODO: заменить any на Event после уточнения типов
    setWines: (wines: UnifiedProduct[]) => void;
}

/**
 * Хук-хранилище для доступа к данным каталога по всему приложению.
 */
export const useWinesStore = create<WinesState>((set, get) => ({
    wines: [],
    isLoading: false,
    error: null,
    lastFetched: null,

    /**
     * Загрузка продуктов из API.
     * @param force - если true, игнорирует кэш и выполняет запрос заново.
     */
    fetchProducts: async (force = false) => {
        const { lastFetched, isLoading, wines } = get();

        // Избегаем повторных запросов, если данные уже загружены менее 5 минут назад
        const CACHE_TIME = 5 * 60 * 1000; // 5 минут
        if (!force && lastFetched && (Date.now() - lastFetched < CACHE_TIME) && wines.length > 0) {
            return;
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/products');
            const products = await response.json();

            if (products.error) {
                throw new Error(products.error);
            }

            set({
                wines: products,
                isLoading: false,
                lastFetched: Date.now(),
                error: products.length === 0 ? 'Продукты не найдены' : null
            });
        } catch (error) {
            console.error('Ошибка в сторе при загрузке:', error);
            set({
                isLoading: false,
                error: 'Не удалось загрузить данные'
            });
        }
    },

    /**
     * Поиск вина по ID.
     */
    getWineById: (id: string) => {
        const product = get().wines.find(w => w.id === id || ('slug' in w && w.slug === id));
        return product && 'slug' in product ? (product as Wine) : undefined;
    },

    /**
     * Поиск мероприятия по ID.
     */
    getEventById: (id: string) => {
        const product = get().wines.find(w => w.id === id);
        return product && !('slug' in product) ? product : undefined;
    },

    /**
     * Принудительная установка списка продуктов.
     */
    setWines: (wines) => set({ wines, lastFetched: Date.now() }),
}));
