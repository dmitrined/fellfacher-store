/**
 * Назначение файла: Взаимодействие с WooCommerce REST API (Server-side).
 * Зависимости: UnifiedProduct, mapProduct, WooCommerceProduct.
 * Особенности: Использование серверного fetch, пагинация для полной выгрузки каталога, ревалидация кэша.
 */

import { Wine } from '@/lib/types/wine';
import { UnifiedProduct, mapProduct } from '@/lib/utils/map-product';
import { WooCommerceProduct } from '@/lib/types/woocommerce';

// Параметры доступа к API из переменных окружения
const WC_URL = process.env.WC_STORE_URL || process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

/**
 * Загрузка всех продуктов (вина и мероприятия) из WordPress/WooCommerce.
 * Реализует параллельную загрузку всех страниц пагинации для максимальной скорости.
 */
export async function fetchProducts(): Promise<UnifiedProduct[]> {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
        const missing = [];
        if (!WC_URL) missing.push('WC_STORE_URL/NEXT_PUBLIC_WC_URL');
        if (!WC_KEY) missing.push('WC_CONSUMER_KEY');
        if (!WC_SECRET) missing.push('WC_CONSUMER_SECRET');
        console.error(`Отсутствуют ключи доступа WooCommerce: ${missing.join(', ')}`);
        return [];
    }

    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const allProducts: WooCommerceProduct[] = [];
    const perPage = 100; // Количество товаров на одну страницу (максимум для API)

    try {
        // Шаг 1: Загрузка первой страницы для получения общего количества страниц
        const firstPageResponse = await fetch(
            `${WC_URL}/wp-json/wc/v3/products?per_page=${perPage}&page=1&status=publish`,
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                next: { revalidate: 3600 } // Кэширование на 1 час
            }
        );

        if (!firstPageResponse.ok) {
            const errorText = await firstPageResponse.text();
            throw new Error(`Ошибка WooCommerce API: ${firstPageResponse.status} - ${errorText}`);
        }

        const firstPageProducts: WooCommerceProduct[] = await firstPageResponse.json();
        allProducts.push(...firstPageProducts);

        const totalPagesHeader = firstPageResponse.headers.get('X-WP-TotalPages');
        const totalPages = totalPagesHeader ? parseInt(totalPagesHeader) : 1;

        // Шаг 2: Параллельная загрузка остальных страниц, если они есть
        if (totalPages > 1) {
            const remainingPagePromises = [];
            for (let i = 2; i <= totalPages; i++) {
                remainingPagePromises.push(
                    fetch(
                        `${WC_URL}/wp-json/wc/v3/products?per_page=${perPage}&page=${i}&status=publish`,
                        {
                            headers: {
                                'Authorization': `Basic ${auth}`,
                                'Content-Type': 'application/json'
                            },
                            next: { revalidate: 3600 }
                        }
                    ).then(async (res) => {
                        if (!res.ok) {
                            console.warn(`Не удалось загрузить страницу ${i}: ${res.statusText}`);
                            return [];
                        }
                        return res.json() as Promise<WooCommerceProduct[]>;
                    })
                );
            }

            const remainingPagesResults = await Promise.all(remainingPagePromises);
            remainingPagesResults.forEach(products => {
                allProducts.push(...products);
            });
        }

        console.log(`Загружено ${allProducts.length} товаров из WooCommerce`);
        // Преобразование сырых данных в унифицированный формат приложения
        return allProducts.map(mapProduct);
    } catch (error) {
        console.error('Критическая ошибка при загрузке товаров:', error);
        return [];
    }
}

/**
 * Обертка для получения только вин (исключая мероприятия).
 * Используется для обратной совместимости в некоторых модулях.
 */
export async function fetchWines(): Promise<Wine[]> {
    const allProducts = await fetchProducts();
    // Фильтрация товаров, имеющих специфичный для вина атрибут 'grapeVariety'
    return allProducts.filter((p): p is Wine => {
        return (p as Wine).grapeVariety !== undefined;
    });
}
