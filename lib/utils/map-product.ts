import { WooCommerceProduct } from '@/lib/types/woocommerce';
import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';

/**
 * Назначение: Унифицированная витрина Shop/Events
 * Зависимости: WooCommerce API
 */

// Тип объединяющий Вино и Мероприятие
export type UnifiedProduct = Wine | Event;

/**
 * Утилита для определения, является ли продукт мероприятием.
 * Проверяет наличие категорий: 'Events', 'Weinproben', 'Kellerblicke', 'Kartenvorverkauf'.
 */
export function isEventCategory(categories: { name: string; slug: string }[]): boolean {
    const eventKeywords = ['events', 'weinproben', 'kellerblicke', 'kartenvorverkauf', 'veranstaltungen'];
    return categories.some(cat =>
        eventKeywords.some(keyword => cat.slug.toLowerCase().includes(keyword) || cat.name.toLowerCase().includes(keyword))
    );
}

/**
 * Маппер для преобразования WooCommerceProduct -> Wine | Event
 */
export function mapProduct(product: WooCommerceProduct): UnifiedProduct {
    const isEvent = isEventCategory(product.categories);

    // Common fields
    const id = product.id.toString();
    const price = product.price || product.regular_price || '0';
    const image = product.images.length > 0 ? product.images[0].src : '/images/placeholder.png'; // Need a better placeholder logic handling

    // Helper to get attribute
    const getAttr = (name: string) => {
        const attr = product.attributes?.find((a) => a.name.toLowerCase() === name.toLowerCase());
        return attr && attr.options && attr.options.length > 0 ? attr.options[0] : '';
    };

    if (isEvent) {
        // --- EVENT MAPPING ---
        // Пытаемся извлечь дату из названия или атрибутов
        // Формат названия часто содержит дату: "Wine & Paint - 18. April 2026"
        let date = '';
        const dateMatch = product.name.match(/(\d{1,2}\.?\s?[A-Za-zäöüÄÖÜ]+\s?\d{4})/);
        if (dateMatch) {
            date = dateMatch[0];
        } else {
            // Fallback to attribute if exists (e.g. 'Datum')
            date = getAttr('Datum') || getAttr('date');
        }

        const mappedEvent: Event = {
            id,
            title: product.name,
            date: date, // Extracted date
            time: getAttr('Uhrzeit') || getAttr('time') || '18:00', // Mock default or extract
            location: getAttr('Ort') || 'Fellbach',
            spots: (product.stock_quantity || 100).toString(),
            price: price,
            category: product.categories.length > 0 ? product.categories[0].name : 'In Person',
            image: image,
            // Boolean flags based on categories for the specific formatting in EventCard (if needed)
            isKellerblicke: product.categories.some(c => c.slug.includes('kellerblicke')),
            isWeinproben: product.categories.some(c => c.slug.includes('weinproben')),
            isWeinfeste: product.categories.some(c => c.slug.includes('weinfeste')),
            isAfterwork: product.categories.some(c => c.slug.includes('afterwork')),
            isWeinWeiter: product.categories.some(c => c.slug.includes('weiter')),
            isWeintreff: product.categories.some(c => c.slug.includes('weintreff')),
        };
        return mappedEvent;
    } else {
        // --- WINE MAPPING ---
        let cleanDescription = product.description ? product.description.replace(/<[^>]*>?/gm, '') : '';
        // Strip everything before "Weinbeschreibung:" if it exists
        if (cleanDescription.includes('Weinbeschreibung:')) {
            cleanDescription = cleanDescription.split('Weinbeschreibung:')[1].trim();
        }

        const cleanShortDescription = product.short_description ? product.short_description.replace(/<[^>]*>?/gm, '') : '';

        // Determine Type
        const determineType = (): Wine['type'] => {
            const cats = product.categories.map(c => c.slug.toLowerCase());
            if (cats.some(c => c.includes('rot'))) return 'Rotwein';
            if (cats.some(c => c.includes('weiss') || c.includes('weiß'))) return 'Weißwein';
            if (cats.some(c => c.includes('rose') || c.includes('rosé'))) return 'Roséwein';
            if (cats.some(c => c.includes('sekt'))) return 'Sekt';
            if (cats.some(c => c.includes('alkohol'))) return 'Alkoholfrei';
            return 'Rotwein';
        };

        const mappedWine: Wine = {
            id,
            name: product.name,
            slug: product.slug,
            price: parseFloat(price),
            regular_price: parseFloat(product.regular_price || price),
            description: cleanDescription,
            short_description: cleanShortDescription,
            stock_status: product.stock_status === 'instock' ? 'instock' : 'outofstock',
            images: product.images.map(img => ({ src: img.src, alt: img.alt })),
            categories: product.categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })),
            tags: product.tags?.map(t => ({ id: t.id, name: t.name, slug: t.slug })) || [],
            attributes: product.attributes.map(a => ({ name: a.name, options: a.options })),
            sku: product.sku || '',
            weight: product.weight || '0.75',
            stock_quantity: product.stock_quantity,
            tax_status: product.tax_status,
            tax_class: product.tax_class || '',
            image: image,
            year: parseInt(getAttr('Jahrgang')) || 0,
            type: determineType(),
            grapeVariety: getAttr('Rebsorte') || 'Cuvée',
            alcohol: getAttr('Alkohol') || '',
            acidity: getAttr('Säure') || '',
            sugar: getAttr('Restzucker') || '',
            location: getAttr('Lage / Herkunft') || getAttr('Gemarkung') || '',
            quality_level: getAttr('Qualitätsstufe') || '',
            flavor: getAttr('Geschmacksrichtung') || '',
            soil: getAttr('Bodenart') || '',
            producer: getAttr('Erzeuger / Abfüller') || 'Fellbacher Weingärtner eG',
            temp: getAttr('Trinktemperatur') || ''
        };
        return mappedWine;
    }
}
