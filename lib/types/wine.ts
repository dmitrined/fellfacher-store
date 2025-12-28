export interface Wine {
    id: string; // Keeping as string for internal consistency across the app (routing, store)
    name: string;
    slug: string; // WooCommerce slug
    price: number;
    regular_price: number;
    description: string;
    short_description: string;
    stock_status: 'instock' | 'outofstock';

    // Arrays from WooCommerce
    images: { src: string; alt?: string }[];
    categories: { id: number; name: string; slug: string }[];
    tags?: { id: number; name: string; slug: string }[];
    attributes: { name: string; options: string[] }[];
    // Additional fields for detailed display
    sku?: string;
    weight?: string; // Used for price per liter calculation
    stock_quantity?: number | null;
    tax_status?: string;
    tax_class?: string;

    // Legacy/Convenience fields (Computed/Mapped)
    image: string; // Main image (images[0])
    year: number; // Extracted from attributes
    type: 'Rotwein' | 'Weißwein' | 'Roséwein' | 'Sekt' | 'Alkoholfrei' | 'Paket' | 'Sonstiges'; // Derived from categories
    grapeVariety: string; // Extracted from attributes
    alcohol?: string; // Extracted from attributes
    acidity?: string; // Extracted from attributes
    sugar?: string; // Extracted from attributes
    location?: string; // e.g. "Fellbacher Lämmler"
    quality_level?: string; // e.g. "Qualitätswein"
    flavor?: string; // e.g. "trocken"
    soil?: string; // e.g. "Keuper"
    producer?: string; // e.g. "Fellbacher Weingärtner eG"
    temp?: string; // e.g. "8-10 °C"
}
