/**
 * Компонент для отображения описания и впечатлений от вина.
 * Содержит заголовок секции и текстовое описание.
 */
import React from 'react';

// Интерфейс для пропсов описания опыта дегустации
interface WineDetailExperienceProps {
    title: string;
    description: string;
}

// Компонент отвечает за отображение описания и впечатлений от вина
// Component responsible for displaying the description and wine experience
export const WineDetailExperience: React.FC<WineDetailExperienceProps> = ({ title, description }) => {
    return (
        <div className="prose dark:prose-invert max-w-none mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-bold dark:text-white mb-3 md:mb-4 serif">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
                {description}
            </p>
        </div>
    );
};
