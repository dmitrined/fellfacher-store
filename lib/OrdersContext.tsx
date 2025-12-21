/**
 * Контекст заказов.
 * Хранит историю заказов пользователя и позволяет добавлять новые заказы после покупки.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Интерфейс заказа
export interface Order {
    id: string; // Номер заказа
    date: string; // Дата совершения
    total: number; // Общая сумма
    items: {
        wineId: string; // ID купленного вина
        name: string; // Название вина (для быстрого доступа)
        quantity: number; // Количество
        price: number; // Цена на момент покупки
    }[];
    status: 'Delivered' | 'In Transit' | 'Processing'; // Статус доставки
}

// Типизация контекста заказов
interface OrdersContextType {
    orders: Order[]; // Список всех заказов
    addOrder: (order: Order) => void; // Метод для создания нового заказа
}

// Создание контекста
const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Провайдер истории заказов
export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние списка заказов
    const [orders, setOrders] = useState<Order[]>([]);

    // Эффект для загрузки истории заказов из localStorage
    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        } else {
            // Инициализация фиктивного (mock) заказа для демонстрации
            const initialOrders: Order[] = [
                {
                    id: 'ORD-2023-001',
                    date: '2023-10-15',
                    total: 89.70,
                    status: 'Delivered',
                    items: [
                        { wineId: '1', name: 'MERLOT GOLDBERG', quantity: 3, price: 29.90 }
                    ]
                }
            ];
            setOrders(initialOrders);
            localStorage.setItem('orders', JSON.stringify(initialOrders));
        }
    }, []);

    /**
     * Создание нового заказа и сохранение его в историю.
     */
    const addOrder = (order: Order) => {
        setOrders(prev => {
            // Добавляем новый заказ в начало списка
            const next = [order, ...prev];
            localStorage.setItem('orders', JSON.stringify(next));
            return next;
        });
    };

    return (
        <OrdersContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    );
};

// Хук доступа к данным о заказах
export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
};
