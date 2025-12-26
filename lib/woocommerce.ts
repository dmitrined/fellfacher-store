/**
 * Утилита для работы с WooCommerce REST API.
 * Все запросы выполняются на стороне сервера, чтобы скрыть ключи API (Consumer Key/Secret).
 */

import { Wine } from '@/lib/types';


// Переменные окружения берутся из .env.local
const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.WC_CONSUMER_KEY; // Доступно только на сервере
const WC_SECRET = process.env.WC_CONSUMER_SECRET; // Доступно только на сервере

/**
 * Функция загрузки вин напрямую с сайта fellbacher-weine.de
 * Выполняет маппинг данных из формата WordPress в формат нашего приложения.
 */
export async function fetchWines(): Promise<Wine[]> {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
        console.error('WooCommerce credentials missing. Check .env.local');
        return [];
    }

    // Кодируем ключи для Basic Auth
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

    try {
        // Запрашиваем до 100 товаров из категории "Вино"
        const response = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            next: { revalidate: 3600 } // Кешируем на 1 час
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`WooCommerce API Error: ${error.message || response.statusText}`);
        }

        const products = await response.json();

        // Преобразуем данные WooCommerce в наш интерфейс Wine
        return products.map((product: any) => {
            // Поиск значения в атрибутах (год, сорт и т.д.)
            const getAttr = (name: string) =>
                product.attributes?.find((a: any) => a.name.toLowerCase() === name.toLowerCase())?.options[0] || '';

            return {
                id: product.id.toString(),
                name: product.name,
                // Если год не указан в атрибутах, ставим текущий
                year: parseInt(getAttr('Jahrgang')) || new Date().getFullYear(),
                type: mapType(product.categories),
                grapeVariety: getAttr('Rebsorte') || 'Cuvée',
                price: parseFloat(product.price) || 0,
                image: product.images[0]?.src || '',
                // Очищаем описание от HTML тегов WordPress
                description: product.description ? product.description.replace(/<[^>]*>?/gm, '') : '',
                alcohol: getAttr('Alkohol') || '12.0%',
                acidity: getAttr('Säure') || '5.0 g/l',
                sugar: getAttr('Restzucker') || '3.0 g/l'
            };
        });
    } catch (error) {
        console.error('Failed to load wines from API:', error);
        return [];
    }
}

/**
 * Вспомогательная функция для определения типа вина по категориям WordPress
 */
function mapType(categories: any[]): Wine['type'] {
    if (!categories || !Array.isArray(categories)) return 'Rotwein';

    const catNames = categories.map(c => c.name.toLowerCase());
    if (catNames.includes('rotwein')) return 'Rotwein';
    if (catNames.includes('weißwein')) return 'Weißwein';
    if (catNames.includes('roséwein') || catNames.includes('rosé')) return 'Roséwein';
    if (catNames.includes('sekt')) return 'Sekt';
    if (catNames.includes('alkoholfrei')) return 'Alkoholfrei';
    return 'Rotwein'; // Значение по умолчанию
}
