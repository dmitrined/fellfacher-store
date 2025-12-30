/**
 * Назначение файла: Описание интерфейса Вина (Wine).
 * Зависимости: Нет.
 * Особенности: Используется для унификации данных из WooCommerce по всему приложению.
 */

export interface Wine {
    id: string; // Внутренний ID (строка для консистентности)
    name: string;
    slug: string; // URL-путь из WooCommerce
    price: number;
    regular_price: number;
    description: string;
    short_description: string;
    stock_status: 'instock' | 'outofstock';

    // Массивы данных из WooCommerce
    images: { src: string; alt?: string }[];
    categories: { id: number; name: string; slug: string }[];
    tags?: { id: number; name: string; slug: string }[];
    attributes: { name: string; options: string[] }[];

    // Дополнительные поля для детального отображения
    sku?: string;
    weight?: string; // Используется для расчета цены за литр
    stock_quantity?: number | null;
    tax_status?: string;
    tax_class?: string;

    // Вычисляемые/Маппированные поля
    image: string; // Основное изображение
    year: number; // Год урожая
    type: 'Rotwein' | 'Weißwein' | 'Roséwein' | 'Sekt' | 'Alkoholfrei' | 'Paket' | 'Sonstiges'; // Тип вина
    grapeVariety: string; // Сорт винограда
    alcohol?: string;
    acidity?: string;
    sugar?: string;
    location?: string; // Место произрастания
    quality_level?: string; // Уровень качества
    flavor?: string; // Вкус (трокен и т.д.)
    soil?: string; // Почва
    producer?: string; // Производитель
    temp?: string; // Температура подачи
}
