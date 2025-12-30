/**
 * Назначение файла: Массив статических данных о мероприятиях.
 * Зависимости: Event interface, i18n t-function.
 * Используется: Как резервный источник или список для быстрой навигации.
 */

import { Event } from '@/lib/types';

/**
 * Возвращает список мероприятий с локализованными данными.
 */
export const getEvents = (t: (key: string) => string): Event[] => [
    {
        id: 'kellerblicke',
        title: t("event_kellerblicke"),
        date: t("kellerblicke_every_saturday"),
        time: t("by_arrangement"),
        location: "Fellbacher Weingärtner eG",
        spots: t("spots_available"),
        price: "12€",
        category: t("category_cellar_tour"),
        image: "https://fellbacher-weine.de/wp-content/uploads/2017/08/Kellerblicke-2-2.jpg",
        isKellerblicke: true
    },
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
        id: 'weintreff',
        title: t("weintreff_title"),
        date: "Donnerstags",
        time: "ab 17:00",
        location: "Vinothek",
        spots: "Offen",
        price: t("weintreff_entry_value"),
        category: "Meetup",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
        isWeintreff: true
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
    {
        id: 'weinweiter',
        title: t("weinweiter_title"),
        date: "Mo-Sa",
        time: "09:00 - 18:30",
        location: "Neue Kelter",
        spots: "Offen",
        price: "Variabel",
        category: "Open Bar",
        image: "https://fellbacher-weine.de/wp-content/uploads/2025/06/WeinWeiter_Instafeed1.jpg",
        isWeinWeiter: true
    },
    {
        id: 'weinraetseltour',
        title: t("weinraetsel_title"),
        date: "Mo-Sa",
        time: "ab 09:00",
        location: "Weinberg",
        spots: "Anfrage",
        price: "ab 119€",
        category: "Tour",
        image: "https://fellbacher-weine.de/wp-content/uploads/2025/08/DSC_0091-683x1024.jpg",
        isWeinRaetselTour: true
    },
];
