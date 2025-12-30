/**
 * Назначение файла: API Route для проксирования запросов к продуктам (вина + мероприятия).
 * Зависимости: next/server, lib/woocommerce.
 * Особенности: Безопасный вызов WooCommerce с сервера, скрытие ключей API от клиента.
 */

import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/woocommerce';

export async function GET() {
    try {
        const products = await fetchProducts();
        
        if (products.length === 0) {
            // Логически успешный запрос, но данных нет (возможно проблема с ключами)
            return NextResponse.json({
                error: 'WooCommerce API не вернул продуктов. Проверьте логи сервера.',
                details: 'Запрос выполнен, но результат пустой.'
            }, { status: 200 }); 
        }
        
        return NextResponse.json(products);
    } catch (error: any) {
        console.error('Ошибка при получении продуктов в API route:', error);
        return NextResponse.json({
            error: 'Не удалось загрузить продукты',
            message: error.message
        }, { status: 500 });
    }
}
