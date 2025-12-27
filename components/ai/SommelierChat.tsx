/**
 * Назначение: Компонент ответа сомелье (загрузка и результат).
 * Зависимости: framer-motion, WineCard, Skeleton (кастомный или из HeroUI).
 * Особенности: Анимация "печатания" и отображение карточек.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import WineCard from '@/components/wine/WineCard';
import { Wine } from '@/lib/types/wine';

interface SommelierChatProps {
    isLoading: boolean;
    recommendedWines: Wine[];
}

export const SommelierChat: React.FC<SommelierChatProps> = ({ isLoading, recommendedWines }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-wine-gold/10 flex items-center justify-center shrink-0">
                        <span className="text-xl">🤖</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full max-w-[80%]">
                        <div className="p-4 rounded-2xl rounded-tl-none bg-zinc-100 dark:bg-zinc-800 animate-pulse">
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4"
            >
                <div className="w-10 h-10 rounded-full bg-wine-gold flex items-center justify-center shrink-0 shadow-lg shadow-wine-gold/30">
                    <span className="text-xl">🥂</span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="p-4 rounded-2xl rounded-tl-none bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed">
                            {t('ai_result_intro')}
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedWines.map((wine, index) => (
                    <motion.div
                        key={wine.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="h-[450px]"
                    >
                        <WineCard wine={wine} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
