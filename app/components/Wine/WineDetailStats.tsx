/**
 * Компонент для отображения технических характеристик вина.
 * Показывает уровень алкоголя, кислотность и содержание сахара в виде сетки.
 */
import React from 'react';

// Интерфейс для пропсов статистики вина (принимает уже переведенные значения или функцию t)
// Здесь мы принимаем готовые строки для гибкости, но можно передавать и ключи
interface WineDetailStatsProps {
    alcoholLabel: string;
    acidityLabel: string;
    sugarLabel: string;
}

// Компонент отвечает за технические характеристики вина (алкоголь, кислотность, сахар)
// Component responsible for wine technical stats (alcohol, acidity, sugar)
export const WineDetailStats: React.FC<WineDetailStatsProps> = ({ alcoholLabel, acidityLabel, sugarLabel }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">{alcoholLabel}</span>
                <span className="text-lg md:text-xl font-bold dark:text-white">12.5%</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">{acidityLabel}</span>
                <span className="text-lg md:text-xl font-bold dark:text-white">5.8 g/l</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">{sugarLabel}</span>
                <span className="text-lg md:text-xl font-bold dark:text-white">4.2 g/l</span>
            </div>
        </div>
    );
};
