/**
 * Назначение: Глобальное состояние интерфейса (UI State).
 * Зависимости: Zustand.
 * Особенности:
 * - Управляет видимостью мобильного меню, модальных окон и других UI-элементов.
 * - Не требует персистентности (сбрасывается при перезагрузке).
 */

import { create } from 'zustand';

// Интерфейс состояния UI
interface UIState {
    isMobileMenuOpen: boolean; // Открыто ли мобильное меню
    setMobileMenuOpen: (isOpen: boolean) => void; // Установить состояние меню
    toggleMobileMenu: () => void; // Переключить состояние меню

    isFilterOpen: boolean; // Открыта ли панель фильтров (Mobile)
    setFilterOpen: (isOpen: boolean) => void;
    toggleFilter: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isFilterOpen: false,

    // Установка конкретного значения (открыть/закрыть)
    setMobileMenuOpen: (isOpen: boolean) => set({ isMobileMenuOpen: isOpen }),
    setFilterOpen: (isOpen: boolean) => set({ isFilterOpen: isOpen }),

    // Переключение значения на противоположное
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
}));
