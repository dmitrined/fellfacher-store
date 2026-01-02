/**
 * Назначение файла: Массив статических данных о мероприятиях.
 * Зависимости: Event interface, i18n t-function.
 * Используется: Как резервный источник или список для быстрой навигации.
 */

import { Event } from '@/lib/types/event';

/**
 * Возвращает список мероприятий с локализованными данными.
 */
export const getEvents = (t: (key: string) => string): Event[] => [
    
    {
        id: 'weinfeste',
        title: t("weinfeste_title"),
        date: t("weinfeste_calendar_note"),
        time: "Saisonale Termine",
        location: "Fellbacher Weingärtner eG",
        spots: "Verfügbar",
        price: t("weinfeste_entry_free"),
        category: "Festival",
        image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop",
        isWeinfeste: true
    },
    {
        id: 'weinproben',
        title: t("weinproben_title"),
        date: t("by_arrangement"),
        time: "2-3 Stunden",
        location: "Fellbacher Weingärtner eG",
        spots: "Verfügbar",
        price: t("weinproben_price_value"),
        category: t("category_wine_tasting"),
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
        isWeinproben: true
    },
    {
        id: 'afterwork',
        title: t("afterwork_title"),
        date: "1. Donnerstag/Monat",
        time: "19:00 - 21:00",
        location: "Vinothek",
        spots: "Offen",
        price: t("afterwork_price_full"),
        category: "Party",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
        isAfterwork: true
    },
];