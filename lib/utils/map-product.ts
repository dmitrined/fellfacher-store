/**
 * Назначение файла: Преобразование (маппинг) сырых данных WooCommerce в объекты приложения.
 * Зависимости: WooCommerceProduct, Wine, Event.
 * Особенности: Унификация данных для Shop и Events, извлечение характеристик вина из атрибутов и текста.
 */

import { WooCommerceProduct } from '@/lib/types/woocommerce';
import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';

// Объединенный тип для элементов каталога
export type UnifiedProduct = Wine | Event;

/**
 * Определяет, относится ли продукт к категории мероприятий.
 * Анализирует слаги и названия категорий на наличие ключевых слов.
 */
export function isEventCategory(categories: { name: string; slug: string }[]): boolean {
    const eventKeywords = ['events', 'weinproben', 'kellerblicke', 'kartenvorverkauf', 'veranstaltungen'];
    return categories.some(cat =>
        eventKeywords.some(keyword => cat.slug.toLowerCase().includes(keyword) || cat.name.toLowerCase().includes(keyword))
    );
}

/**
 * Основная функция маппинга.
 * Преобразует WooCommerceProduct в Wine или Event в зависимости от категорий.
 */
export function mapProduct(product: WooCommerceProduct): UnifiedProduct {
    const isEvent = isEventCategory(product.categories);

    // Общие поля для всех типов продуктов
    const id = product.id.toString();
    // Логика выбора цены: цена продажи -> регулярная цена -> 0
    const price = product.price || product.regular_price || '0';
    // Изображение: первое из списка или заглушка
    const image = product.images.length > 0 ? product.images[0].src : '/images/placeholder.png';

    /**
     * Вспомогательная функция для извлечения значения атрибута по имени.
     */
    const getAttr = (name: string) => {
        const attr = product.attributes?.find((a) => a.name.toLowerCase() === name.toLowerCase());
        return attr && attr.options && attr.options.length > 0 ? attr.options[0] : '';
    };

    if (isEvent) {
        // --- МАППИНГ МЕРОПРИЯТИЯ (EVENT) ---

        // Попытка извлечь дату из названия (часто формат: "Название - 18. April 2026")
        let date = '';
        const dateMatch = product.name.match(/(\d{1,2}\.?\s?[A-Za-zäöüÄÖÜ]+\s?\d{4})/);
        if (dateMatch) {
            date = dateMatch[0];
        } else {
            // Если в названии нет, ищем в атрибутах
            date = getAttr('Datum') || getAttr('date');
        }

        const mappedEvent: Event = {
            id,
            title: product.name,
            date: date,
            time: getAttr('Uhrzeit') || getAttr('time') || '18:00', // Стандартное время, если не указано
            location: getAttr('Ort') || 'Fellbach',
            spots: (product.stock_quantity || 100).toString(),
            price: price,
            category: product.categories.length > 0 ? product.categories[0].name : 'Events',
            image: image,
            // Флаги категорий для специфического отображения в EventCard
            isKellerblicke: product.categories.some(c => c.slug.includes('kellerblicke')),
            isWeinproben: product.categories.some(c => c.slug.includes('weinproben')),
            isWeinfeste: product.categories.some(c => c.slug.includes('weinfeste')),
            isAfterwork: product.categories.some(c => c.slug.includes('afterwork')),
            isWeinWeiter: product.categories.some(c => c.slug.includes('weiter')),
            isWeintreff: product.categories.some(c => c.slug.includes('weintreff')),
        };
        return mappedEvent;
    } else {
        // --- МАППИНГ ВИНА (WINE) ---

        // Очистка описания от HTML тегов
        let cleanDescription = product.description ? product.description.replace(/<[^>]*>?/gm, '') : '';
        // Если есть заголовок "Weinbeschreibung:", берем текст после него
        if (cleanDescription.includes('Weinbeschreibung:')) {
            cleanDescription = cleanDescription.split('Weinbeschreibung:')[1].trim();
        }

        const cleanShortDescription = product.short_description ? product.short_description.replace(/<[^>]*>?/gm, '') : '';

        /**
         * Определение типа вина на основе категорий.
         */
        const determineType = (): Wine['type'] => {
            const cats = product.categories.map(c => c.slug.toLowerCase());
            if (cats.some(c => c.includes('rot'))) return 'Rotwein';
            if (cats.some(c => c.includes('weiss') || c.includes('weiß'))) return 'Weißwein';
            if (cats.some(c => c.includes('rose') || c.includes('rosé'))) return 'Roséwein';
            if (cats.some(c => c.includes('sekt'))) return 'Sekt';
            if (cats.some(c => c.includes('alkohol'))) return 'Alkoholfrei';
            return 'Rotwein'; // Тип по умолчанию
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
            /**
             * Логика извлечения объема (для расчета цены за литр).
             */
            weight: (() => {
                // 1. Прямые атрибуты объема
                const volumeAttr = getAttr('Inhalt') || getAttr('Flaschengröße') || getAttr('Volume');

                // 2. Поиск паттернов в атрибутах и названии (например, "0,75l")
                const textToSearch = `${volumeAttr} ${product.name}`.toLowerCase();
                const volMatch = textToSearch.match(/(\d+[.,]\d+)\s*l/i);
                if (volMatch) return volMatch[1].replace(',', '.');

                // Поиск миллилитров (например, "750ml")
                const mlMatch = textToSearch.match(/(\d+)\s*ml/i);
                if (mlMatch) return (parseInt(mlMatch[1]) / 1000).toString();

                // Эвристика для стандартных размеров
                if (textToSearch.includes('0,75')) return '0.75';
                if (textToSearch.includes('1,0') || textToSearch.includes('literwein')) return '1.0';
                if (textToSearch.includes('1,5') || textToSearch.includes('magnum')) return '1.5';
                if (textToSearch.includes('0,33')) return '0.33';
                if (textToSearch.includes('0,5')) return '0.5';

                // 3. Резервное использование веса, если он похож на объем
                const w = product.weight;
                if (w && parseFloat(w) < 2 && parseFloat(w) > 0.1) return w;

                return '0.75'; // Стандартная бутылка по умолчанию
            })(),
            /**
             * Определение уровня качества (Editions и т.д.).
             */
            quality_level: (() => {
                const attr = getAttr('Qualitätsstufe');
                if (attr && (attr.toLowerCase().includes('edition') || attr.toLowerCase().includes('liter'))) return attr;

                const searchableText = `${product.name} ${product.description || ''} ${product.short_description || ''} ${product.tags?.map(t => t.name).join(' ') || ''}`.toLowerCase();

                if (searchableText.includes('edition') && (searchableText.includes(' c') || searchableText.includes('>c<'))) return 'Edition >C<';
                if (searchableText.includes('edition') && (searchableText.includes(' p') || searchableText.includes('>p<'))) return 'Edition >P<';
                if (searchableText.includes('edition') && (searchableText.includes(' s') || searchableText.includes('>s<'))) return 'Edition >S<';
                if (searchableText.includes('literwein') || searchableText.includes('liter-wein') || searchableText.includes('1,0 l')) return 'Literweine';

                return attr || '';
            })(),
            /**
             * Определение вкуса/сладости.
             */
            flavor: (() => {
                const direct = getAttr('Geschmacksrichtung') || getAttr('Geschmack') || getAttr('Taste') || getAttr('Flavor');
                if (direct) return direct;

                const knownFlavors = ['trocken', 'feinherb', 'halbtrocken', 'fruchtig', 'lieblich', 'süß', 'suess', 'dry', 'off-dry', 'fruity', 'sweet'];

                // Проверка во всех атрибутах
                for (const attr of product.attributes || []) {
                    for (const opt of attr.options || []) {
                        const lowOpt = opt.toLowerCase();
                        if (knownFlavors.includes(lowOpt)) return opt;
                    }
                }

                // Проверка в тегах
                for (const tag of product.tags || []) {
                    const lowTag = tag.name.toLowerCase();
                    if (knownFlavors.includes(lowTag)) return tag.name;
                }

                return '';
            })(),
            soil: getAttr('Bodenart') || '',
            producer: getAttr('Erzeuger / Abfüller') || 'Fellbacher Weingärtner eG',
            temp: getAttr('Trinktemperatur') || ''
        };
        return mappedWine;
    }
}
