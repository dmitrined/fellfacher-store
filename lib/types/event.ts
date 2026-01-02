/**
 * Назначение файла: Описание интерфейса Мероприятия (Event).
 * Зависимости: Нет.
 * Особенности: Используется для отображения дегустаций, праздников и других событий.
 */

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
    isAfterwork?: boolean;
    isWeinfeste?: boolean;
    isWeinproben?: boolean;
    isKellerblicke?: boolean;
    isWeintreff?: boolean;
    isWeinWeiter?: boolean;
    isWeinRaetselTour?: boolean;
}