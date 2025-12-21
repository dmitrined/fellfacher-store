/**
 * Моковые данные для каталога вин.
 * Содержит информацию о названии, годе, типе, цене и характеристиках каждой позиции.
 */
export interface Wine {
    id: string;
    name: string;
    year: number;
    type: 'Rotwein' | 'Weißwein' | 'Roséwein' | 'Sekt' | 'Alkoholfrei';
    grapeVariety: string;
    price: number;
    image: string;
    description: string;
    alcohol: string;
    acidity: string;
    sugar: string;
}

export const wines: Wine[] = [
    {
        id: '1',
        name: 'Lämmler Merlot P',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Merlot',
        price: 15.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/105_Merlot_Laemmler_trocken_P.png',
        description: 'Wunderbar aromatisch! Duft nach Zwetschgen, dunklen Kirschen und reifen Brombeeren, untermalt von etwas Vanille und feinen Röstaromen, dazu körperreich und perfekt ausbalancierte Tannine.',
        alcohol: '13.5%',
        acidity: '4.9 g/l',
        sugar: '1.5 g/l'
    },
    {
        id: '1.1',
        name: 'Lämmler Merlot P',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Merlot',
        price: 15.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/105_Merlot_Laemmler_trocken_P.png',
        description: 'Wunderbar aromatisch! Duft nach Zwetschgen, dunklen Kirschen und reifen Brombeeren, untermalt von etwas Vanille und feinen Röstaromen, dazu körperreich und perfekt ausbalancierte Tannine.',
        alcohol: '13.5%',
        acidity: '4.9 g/l',
        sugar: '1.5 g/l'
    },
    {
        id: '1.2',
        name: 'Lämmler Merlot P',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Merlot',
        price: 15.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/105_Merlot_Laemmler_trocken_P.png',
        description: 'Wunderbar aromatisch! Duft nach Zwetschgen, dunklen Kirschen und reifen Brombeeren, untermalt von etwas Vanille und feinen Röstaromen, dazu körperreich und perfekt ausbalancierte Tannine.',
        alcohol: '13.5%',
        acidity: '4.9 g/l',
        sugar: '1.5 g/l'
    },
    {
        id: '1.3',
        name: 'Lämmler Merlot P',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Merlot',
        price: 15.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/105_Merlot_Laemmler_trocken_P.png',
        description: 'Wunderbar aromatisch! Duft nach Zwetschgen, dunklen Kirschen und reifen Brombeeren, untermalt von etwas Vanille und feinen Röstaromen, dazu körperreich und perfekt ausbalancierte Tannine.',
        alcohol: '13.5%',
        acidity: '4.9 g/l',
        sugar: '1.5 g/l'
    },
    {
        id: '1.4',
        name: 'Lämmler Merlot P',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Merlot',
        price: 15.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/105_Merlot_Laemmler_trocken_P.png',
        description: 'Wunderbar aromatisch! Duft nach Zwetschgen, dunklen Kirschen und reifen Brombeeren, untermalt von etwas Vanille und feinen Röstaromen, dazu körperreich und perfekt ausbalancierte Tannine.',
        alcohol: '13.5%',
        acidity: '4.9 g/l',
        sugar: '1.5 g/l'
    },
    {
        id: '2',
        name: 'SAUVIGNON BLANC',
        year: 2023,
        type: 'Weißwein',
        grapeVariety: 'Sauvignon Blanc',
        price: 23.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/19-1-1024x1536.jpg',
        description: 'Frischer Sauvignon Blanc mit Noten von Stachelbeere und exotischen Früchten.',
        alcohol: '12.5%',
        acidity: '6.8 g/l',
        sugar: '4.5 g/l'
    },
    {
        id: '3',
        name: 'Lemberger Lemmler P',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Lemberger',
        price: 23.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/114_Lemberger_Laemmler_feinherb_P-1024x1536.png',
        description: 'Typischer Lemberger mit Struktur und feiner Würze.',
        alcohol: '13.5%',
        acidity: '5.4 g/l',
        sugar: '1.8 g/l'
    },
    {
        id: '4',
        name: 'Pinot Gris',
        year: 2023,
        type: 'Weißwein',
        grapeVariety: 'Pinot Gris',
        price: 21.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/067_Pinot_Gris_trocken_C-1.png',
        description: 'Eleganter Weißburgunder mit feiner Frucht und milder Säure.',
        alcohol: '13.0%',
        acidity: '6.2 g/l',
        sugar: '5.2 g/l'
    },
    {
        id: '5',
        name: 'Goldberg Riesling C',
        year: 2023,
        type: 'Weißwein',
        grapeVariety: 'Riesling',
        price: 18.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/060_Goldberg_Riesling_C_Kabinett-480x698.png',
        description: 'Klassischer Riesling mit lebendiger Säure und Pfirsicharomen.',
        alcohol: '12.0%',
        acidity: '7.5 g/l',
        sugar: '6.5 g/l'
    },
    {
        id: '6',
        name: 'Rosé trocken P',
        year: 2023,
        type: 'Roséwein',
        grapeVariety: 'Cuvée',
        price: 12.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/052_Rose_trocken_P-1024x1536.png',
        description: 'Ein frischer und fruchtiger Rosé für warme Sommertage.',
        alcohol: '12.0%',
        acidity: '6.0 g/l',
        sugar: '5.0 g/l'
    },
    {
        id: '7',
        name: 'Sekt Cuvée Brut',
        year: 2021,
        type: 'Sekt',
        grapeVariety: 'Chardonnay & Pinot Noir',
        price: 19.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/323_Sekt_Laemmler_Riesling_brut_P-1024x1536.png',
        description: 'Feinperlig und elegant mit Brioche-Noten.',
        alcohol: '12.5%',
        acidity: '7.0 g/l',
        sugar: '8.0 g/l'
    },
    {
        id: '8',
        name: 'Alkoholfrei Weiß',
        year: 2023,
        type: 'Alkoholfrei',
        grapeVariety: 'Müller-Thurgau',
        price: 9.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/82_Alkoholfrei_Weiss_t-1024x1536.jpg',
        description: 'Voller Geschmack ganz ohne Alkohol.',
        alcohol: '0.0%',
        acidity: '6.5 g/l',
        sugar: '45.0 g/l'
    },
    {
        id: '9',
        name: 'Trollinger mit Lemberger',
        year: 2022,
        type: 'Rotwein',
        grapeVariety: 'Trollinger, Lemberger',
        price: 8.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/042_Trollinger_Lemberger_feinherb_C-1024x1536.png',
        description: 'Der Klassiker aus Württemberg - süffig und ehrlich.',
        alcohol: '12.0%',
        acidity: '5.0 g/l',
        sugar: '4.0 g/l'
    },
    {
        id: '10',
        name: 'Grauburgunder S',
        year: 2023,
        type: 'Weißwein',
        grapeVariety: 'Grauburgunder',
        price: 14.90,
        image: 'https://fellbacher-weine.de/wp-content/uploads/2015/12/067_Pinot_Gris_trocken_C-1.png',
        description: 'Kräftiger Grauburgunder mit Schmelz.',
        alcohol: '13.5%',
        acidity: '5.8 g/l',
        sugar: '3.0 g/l'
    }
];
