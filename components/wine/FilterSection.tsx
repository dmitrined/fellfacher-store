/**
 * Назначение: Переиспользуемая секция фильтра с возможностью сворачивания.
 * Зависимости: framer-motion, Lucide React.
 * Особенности: Анимированное сворачивание, сохранение состояния, иконки.
 */

"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterSectionProps {
    title: string;
    icon?: React.ReactNode;
    count?: number;
    defaultExpanded?: boolean;
    children: React.ReactNode;
}

export function FilterSection({
    title,
    icon,
    count,
    defaultExpanded = true,
    children
}: FilterSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between py-4 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-lg transition-colors group"
            >
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    {icon && (
                        <div className="text-wine-gold group-hover:scale-110 transition-transform">
                            {icon}
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-sm font-bold text-wine-dark dark:text-white uppercase tracking-wider">
                        {title}
                    </h3>

                    {/* Count Badge */}
                    {count !== undefined && count > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-wine-gold/10 text-wine-gold">
                            {count}
                        </span>
                    )}
                </div>

                {/* Chevron */}
                <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 px-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
