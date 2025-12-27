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
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,

    // Установка конкретного значения (открыть/закрыть)
    setMobileMenuOpen: (isOpen: boolean) => set({ isMobileMenuOpen: isOpen }),

    // Переключение значения на противоположное
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
