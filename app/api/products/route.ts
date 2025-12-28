import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/woocommerce';

/**
 * API Route to proxy getting all products (wines + events)
 * Securely calls WooCommerce from server side
 */
export async function GET() {
    try {
        const products = await fetchProducts();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
