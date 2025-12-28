/**
 * Утилита для работы с WooCommerce REST API.
 * Все запросы выполняются на стороне сервера, чтобы скрыть ключи API (Consumer Key/Secret).
 */

import { Wine } from '@/lib/types'; // Legacy import, kept for compatibility
import { UnifiedProduct, mapProduct } from '@/lib/utils/map-product';
import { WooCommerceProduct } from '@/lib/types/woocommerce';

// Переменные окружения берутся из .env.local
const WC_URL = process.env.WC_STORE_URL || process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.WC_CONSUMER_KEY; // Доступно только на сервере
const WC_SECRET = process.env.WC_CONSUMER_SECRET; // Доступно только на сервере

/**
 * Функция загрузки ВСЕХ продуктов (вино + мероприятия)
 * Использует пагинацию для загрузки всех продуктов из WooCommerce
 */
export async function fetchProducts(): Promise<UnifiedProduct[]> {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
        console.error('WooCommerce credentials missing. Check .env.local');
        return [];
    }

    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const allProducts: WooCommerceProduct[] = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100; // Максимум продуктов на страницу

    try {
        while (hasMore) {
            const response = await fetch(
                `${WC_URL}/wp-json/wc/v3/products?per_page=${perPage}&page=${page}&status=publish`,
                {
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'Content-Type': 'application/json'
                    },
                    next: { revalidate: 3600 }
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const products: WooCommerceProduct[] = await response.json();

            if (products.length === 0) {
                hasMore = false;
            } else {
                allProducts.push(...products);

                // Проверяем заголовок X-WP-TotalPages для определения общего количества страниц
                const totalPages = response.headers.get('X-WP-TotalPages');
                if (totalPages && page >= parseInt(totalPages)) {
                    hasMore = false;
                } else if (products.length < perPage) {
                    // Если получили меньше продуктов чем запрашивали, значит это последняя страница
                    hasMore = false;
                } else {
                    page++;
                }
            }
        }

        console.log(`Loaded ${allProducts.length} products from WooCommerce API`);
        return allProducts.map(mapProduct);
    } catch (error) {
        console.error('Failed to load products from API:', error);
        return [];
    }
}

/**
 * Legacy wrapper: Returns only Wines from the unified fetch
 */
export async function fetchWines(): Promise<Wine[]> {
    const allProducts = await fetchProducts();
    // Filter out events. We check if it is a Wine by ensuring it has 'grapeVariety' which is Wine-specific in our mapper.
    // Events don't have grapeVariety.
    return allProducts.filter((p): p is Wine => {
        return (p as Wine).grapeVariety !== undefined;
    });
}
