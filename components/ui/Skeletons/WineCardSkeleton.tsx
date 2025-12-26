/**
 * Назначение файла: Скелетон для карточки вина.
 * Зависимости: HeroUI (Skeleton).
 * Особенности: Client Component, повторяет структуру WineCard.
 */

"use client";

import React from "react";
import { Card, Skeleton } from "@heroui/react";

const WineCardSkeleton = () => {
    return (
        <Card className="group relative bg-white dark:bg-zinc-900 overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col h-full p-0 shadow-none" radius="none">
            {/* Image Section Skeleton */}
            <div className="relative h-64 w-full bg-zinc-50 dark:bg-zinc-800 p-4 flex items-center justify-center">
                <Skeleton className="rounded-3xl h-full w-full" />

                {/* Year Badge Skeleton */}
                <div className="absolute top-4 left-4">
                    <Skeleton className="w-12 h-6 rounded" />
                </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="p-5 flex flex-col flex-grow space-y-4">
                <div className="flex-grow space-y-2">
                    {/* Grape Variety */}
                    <Skeleton className="w-2/3 h-3 rounded-full" />
                    {/* Wine Name */}
                    <Skeleton className="w-full h-6 rounded-lg" />
                    <Skeleton className="w-3/4 h-6 rounded-lg" />
                    {/* Wine Type */}
                    <Skeleton className="w-20 h-5 rounded-full mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex flex-col">
                        {/* Price */}
                        <Skeleton className="w-16 h-8 rounded-lg" />
                    </div>

                    {/* Action Button */}
                    <Skeleton className="w-12 h-12 rounded-full" />
                </div>
            </div>
        </Card>
    );
};

export default WineCardSkeleton;
