"use client";
/**
 * Система международной локализации (i18n).
 * Содержит словари переводов для немецкого и английского языков и функцию для их получения.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Доступные языки в приложении
type Language = 'de' | 'en';

// Структура объекта переводов
interface Translations {
    [key: string]: {
        de: string;
        en: string;
    };
}

// Словарь строк для всех разделов интерфейса
const translations: Translations = {
    // Header & Nav (Навигация и верхняя панель)
    nav_catalog: { de: "Katalog", en: "Catalog" },
    nav_red_wines: { de: "Rotweine", en: "Red Wines" },
    nav_white_wines: { de: "Weißweine", en: "White Wines" },
    nav_shop: { de: "Shop", en: "Shop" },
    nav_our_vineyards: { de: "Unsere Weinberge", en: "Our Vineyards" },
    nav_contact: { de: "Kontakt", en: "Contact" },
    nav_events: { de: "Events", en: "Events" },
    nav_about_us: { de: "Über uns", en: "About Us" },
    about_we_about_us: { de: "Wir über uns", en: "Who We Are" },
    about_team: { de: "Unser Team", en: "Our Team" },
    about_impressions: { de: "Impressionen", en: "Impressions" },
    about_next_generation: { de: "next Generation", en: "Next Generation" },
    about_awards: { de: "Ausgezeichnet", en: "Awards" },
    about_worth_reading: { de: "Lesenswert", en: "Worth Reading" },
    about_partners: { de: "Unsere Partner", en: "Our Partners" },
    about_business_vfb: { de: "Businesspartner VfB Stuttgart", en: "Business Partner VfB Stuttgart" },
    contact_info_hours: { de: "Kontakte & Öffnungszeiten", en: "Contacts & Opening Hours" },
    contact_directions: { de: "Anfahrt", en: "Directions" },
    contact_jobs: { de: "Jobs", en: "Jobs" },
    nav_all_wines: { de: "Alle Weine", en: "All Wines" },
    nav_loyalty: { de: "Loyalität", en: "Loyalty" },
    nav_profile: { de: "Profil", en: "Profile" },
    nav_dashboard: { de: "Dashboard", en: "Dashboard" },
    nav_logout: { de: "Abmelden", en: "Logout" },
    promo_shipping: { de: "Premium Versand in ganz Europa", en: "Premium Shipping across Europe" },
    search_placeholder: { de: "FINDE DEINEN WEIN...", en: "FIND A BOTTLE..." },
    search_input_placeholder: { de: "Suche nach Name...", en: "Search by name..." },
    collections: { de: "Kollektionen", en: "Collections" },
    support_info: { de: "Support & Info", en: "Support & Info" },
    shipping_info: { de: "Versandinformationen", en: "Shipping Information" },
    gift_cards: { de: "Geschenkkarten", en: "Gift Cards" },
    find_us: { de: "Finde uns", en: "Find Us" },

    // Home Page (Главная страница)
    hero_title_1: { de: "Tradition", en: "Tradition" },
    hero_title_2: { de: "Neu definiert.", en: "Redefined." },
    hero_subtitle: { de: "Erleben Sie die Exzellenz der Fellbacher Weingärtner. Eine kuratierte Kollektion preisgekrönter Weine, geliefert mit Leidenschaft und Präzision.", en: "Experience the excellence of Fellbacher Weingärtner. A curated collection of award-winning wines, delivered with passion and precision." },
    hero_cta: { de: "Kollektion Entdecken", en: "Explore Collection" },
    hero_secondary_cta: { de: "Über Uns", en: "About Us" },

    // Cart (Корзина)
    cart_title: { de: "Warenkorb", en: "Shopping Cart" },
    cart_empty: { de: "Ihr Warenkorb ist leer", en: "Your cart is empty" },
    cart_total: { de: "Gesamt", en: "Total" },
    cart_checkout: { de: "Zur Kasse", en: "Checkout" },
    add_to_cart: { de: "In den Warenkorb", en: "Add to Cart" },
    added_to_cart: { de: "Hinzugefügt", en: "Added" },
    featured_title: { de: "Exklusive Auswahl", en: "Featured Selection" },
    featured_subtitle: { de: "Die Wahl unserer Sommeliers für diese Saison. Handverlesen, hoch bewertet und außergewöhnlich verarbeitet.", en: "Our sommelier's choice for this season. Hand-picked, highly rated, and exceptionally crafted." },
    view_all: { de: "Alle Weine anzeigen", en: "View All Wines" },
    feature_quality_title: { de: "Premium Qualität", en: "Premium Quality" },
    feature_quality_desc: { de: "Preisgekrönte Weine mit einer Durchschnittsbewertung von 4,5+ Sternen.", en: "Award-winning wines with an average rating of 4.5+ stars." },
    feature_curation_title: { de: "Experten-Kuration", en: "Expert Curation" },
    feature_curation_desc: { de: "Jede Flasche wird von unseren Kellermeistern auf Echtheit geprüft.", en: "Every bottle is verified by our master cellarmen for authenticity." },
    feature_delivery_title: { de: "Schnelle Lieferung", en: "Fast Delivery" },
    feature_delivery_desc: { de: "Sichere Verpackung und schneller Transport in ganz Europa.", en: "Secure packaging and rapid transit across Europe." },
    type_red: { de: "Edle Rotweine", en: "Fine Red Wines" },
    type_white: { de: "Frische Weißweine", en: "Crisp White Wines" },
    type_rose: { de: "Fruchtige Roséweine", en: "Fruity Rosé Wines" },
    type_sparkling: { de: "Prickelnder Sekt", en: "Sparkling Sekt" },
    type_alcohol_free: { de: "Alkoholfreier Genuss", en: "Alcohol-Free Pleasure" },

    // Catalog Page (Каталог)
    catalog_title: { de: "Der Katalog", en: "The Catalog" },
    catalog_subtitle: { de: "Entdecken Sie unsere kuratierte Auswahl an Fellbacher Weinen. Von kräftigen Rotweinen bis hin zu spritzigen Weißweinen.", en: "Explore our curated selection of Fellbacher wines. From bold reds to crisp whites, find the perfect bottle for every occasion." },
    sort_price_low: { de: "Preis: Günstig zuerst", en: "Price: Low-High" },
    sort_price_high: { de: "Preis: Teuer zuerst", en: "Price: High-Low" },
    sort_newest: { de: "Neueste zuerst", en: "Newest First" },
    showing_wines: { de: "Ergebnisse: {count}", en: "Results: {count}" },
    no_wines_found: { de: "Keine Weine gefunden", en: "No wines found" },
    adjust_filters: { de: "Versuchen Sie, Ihre Filter или Suchbegriffe anzupassen.", en: "Try adjusting your filters or search terms." },
    clear_filters: { de: "Alle Filter löschen", en: "Clear all filters" },

    // Detail Page (Детали вина)
    back_to_collection: { de: "Zurück zur Kollektion", en: "Back to collection" },
    experience_title: { de: "Das Erlebnis", en: "The Experience" },
    experience_desc: { de: "Dieser außergewöhnliche Jahrgang der Fellbacher Weingärtner repräsentiert den Gipfel unserer Handwerkskunst. Erwarten Sie ein ausgewogenes Profil, das das Terroir der Region Goldberg ehrt.", en: "This exceptional vintage from Fellbacher Weingärtner represents the pinnacle of our craftsmanship. Expect a balanced profile that honors the terroir of the Goldberg region." },
    stats_alcohol: { de: "Alkohol", en: "Alcohol" },
    stats_acidity: { de: "Säure", en: "Acidity" },
    stats_sugar: { de: "Zucker", en: "Sugar" },
    premium_price: { de: "Premium Preis", en: "Premium Price" },
    quality_guarantee: { de: "AUTHENTISCHE FELLBACHER QUALITÄT GARANTIERT", en: "AUTHENTIC FELLBACHER QUALITY GUARANTEED" },

    // Auth (Авторизация)
    login_title: { de: "Willkommen zurück", en: "Welcome Back" },
    login_subtitle: { de: "Melden Sie sich an, um auf Ihr Konto zuzugreifen", en: "Sign in to access your account" },
    register_title: { de: "Konto erstellen", en: "Create Account" },
    register_subtitle: { de: "Werden Sie Teil unserer Wein-Community", en: "Join our wine community" },
    auth_email_placeholder: { de: "E-Mail-Adresse", en: "Email Address" },
    auth_password_placeholder: { de: "Passwort", en: "Password" },
    auth_confirm_password_placeholder: { de: "Passwort подтвердить", en: "Confirm Password" },
    auth_name_placeholder: { de: "Vollständiger Name", en: "Full Name" },
    login_button: { de: "Anmelden", en: "Sign In" },
    register_button: { de: "Registrieren", en: "Register" },
    auth_toggle_register: { de: "Noch kein Konto? Registrieren", en: "Don't have an account? Register" },
    auth_toggle_login: { de: "Bereits ein Konto? Anmelden", en: "Already have an account? Login" },
    password_strength: { de: "Passwortstärke", en: "Password Strength" },
    strength_weak: { de: "Schwach", en: "Weak" },
    strength_medium: { de: "Mittel", en: "Medium" },
    strength_strong: { de: "Stark", en: "Strong" },
    social_login_with: { de: "Oder weiter mit", en: "Or continue with" },
    passwords_not_matching: { de: "Passwörter stimmen nicht überein", en: "Passwords do not match" },

    // Dashboard (Личный кабинет)
    dashboard_title: { de: "Mein Konto", en: "My Account" },
    dashboard_welcome: { de: "Willkommen zurück", en: "Welcome back" },
    tab_orders: { de: "Bestellungen", en: "Orders" },
    tab_wishlist: { de: "Wunschliste", en: "Wishlist" },
    tab_profile: { de: "Profil", en: "Profile" },
    tab_cart: { de: "Warenkorb", en: "Cart" },
    no_orders: { de: "Keine Bestellungen gefunden", en: "No orders found" },
    order_id: { de: "Bestellung", en: "Order" },
    order_date: { de: "Datum", en: "Date" },
    order_total: { de: "Gesamt", en: "Total" },
    order_status: { de: "Status", en: "Status" },
    view_details: { de: "Details anzeigen", en: "View Details" },
    logout_confirm: { de: "Möchten Sie sich wirklich abmelden?", en: "Are you sure you want to logout?" },

    // Footer (Подвал)
    footer_shop: { de: "Shop", en: "Shop" },
    footer_help: { de: "Hilfe", en: "Help" },
    footer_company: { de: "Unternehmen", en: "Company" },
    footer_all_wines: { de: "Alle Weine", en: "All Wines" },
    footer_new_arrivals: { de: "Neuheiten", en: "New Arrivals" },
    footer_bestsellers: { de: "Bestseller", en: "Bestsellers" },
    footer_contact_us: { de: "Kontaktieren Sie uns", en: "Contact Us" },
    footer_shipping: { de: "Versand", en: "Shipping" },
    footer_returns: { de: "Rückgabe", en: "Returns" },
    footer_about_us: { de: "Über uns", en: "About Us" },
    footer_careers: { de: "Karriere", en: "Careers" },
    footer_privacy: { de: "Datenschutz", en: "Privacy Policy" },
    footer_desc: { de: "Ihr traditionsreiches Weingut aus Fellbach.", en: "Your tradition-rich winery from Fellbach." },
    footer_contact_title: { de: "KONTAKT", en: "CONTACT" },
    footer_address: { de: "Kappelbergstraße 48 – 70734 Fellbach", en: "Kappelbergstraße 48 – 70734 Fellbach" },
    footer_phone_label: { de: "Fon", en: "Phone" },
    footer_fax_label: { de: "Fax", en: "Fax" },
    footer_phone_value: { de: "0711 57 88 03-0", en: "+49 711 57 88 03-0" },
    footer_fax_value: { de: "0711 57 88 03 -40", en: "+49 711 57 88 03 -40" },
    footer_email: { de: "info@fellbacher-weine.de", en: "info@fellbacher-weine.de" },
    footer_directions: { de: "Zur ausführlichen Anfahrtsbeschreibung", en: "Get detailed directions" },
    footer_opening_hours_title: { de: "ÖFFNUNGSZEITEN", en: "OPENING HOURS" },
    footer_sales_tasting_label: { de: "Verkauf & Verkostung", en: "Wine Shop & Tasting" },
    footer_sales_tasting_hours: { de: "Mo – Sa 9.00 Uhr – 18.30 Uhr", en: "Mon – Sat 9:00 AM – 6:30 PM" },
    footer_office_label: { de: "Bürozeiten", en: "Office Hours" },
    footer_office_hours: { de: "Mo – Fr 8.00 Uhr – 17.00 Uhr", en: "Mon – Fri 8:00 AM – 5:00 PM" },

    // Loyalty System (Программа лояльности)
    loyalty_title: { de: "Genuss-Punkte Programm", en: "Rewards & Loyalty" },
    loyalty_subtitle: { de: "Sammeln Sie Punkte bei jedem Einkauf und sichern Sie sich exklusive Prämien.", en: "Collect points with every purchase and secure exclusive rewards." },
    loyalty_points_balance: { de: "Ihr Punktestand", en: "Your Points Balance" },
    loyalty_scan_qr: { de: "QR-Code scannen", en: "Scan QR Code" },
    loyalty_rewards: { de: "Verfügbare Prämien", en: "Available Rewards" },
    loyalty_tier_silver: { de: "Silber-Status", en: "Silver Status" },
    loyalty_tier_gold: { de: "Gold-Status", en: "Gold Status" },

    // Events Page (События)
    events_title: { de: "Veranstaltungen & Termine", en: "Events & Appointments" },
    events_subtitle: { de: "Erleben Sie die Welt der Fellbacher Weine hautnah.", en: "Experience the world of Fellbacher wines up close." },
    discover_and_experience: { de: "Entdecken & Erleben", en: "Discover & Experience" },
    events_register: { de: "Jetzt anmelden", en: "Register Now" },
    events_date: { de: "Datum", en: "Date" },
    events_location: { de: "Ort", en: "Location" },
    event_kellerblicke: { de: "Kellerblicke", en: "Cellar Views" },
    event_weinfeste: { de: "Weinfeste", en: "Wine Festivals" },
    event_weinproben: { de: "Weinproben", en: "Wine Tastings" },
    event_weintreff: { de: "Weintreff", en: "Wine Meetup" },
    event_afterwork: { de: "Afterwork", en: "Afterwork" },
    event_wein_weiter: { de: "Wein & Weiter", en: "Wine & More" },
    event_wein_raetsel_tour: { de: "Wein(Rätsel)Tour", en: "Wine Mystery Tour" },

    // Booking Flow (Бронирование)
    booking_title: { de: "Degustation buchen", en: "Book a Tasting" },
    booking_step_1: { de: "Termin wählen", en: "Select Date" },
    booking_step_2: { de: "Personenanzahl", en: "Number of People" },
    booking_step_3: { de: "Bestätigung", en: "Confirmation" },
    booking_confirm: { de: "Buchung abschließen", en: "Complete Booking" },

    // Wine Types & UI (Типы вин и интерфейс)
    wine_type_rose: { de: "Roséweine", en: "Rosé Wines" },
    wine_type_sparkling: { de: "Schaumweine", en: "Sparkling Wines" },
    wine_type_alcohol_free: { de: "Alkoholfreie Weine", en: "Alcohol Free Wines" },
    wine_type_all: { de: "Alle", en: "All" },
    image_not_available: { de: "Bild nicht verfügbar", en: "Image not available" },

    // Exclusive Selection (Эксклюзивная подборка)
    exclusive_selection_title: { de: "Exklusive Auswahl", en: "Exclusive Selection" },
    exclusive_selection_subtitle: { de: "Die Wahl unserer Sommeliers für diese Saison.", en: "Our sommelier's choice for this season." },
    exclusive_selection_desc: { de: "Handverlesen, hoch bewertet und außergewöhnlich verarbeitet.", en: "Hand-picked, highly-rated and exceptionally crafted." },
    view_collection: { de: "Kollektion ansehen", en: "View Collection" },

    // CTA & Labels (Кнопки и метки)
    more_info: { de: "Mehr erfahren", en: "Learn More" },
    all_appointments: { de: "Alle Termine", en: "All Appointments" },
    premium_event: { de: "Premium Event", en: "Premium Event" },
    fully_booked: { de: "Ausgebucht", en: "Fully Booked" },
    private_events_title: { de: "Private Veranstaltungen?", en: "Private Events?" },
    private_events_desc: { de: "Planen Sie eine Hochzeit, einen Geburtstag или ein Firmenevent? Nutzen Sie unsere exklusiven Räumlichkeiten und lassen Sie sich von uns beraten.", en: "Planning a wedding, birthday or corporate event? Use our exclusive premises and let us advise you." },
    request_quote: { de: "Unverbindlich anfragen", en: "Request a Quote" },
    events_per_year: { de: "Events / Jahr", en: "Events / Year" },
    passion: { de: "Leidenschaft", en: "Passion" },

    // Dashboard & Loyalty Extended
    status_delivered: { de: "Geliefert", en: "Delivered" },
    status_processing: { de: "In Bearbeitung", en: "Processing" },
    status_in_transit: { de: "Versandt", en: "In Transit" },
    recent_activities: { de: "Letzte Aktivitäten", en: "Recent Activities" },
    view_all_short: { de: "Alle anzeigen", en: "View All" },
    pts_until_goal: { de: "{points} PTS bis zum Ziel", en: "{points} PTS until goal" },
    status_benefits: { de: "Status-Vorteile", en: "Status Benefits" },
    program_details: { de: "Programmdetails", en: "Program Details" },
    ready_to_scan: { de: "Bereit zum Scannen", en: "Ready to Scan" },
    loyalty_scan_desc: { de: "Scannen Sie den Code im Laden, um Punkte zu sammeln.", en: "Scan the code in store to collect points." },
    redeem_points: { de: "Einlösen", en: "Redeem" },
    syncing: { de: "Synchronisierung...", en: "Syncing..." },
    loading_real_data: { de: "Synchronisierung mit Katalog...", en: "Syncing with catalog..." },
    api_error_fallback: { de: "Fehler beim Laden der API, verwende Fallback-Daten.", en: "Error loading API, using fallback data." },
    api_empty_fallback: { de: "API ist leer oder blockiert (Fallback-Daten werden verwendet).", en: "API is empty or blocked (using fallback data)." },
};

// Типизация контекста локализации
interface LanguageContextType {
    language: Language; // Текущий язык
    setLanguage: (lang: Language) => void; // Функция смены языка
    t: (key: string, params?: { [key: string]: any }) => string; // Функция получения перевода по ключу
}

// Создание контекста с неопределенным начальным значением
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Провайдер управления языком
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние текущего языка (по умолчанию немецкий)
    const [language, setLanguage] = useState<Language>('de');

    // Восстановление выбранного языка из localStorage при загрузке
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'de' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    /**
     * Обработчик смены языка. Сохраняет выбор в хранилище и обновляет атрибут HTML.
     */
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang; // Помогает SEO и экранным дикторам
    };

    /**
     * Функция перевода (Translation Function).
     * Поддерживает подстановку динамических параметров, например: {points}.
     */
    const t = (key: string, params?: { [key: string]: any }) => {
        const translation = translations[key];
        // Если ключ не найден, возвращаем сам ключ (помогает в отладке)
        if (!translation) return key;

        let text = translation[language];

        // Замена параметров в строке, если они переданы
        if (params) {
            Object.entries(params).forEach(([paramKey, value]) => {
                text = text.replace(`{${paramKey}}`, value.toString());
            });
        }
        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Кастомный хук для использования переводов в компонентах
export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
