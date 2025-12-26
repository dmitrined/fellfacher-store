"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { wines as mockWines } from '@/lib/data/wines';
import { Wine } from '@/lib/types';

/**
 * Контекст для управления списком вин (из API или моковых данных).
 * Это позволяет загружать данные один раз и использовать их на всех страницах.
 */
interface WinesContextType {
    wines: Wine[];
    isLoading: boolean;
    error: string | null;
    getWineById: (id: string) => Wine | undefined;
}

const WinesContext = createContext<WinesContextType | undefined>(undefined);

export function WinesProvider({ children }: { children: ReactNode }) {
    const [displayWines, setDisplayWines] = useState<Wine[]>(mockWines);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadWines() {
            try {
                setIsLoading(true);
                // Запрос к нашему API Route, который скрывает Consumer Secret
                const response = await fetch('/api/wines');

                if (response.ok) {
                    const data = await response.json();

                    // Если API вернуло реальные данные, заменяем ими моки
                    if (Array.isArray(data) && data.length > 0) {
                        setDisplayWines(data);
                    } else {
                        // Если API пустое (например, 403 ошибка у Ральфа), 
                        // мы молча остаемся на моковых данных, чтобы приложение работало.
                        console.log('API returned empty list, using mock data.');
                    }
                } else {
                    throw new Error('Server returned error');
                }
            } catch (err) {
                console.error('Error loading wines from API, using mock data:', err);
                setError('Failed to load real wines, using fallback.');
                // Оставляем mockWines (они уже в стейте по дефолту)
            } finally {
                setIsLoading(false);
            }
        }

        loadWines();
    }, []);

    const getWineById = (id: string) => {
        return displayWines.find(w => w.id === id);
    };

    return (
        <WinesContext.Provider value={{ wines: displayWines, isLoading, error, getWineById }}>
            {children}
        </WinesContext.Provider>
    );
}

export function useWines() {
    const context = useContext(WinesContext);
    if (context === undefined) {
        throw new Error('useWines must be used within a WinesProvider');
    }
    return context;
}
