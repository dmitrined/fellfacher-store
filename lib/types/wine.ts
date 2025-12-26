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
