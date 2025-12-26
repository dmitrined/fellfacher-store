/**
 * Назначение файла: Контекст для управления бронированиями мероприятий.
 * Особенности: Сохранение в localStorage, типизация бронирований.
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface BookingContextType {
    bookings: Booking[];
    addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
    cancelBooking: (id: string) => void;
    getEventBookings: (eventId: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Загрузка бронирований из localStorage при инициализации
    useEffect(() => {
        const savedBookings = localStorage.getItem('fellbacher_bookings');
        if (savedBookings) {
            try {
                setBookings(JSON.parse(savedBookings));
            } catch (error) {
                console.error("Failed to parse bookings:", error);
            }
        }
    }, []);

    // Сохранение при каждом изменении
    useEffect(() => {
        localStorage.setItem('fellbacher_bookings', JSON.stringify(bookings));
    }, [bookings]);

    const addBooking = (newBookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
        const newBooking: Booking = {
            ...newBookingData,
            id: Math.random().toString(36).substr(2, 9),
            status: 'confirmed', // Для демо сразу подтверждаем
            createdAt: new Date().toISOString(),
        };
        setBookings(prev => [newBooking, ...prev]);
    };

    const cancelBooking = (id: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    };

    const getEventBookings = (eventId: string) => {
        return bookings.filter(b => b.eventId === eventId);
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getEventBookings }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
