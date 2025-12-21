import React from 'react';

// Интерфейс для пропсов заголовка детальной страницы вина
interface WineDetailHeaderProps {
    type: string;
    name: string;
    grapeVariety: string;
}

// Компонент отвечает за отображение основной информации: тип, название и сорт винограда
// Component responsible for displaying main info: type, name, and grape variety
export const WineDetailHeader: React.FC<WineDetailHeaderProps> = ({ type, name, grapeVariety }) => {
    return (
        <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-4 mb-4">
                <span className="bg-wine-gold/10 text-wine-gold px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">
                    {type}
                </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-3 md:mb-4 serif leading-tight">
                {name}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
                {grapeVariety}
            </p>
        </div>
    );
};
