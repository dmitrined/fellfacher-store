/**
 * Назначение файла: Прямое описание структуры продукта из WooCommerce REST API.
 * Зависимости: Нет.
 * Особенности: Отражает сырые данные из API перед маппингом.
 */

export interface WooCommerceProduct {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: string;
    date_modified: string;
    type: 'simple' | 'variable' | 'grouped' | 'external';
    status: 'publish' | 'draft' | 'pending' | 'private';
    featured: boolean;
    catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
    description: string;       // Содержит HTML
    short_description: string; // Содержит HTML
    sku: string;
    price: string;             // Например "59.00"
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string | null;
    date_on_sale_to: string | null;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    external_url: string;
    button_text: string;
    tax_status: 'taxable' | 'shipping' | 'none';
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    backorders: 'no' | 'notify' | 'yes';
    backorders_allowed: boolean;
    backordered: boolean;
    sold_individually: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    tags: {
        id: number;
        name: string;
        slug: string;
    }[];
    images: {
        id: number;
        date_created: string;
        src: string;
        name: string;
        alt: string;
    }[];
    attributes: {
        id: number;
        name: string;
        slug: string;
        position: number;
        visible: boolean;
        variation: boolean;
        options: string[];
    }[];
    default_attributes: {
        id: number;
        name: string;
        option: string;
    }[];
    variations: number[];
    grouped_products: number[];
    menu_order: number;
    meta_data: {
        id: number;
        key: string;
        value: string | number | boolean | object | null;
    }[];
    yoast_head?: string;
}
