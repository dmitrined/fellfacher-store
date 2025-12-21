/**
 * Контекст авторизации.
 * Управляет состоянием пользователя, входом, регистрацией и выходом из системы.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Интерфейс данных пользователя
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

// Типизация контекста авторизации
interface AuthContextType {
    user: User | null; // Текущий пользователь или null
    isLoggedIn: boolean; // Флаг состояния входа
    login: (email: string, password: string) => Promise<void>; // Функция входа
    register: (name: string, email: string, password: string) => Promise<void>; // Функция регистрации
    logout: () => void; // Функция выхода
    isAuthModalOpen: boolean; // Состояние открытости модального окна входа
    setAuthModalOpen: (isOpen: boolean) => void; // Функция управления модальным окном
}

// Создание контекста с неопределенным начальным значением
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер авторизации, оборачивающий компоненты приложения
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние текущего авторизованного пользователя
    const [user, setUser] = useState<User | null>(null);
    // Состояние модального окна авторизации
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    // Эффект для восстановления сессии пользователя из localStorage при загрузке приложения
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    /**
     * Имитация функции входа (Mock login).
     * В реальном приложении здесь был бы запрос к API.
     */
    const login = async (email: string, password: string) => {
        // Получаем список зарегистрированных пользователей из локального хранилища
        const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
        // Ищем пользователя с совпадающими email и паролем
        const found = users.find((u: any) => u.email === email && u.password === password);

        if (found) {
            const userData = { id: found.id, name: found.name, email: found.email };
            setUser(userData);
            // Сохраняем сессию в localStorage
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            throw new Error('Invalid email or password');
        }
    };

    /**
     * Имитация функции регистрации (Mock register).
     */
    const register = async (name: string, email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
        // Проверка на существование пользователя с таким email
        if (users.find((u: any) => u.email === email)) {
            throw new Error('Email already exists');
        }

        // Создание нового объекта пользователя с уникальным ID
        const newUser = { id: Math.random().toString(36).substr(2, 9), name, email, password };
        users.push(newUser);
        // Сохраняем базу пользователей в localStorage (для демо)
        localStorage.setItem('registered_users', JSON.stringify(users));

        const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
        setUser(userData);
        // Автоматический вход после регистрации
        localStorage.setItem('user', JSON.stringify(userData));
    };

    /**
     * Функция выхода из системы.
     * Очищает состояние и удаляет данные из localStorage.
     */
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        // Передача состояния и функций через провайдер
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            register,
            logout,
            isAuthModalOpen,
            setAuthModalOpen
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Кастомный хук для удобного доступа к контексту авторизации
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
