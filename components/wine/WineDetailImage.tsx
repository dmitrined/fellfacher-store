/**
 * Компонент для отображения изображения вина.
 * Включает год урожая в углу и эффект приближения при наведении.
 */
import React from 'react';

// Интерфейс для пропсов компонента отображения изображения вина
interface WineDetailImageProps {
    image: string;
    name: string;
    year: number;
}

// Компонент отвечает за визуализацию изображения вина и года урожая
// Component responsible for visualizing the wine image and vintage year
export const WineDetailImage: React.FC<WineDetailImageProps> = ({ image, name, year }) => {
    return (
        <div className="relative aspect-[4/5] md:aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden flex items-center justify-center p-8 md:p-12 group">
            <img
                src={image}
                alt={name}
                className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-700"
            />
        </div>
    );
};
