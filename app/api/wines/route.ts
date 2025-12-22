import { NextResponse } from 'next/server';
import { fetchWines } from '@/lib/woocommerce';

/**
 * API Route для получения списка вин.
 * Работает на сервере, поэтому ключи API (Consumer Key/Secret) не видны в браузере.
 */
export async function GET() {
    try {
        const wines = await fetchWines();

        // Если API вернуло пустой список (например, из-за ошибки доступа),
        // возвращаем статус 200, но клиент решит, показывать ли заглушку.
        return NextResponse.json(wines);
    } catch (error) {
        console.error('Error in API Route /api/wines:', error);
        return NextResponse.json({ error: 'Failed to fetch wines' }, { status: 500 });
    }
}
