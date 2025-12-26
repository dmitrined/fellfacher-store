export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    spots: string;
    price: string;
    category: string;
    image: string;
    isKellerblicke?: boolean;
    isWeintreff?: boolean;
    isAfterwork?: boolean;
    isWeinfeste?: boolean;
    isWeinproben?: boolean;
    isWeinWeiter?: boolean;
    isWeinRaetselTour?: boolean;
}
