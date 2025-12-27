/**
 * Назначение: Глобальное состояние бронирования мероприятий (Booking State).
 * Зависимости: Zustand, Persist middleware.
 * Особенности:
 * - Сохраняет историю бронирований в LocalStorage ('booking-storage').
 * - Управляет созданием и отменой бронирований.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Интерфейс бронирования (дублирует BookingContext логику)
export interface Booking {
    id: string;
    eventId: string;
    eventTitle: string;
    date: string;
    time: string;
    guests: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
}

// Интерфейс состояния бронирования
interface BookingState {
    bookings: Booking[]; // Список всех бронирований
    addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void; // Добавить новое
    cancelBooking: (id: string) => void; // Отменить бронирование
    getEventBookings: (eventId: string) => Booking[]; // Получить бронирования для конкретного события
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            bookings: [],

            // Создание нового бронирования
            addBooking: (newBookingData) => {
                const newBooking: Booking = {
                    ...newBookingData,
                    id: Math.random().toString(36).substr(2, 9), // Генерация ID
                    status: 'confirmed', // Сразу подтверждаем для демо
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    bookings: [newBooking, ...state.bookings], // Добавляем в начало списка
                }));
            },

            // Отмена бронирования (изменение статуса)
            cancelBooking: (id: string) => {
                set((state) => ({
                    bookings: state.bookings.map((b) =>
                        b.id === id ? { ...b, status: 'cancelled' } : b
                    ),
                }));
            },

            // Получение списка бронирований для события (фильтрация)
            getEventBookings: (eventId: string) => {
                return get().bookings.filter((b) => b.eventId === eventId);
            },
        }),
        {
            name: 'booking-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
