/**
 * Назначение файла: Технические характеристики вина (Wine Tech Stats).
 * Зависимости: React, Lucide React (Percent, Droplets, FlaskConical), типы Wine.
 * Особенности: Отображение уровня алкоголя, кислотности и сахара в виде карточек.
 */

import React from 'react';
import { Wine } from '@/lib/types/wine';
import { Percent, Droplets, FlaskConical } from 'lucide-react';

interface WineDetailStatsProps {
    wine: Wine;
    t: (key: string) => string;
}

/**
 * Блок с основными характеристиками вина (алкоголь, сахар, кислотность).
 */
export const WineDetailStats: React.FC<WineDetailStatsProps> = ({ wine, t }) => {
    // Поиск атрибутов: Алкоголь, Сахар, Кислотность
    const alcohol = wine.attributes.find(a => a.name.toLowerCase().includes('alkohol'))?.options[0];
    const sugar = wine.attributes.find(a => a.name.toLowerCase().includes('restzucker'))?.options[0];
    const acid = wine.attributes.find(a => a.name.toLowerCase().includes('säure'))?.options[0];

    // Если данных нет, компонент не отображается
    if (!alcohol && !sugar && !acid) return null;

    const stats = [
        {
            label: t('product_characteristic_alcohol'),
            value: alcohol,
            icon: <Percent className="w-4 h-4 text-wine-gold" />,
            suffix: ' % vol.'
        },
        {
            label: t('product_characteristic_sugar'),
            value: sugar,
            icon: <FlaskConical className="w-4 h-4 text-wine-gold" />,
            suffix: ' g/l'
        },
        {
            label: t('product_characteristic_acid'),
            value: acid,
            icon: <Droplets className="w-4 h-4 text-wine-gold" />,
            suffix: ' g/l'
        }
    ].filter(s => s.value);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-12">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800"
                >
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm">
                        {stat.icon}
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
                            {stat.label}
                        </span>
                        <span className="text-sm font-bold text-wine-dark dark:text-white">
                            {stat.value}{stat.suffix}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
