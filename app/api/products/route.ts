import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/woocommerce';

/**
 * API Route to proxy getting all products (wines + events)
 * Securely calls WooCommerce from server side
 */
export async function GET() {
    try {
        const products = await fetchProducts();
        if (products.length === 0) {
            // Logically successful but returned no data (likely credentials issue)
            return NextResponse.json({
                error: 'No products returned from WooCommerce API. Check server logs for credential errors.',
                details: 'The API call executed but returned an empty result.'
            }, { status: 200 }); // Returning 200 to avoid breaking client logic, but with error info
        }
        return NextResponse.json(products);
    } catch (error: any) {
        console.error('Error fetching products in API route:', error);
        return NextResponse.json({
            error: 'Failed to fetch products',
            message: error.message
        }, { status: 500 });
    }
}
